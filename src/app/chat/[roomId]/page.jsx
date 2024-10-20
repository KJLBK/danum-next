'use client';

import { useParams } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { getChatRoomInfo } from '../../../services/chatService';
import ChatMessageList from '../../../components/chat/ChatMessageList';
import { useAuthStore } from '../../../stores/authStore';
import SockJS from 'sockjs-client';
import { Client } from '@stomp/stompjs';
import ChatInput from '../../../components/chat/ChatInput';

export default function ChatRoomPage() {
    const { roomId } = useParams();
    const [roomInfo, setRoomInfo] = useState(null);
    const [messages, setMessages] = useState([]);
    const { user } = useAuthStore();
    const messageEndRef = useRef(null);
    const stompClient = useRef(null);
    const accessToken =
        typeof window !== 'undefined'
            ? localStorage.getItem('accessToken')
            : null;

    useEffect(() => {
        loadRoomInfo();

        // 500 -> token error
        const socket = new SockJS(
            `/danum-backend/ws-stomp`
        );

        stompClient.current = new Client({
            webSocketFactory: () => socket,
            connectHeaders: {
                Authorization: `Bearer ${accessToken}`,
            },
            debug: (str) =>
                console.log(
                    '[roomid]-page.jsx:stompClient debug',
                    str
                ),
            onConnect: () => {
                stompClient.current.subscribe(
                    `/sub/chat/room/${roomId}`,
                    (message) => {
                        const receivedMessage = JSON.parse(
                            message.body
                        );
                        setMessages((prevMessages) => [
                            ...prevMessages,
                            receivedMessage,
                        ]);
                    }
                );

                // Send ENTER message
                stompClient.current.publish({
                    destination: '/app/chat/message',
                    body: JSON.stringify({
                        type: 'ENTER',
                        roomId: roomId,
                        sender: user,
                        message: '',
                    }),
                });
            },
        });

        stompClient.current.activate();

        return () => {
            stompClient.current.deactivate();
        };
    }, [roomId]);

    const loadRoomInfo = async () => {
        try {
            const info = await getChatRoomInfo(roomId);
            console.log('[roomid]-page.jsx 68', info);
            setRoomInfo(info);
            console.log('[roomid]-page.jsx 79', roomInfo);
        } catch (error) {
            console.error(
                'ERR(/app/chat/[roomId]/page.jsx:loadRoomInfo):' +
                    error
            );
        }
    };

    const handleSendMessage = (content) => {
        if (!content.trim()) return;
        console.log(content);

        if (stompClient.current) {
            stompClient.current.publish({
                destination: '/pub/chat/message',
                body: JSON.stringify({
                    type: 'TALK',
                    roomId: roomId,
                    sender: user,
                    message: content,
                }),
            });
            console.log(stompClient);
        }
    };

    if (!roomInfo) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <p>{roomInfo.name}</p>
            <ChatMessageList
                messages={messages}
                currentUser={user}
            />
            <div ref={messageEndRef} />
            <ChatInput onSendMessage={handleSendMessage} />
        </div>
    );
}
