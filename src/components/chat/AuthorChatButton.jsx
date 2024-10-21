// components/chat/AuthorChatButton.jsx
'use client';

import { useState } from 'react';
import Modal from '../common/Modal';
import style from './AuthorChatButton.module.css';
export default function AuthorChatButton({ username }) {
    const [isModalOpen, setModalOpen] = useState(false);

    // 모달 열기,닫기 함수
    const openModal = () => setModalOpen(true);
    const closeModal = () => setModalOpen(false);

    const startChat = () => {
        alert(`채팅을 ${username}님과 시작합니다.`);
        closeModal();
    };

    return (
        <>
            <span
                onClick={openModal}
                className={style.authorName}
            >
                {username}
            </span>

            {/* 모달 */}
            {isModalOpen && (
                <Modal
                    isOpen={isModalOpen}
                    title="채팅하기"
                    content={`${username}님과 채팅을 시작하시겠습니까?`}
                    onConfirm={startChat}
                    onCancel={closeModal}
                />
            )}
        </>
    );
}
