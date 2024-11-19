import { useEffect, useRef } from 'react';
import styles from './ChatMessageList.module.css';

export default function ChatMessageList({
    messages,
    currentUser,
}) {
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({
            behavior: 'auto',
            block: 'end',
        });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    return (
        <div className={styles.chatContainer}>
            {messages.map((message, index) => {
                const isSystemMessage =
                    message.type === 'ENTER' ||
                    message.type === 'LEAVE' ||
                    message.content?.includes(
                        '님이 입장했습니다',
                    ) ||
                    message.content?.includes(
                        '님이 퇴장했습니다',
                    );

                const isMyMessage =
                    message.sender === currentUser;

                if (isSystemMessage) {
                    return (
                        <div
                            key={index}
                            className={styles.systemMessage}
                        >
                            <span
                                className={
                                    styles.systemMessageContent
                                }
                            >
                                {message.content}
                            </span>
                        </div>
                    );
                }

                return (
                    <div
                        key={index}
                        className={`${styles.messageRow} ${
                            isMyMessage
                                ? styles.myMessage
                                : styles.otherMessage
                        }`}
                    >
                        <div
                            className={
                                styles.messageContent
                            }
                        >
                            {!isMyMessage && (
                                <span
                                    className={
                                        styles.senderName
                                    }
                                >
                                    {message.sender}
                                </span>
                            )}
                            <div
                                className={`${styles.messageBubble} ${
                                    isMyMessage
                                        ? styles.myMessageBubble
                                        : styles.otherMessageBubble
                                }`}
                            >
                                {message.content ||
                                    message.message}
                            </div>
                        </div>
                    </div>
                );
            })}
            <div ref={messagesEndRef} />
        </div>
    );
}
