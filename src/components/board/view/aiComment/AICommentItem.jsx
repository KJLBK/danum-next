'use client';
import { useEffect, useState } from 'react';
import { useAuthStore } from '../../../../stores/authStore';
import styles from './AICommentItem.module.css';
import { aiChat } from '../../../../services/chatGPTService';
import { useParams } from 'next/navigation';
import TypewriterEffect from './TypewriterEffect';

export default function AICommentItem({ content, author }) {
    const { email } = useAuthStore();
    const params = useParams();
    const [message, setMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [latestAnswerIndex, setLatestAnswerIndex] =
        useState(-1);
    const contentSections = content.split('[AI 답변]');

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

    useEffect(() => {
        // 페이지 로드 시 가장 최근 답변의 인덱스를 설정
        setLatestAnswerIndex(interactions.length - 1);
    }, []);

    const handleMessage = (e) => {
        setMessage(e.target.value);
    };

    const handleAiChat = async () => {
        if (!message.trim()) return;
        setIsLoading(true);
        try {
            await aiChat(params.questionId, message);
            location.reload();
        } catch (error) {
            console.error('AI 채팅 오류:', error);
        } finally {
            setIsLoading(false);
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
                        {index === latestAnswerIndex ? (
                            <TypewriterEffect
                                text={interaction.answer}
                            />
                        ) : (
                            <p>{interaction.answer}</p>
                        )}
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

            {isLoading && (
                <div className={styles.aiAnswer}>
                    <p className={styles.loadingText}>
                        AI 답변 대기 중...
                    </p>
                </div>
            )}

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
                            disabled={isLoading}
                        >
                            질문하기
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
