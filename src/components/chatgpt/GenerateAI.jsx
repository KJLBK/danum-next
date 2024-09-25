'use client';

import { useState } from 'react';
import {
    generateAI,
    getMessage,
    closeAI,
} from '../../service/chatGPTService';

export default function GenerateAI() {
    const [message, setMessage] = useState(''); // 입력 메시지
    const [room, setRoom] = useState(''); // 생성된 room ID 저장
    const [chatHistory, setChatHistory] = useState([]); // 채팅 내역 상태 저장

    // 메시지 입력 시 상태 업데이트
    const onChangeMessage = (e) => {
        setMessage(e.target.value);
    };

    // 질문하기 버튼 클릭 시 호출되는 함수
    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            // message를 전송하고 room ID 생성
            const response = await generateAI(message);
            const newRoom = response.createdId; // room ID 저장
            setRoom(newRoom); // room ID 업데이트
            setMessage(''); // 메시지 초기화

            // room ID로 채팅 내역을 받아옴
            const chatHistoryResponse =
                await getMessage(newRoom);
            setChatHistory(chatHistoryResponse); // 채팅 내역을 상태에 저장
            console.log(room);
        } catch (err) {
            console.log(err);
        }
    };

    // 대화 종료 함수
    const endConversation = async () => {
        try {
            if (room) {
                await closeAI(room); // room ID를 이용하여 채팅방 종료
            }
            setRoom(''); // room ID 초기화
            setChatHistory([]); // 채팅 내역 초기화
            setMessage(''); // 메시지 초기화
        } catch (err) {
            console.log('Error closing chat room:', err);
        }
    };

    return (
        <div>
            <p>질문을 적어주세요.</p>
            <textarea
                id='message'
                name='message'
                value={message}
                onChange={onChangeMessage}
            />
            <button onClick={onSubmit}>질문하기</button>
            <button onClick={endConversation}>
                대화 종료
            </button>
            <hr />
            <p>채팅 내역</p>
            {/* 채팅 내역 표시 */}
            {chatHistory.length > 0 ? (
                chatHistory.map((chat, index) => (
                    <div key={index}>
                        {chat.messageType === 'USER' ? (
                            <p
                                style={{
                                    textAlign: 'right',
                                    color: 'blue',
                                }}
                            >
                                내가 보낸 메시지:{' '}
                                {chat.content}
                            </p>
                        ) : (
                            <p
                                style={{
                                    textAlign: 'left',
                                    color: 'green',
                                }}
                            >
                                상대방 메시지:{' '}
                                {chat.content}
                            </p>
                        )}
                    </div>
                ))
            ) : (
                <p>채팅 내역이 없습니다.</p>
            )}
        </div>
    );
}
