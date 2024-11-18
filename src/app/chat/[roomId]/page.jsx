'use client';

import { useEffect, useRef, useState } from 'react';
import { useParams } from 'next/navigation';
import SockJS from 'sockjs-client';
import { Client } from '@stomp/stompjs';
import { useAuthStore } from '../../../stores/authStore';
import { useEnterChatRoom } from '../../../hooks/useChatQueries';
import { getChatRoomInfo } from '../../../services/chatService';
import { getAccessToken } from '../../../services/tokenService';
import ChatMessageList from '../../../components/chat/ChatMessageList';
import ChatInput from '../../../components/chat/ChatInput';
import Spinner from '../../../components/common/Spinner';
import styles from './page.module.css';

export default function ChatRoomPage() {
    const { roomId } = useParams();
    const [roomInfo, setRoomInfo] = useState(null);
    const [messages, setMessages] = useState([]);
    const { email } = useAuthStore();
    const messageEndRef = useRef(null);
    const stompClient = useRef(null);
    const accessToken =
        typeof window !== 'undefined'
            ? getAccessToken()
            : null;

    // useEnterChatRoom 훅을 컴포넌트 본문에서 호출
    const { data: enterChatData } =
        useEnterChatRoom(roomId);

    useEffect(() => {
        if (enterChatData) {
            setMessages(enterChatData.messages);
        }
    }, [enterChatData]);

    useEffect(() => {
        loadRoomInfo();

        const socket = new SockJS(
            `/danum-backend/ws-stomp`,
        );
        stompClient.current = new Client({
            webSocketFactory: () => socket,
            connectHeaders: {
                Authorization: `Bearer ${accessToken}`,
            },
            debug: (str) =>
                console.log(
                    '[debug]\n[roomid]-page.jsx:stompClient debug\n\n',
                    str,
                ),
            onConnect: () => {
                stompClient.current.subscribe(
                    `/sub/chat/room/${roomId}`,
                    (message) => {
                        const receivedMessage = JSON.parse(
                            message.body,
                        );

                        // 메시지 유형에 따른 처리 (입장/퇴장 알림 및 일반 메시지)
                        if (
                            receivedMessage.type === 'ENTER'
                        ) {
                            setMessages((prevMessages) => [
                                ...prevMessages,
                                {
                                    sender: receivedMessage.sender,
                                    content: `${receivedMessage.sender} 님이 입장했습니다.`,
                                },
                            ]);
                        } else if (
                            receivedMessage.type === 'LEAVE'
                        ) {
                            setMessages((prevMessages) => [
                                ...prevMessages,
                                {
                                    sender: receivedMessage.sender,
                                    content: `${receivedMessage.sender} 님이 퇴장했습니다.`,
                                },
                            ]);
                        } else {
                            setMessages((prevMessages) => [
                                ...prevMessages,
                                receivedMessage,
                            ]);
                        }
                    },
                );

                // 입장 메시지 전송
                stompClient.current.publish({
                    destination: '/app/chat/message',
                    body: JSON.stringify({
                        type: 'ENTER',
                        roomId: roomId,
                        sender: email,
                        message: '',
                    }),
                });
            },
        });

        stompClient.current.activate();

        return () => {
            if (
                stompClient.current &&
                stompClient.current.connected
            ) {
                stompClient.current.publish({
                    destination: '/app/chat/message',
                    body: JSON.stringify({
                        type: 'LEAVE',
                        roomId: roomId,
                        sender: email,
                        message: '',
                    }),
                });
            }
            stompClient.current.deactivate();
        };
    }, [roomId]);

    const loadRoomInfo = async () => {
        try {
            const info = await getChatRoomInfo(roomId);
            setRoomInfo(info);
        } catch (error) {
            console.error('ERR(loadRoomInfo):' + error);
        }
    };

    const handleSendMessage = (content) => {
        if (!content.trim()) return;

        if (stompClient.current) {
            stompClient.current.publish({
                destination: '/pub/chat/message',
                body: JSON.stringify({
                    type: 'TALK',
                    roomId: roomId,
                    sender: email,
                    message: content,
                }),
            });
        }
    };

    // 자동 스크롤: 새로운 메시지가 추가될 때마다 스크롤을 맨 아래로 이동
    useEffect(() => {
        if (messageEndRef.current) {
            messageEndRef.current.scrollIntoView({
                behavior: 'smooth',
            });
        }
    }, [messages]);

    if (!roomInfo) {
        return <Spinner />;
    }

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h1 className={styles.roomTitle}>
                    {roomInfo.name}
                </h1>
            </div>

            <ChatMessageList
                messages={messages}
                currentUser={email}
            />
            <div ref={messageEndRef} />

            <div className={styles.inputContainer}>
                <form
                    className={styles.inputForm}
                    onSubmit={(e) => {
                        e.preventDefault();
                        const input =
                            e.target.elements.message;
                        if (input.value.trim()) {
                            handleSendMessage(input.value);
                            input.value = '';
                        }
                    }}
                >
                    <input
                        type="text"
                        name="message"
                        className={styles.messageInput}
                        placeholder="메시지를 입력하세요"
                    />
                    <button
                        type="submit"
                        className={styles.sendButton}
                    >
                        전송
                    </button>
                </form>
            </div>
        </div>
    );
}
