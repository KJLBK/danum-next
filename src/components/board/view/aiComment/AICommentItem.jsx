'use client';
import { useEffect, useState } from 'react';
import { useAuthStore } from '../../../../stores/authStore';
import styles from './AICommentItem.module.css';
import { aiChat } from '../../../../services/chatGPTService';
import { useParams } from 'next/navigation';

export default function AICommentItem({ content, author }) {
    const { email } = useAuthStore();
    const params = useParams();
    const [message, setMessage] = useState('');
    const contentSections = content.split('[AI 답변]');

    // AI 답변과 추가 질문 처리
    const interactions = [];
    if (contentSections.length > 1) {
        for (let i = 1; i < contentSections.length; i++) {
            const parts =
                contentSections[i].split('[추가 질문]');
            interactions.push({
                answer: parts[0].trim(),
                question: parts[1]?.trim() || '',
            });
        }
    }

    const handleMessage = (e) => {
        setMessage(e.target.value);
    };

    const handleAiChat = async () => {
        if (!message.trim()) return;
        try {
            await aiChat(params.questionId, message);
            location.reload();
        } catch (error) {
            console.error('AI 채팅 오류:', error);
        }
    };

    return (
        <div className={styles.aiCommentContainer}>
            {interactions.map((interaction, index) => (
                <div
                    key={index}
                    className={styles.interactionBlock}
                >
                    <div className={styles.aiAnswer}>
                        <h3>AI 답변 {index + 1}</h3>
                        <p>{interaction.answer}</p>
                    </div>

                    {interaction.question && (
                        <div
                            className={
                                styles.followUpQuestion
                            }
                        >
                            <h3>추가 질문 {index + 1}</h3>
                            <p>{interaction.question}</p>
                        </div>
                    )}
                </div>
            ))}

            {email === author && (
                <div className={styles.questionForm}>
                    <h3>AI에게 추가 질문하기</h3>
                    <div className={styles.inputGroup}>
                        <input
                            type="text"
                            value={message}
                            onChange={handleMessage}
                            placeholder="AI에게 질문하세요"
                            className={styles.input}
                        />
                        <button
                            onClick={handleAiChat}
                            className={styles.button}
                        >
                            질문하기
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
