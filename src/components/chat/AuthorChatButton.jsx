// components/chat/AuthorChatButton.jsx
'use client';

import { useState } from 'react';
import Modal from '../common/Modal';
import style from './AuthorChatButton.module.css';
import { useRouter } from 'next/navigation';
import { useCreatePrivateChat } from '../../hooks/useChatMutations';

export default function AuthorChatButton({
    userId,
    userName,
    onChatStart, // 새로운 prop 추가
}) {
    const [isModalOpen, setModalOpen] = useState(false);
    const router = useRouter();
    const openModal = () => setModalOpen(true);
    const closeModal = () => setModalOpen(false);
    const { mutate: createChat } = useCreatePrivateChat();

    const startChat = () => {
        createChat(
            { targetUserId: userId },
            {
                onSuccess: (data) => {
                    console.log(
                        `채팅을 ${userName}님과 시작합니다.`,
                        data,
                    );
                    closeModal();
                    onChatStart(); // 부모 컴포넌트의 모달을 닫는 함수 호출
                    setTimeout(() => {
                        router.push(`/chat/${data.roomId}`);
                    }, 100);
                },
                onError: (error) => {
                    alert(
                        `채팅방 생성에 실패했습니다. 다시 시도해주세요. \n${error.message}`,
                    );
                    console.error(
                        '1:1 채팅방 생성 실패',
                        error.message,
                    );
                    closeModal();
                },
            },
        );
    };

    return (
        <>
            <span
                onClick={openModal}
                className={style.authorName}
            >
                {userName}
            </span>

            {/* 모달 */}
            {isModalOpen && (
                <Modal
                    isOpen={isModalOpen}
                    title="채팅하기"
                    content={`${userName}(${userId})님과 채팅을 시작하시겠습니까?`}
                    onConfirm={startChat}
                    onCancel={closeModal}
                />
            )}
        </>
    );
}
