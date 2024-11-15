'use client';

import { useQuery } from '@tanstack/react-query';
import { getRecentMessages } from '../../services/chatService';
import { useAuthStore } from '../../stores/authStore';
import { formatTimeAgo } from '../../utils/timeFormat';
import { useEffect } from 'react';
import Link from 'next/link';
import Spinner from '../common/Spinner';
import styles from './RecentMessagesList.module.css';

export default function RecentMessagesList() {
    const { isLoggedIn } = useAuthStore();

    const {
        data: recentMessages,
        isLoading,
        isError,
    } = useQuery({
        queryKey: ['recentMessages'],
        queryFn: getRecentMessages,
        enabled: isLoggedIn,
    });

    useEffect(() => {
        console.log(recentMessages);
    }, [recentMessages]); // Added dependency array to avoid running every render

    if (isLoading) return <Spinner />;

    if (isError)
        return <div>Error fetching recent messages</div>;

    if (!isLoggedIn) return null;

    return (
        <>
            {isLoggedIn ? (
                <div className={styles.recentMessageList}>
                    <p className="myprofile-p">최근 채팅</p>
                    <div>
                        {recentMessages?.length > 0 ? (
                            recentMessages.map(
                                (message) => (
                                    <Link
                                        key={message.roomId} // Ensure key is on Link or the outermost element
                                        href={`/chat/${encodeURIComponent(message.roomId)}`} // Encode email if needed
                                    >
                                        <div
                                            style={{
                                                borderBottom:
                                                    '1px solid #ddd',
                                                padding:
                                                    '10px',
                                            }}
                                        >
                                            <div>
                                                <strong>
                                                    {message.chatPartnerName ||
                                                        message.roomName}
                                                </strong>
                                            </div>
                                            <div>
                                                {
                                                    message.lastMessage
                                                }
                                            </div>
                                            <div
                                                style={{
                                                    fontSize:
                                                        '12px',
                                                    color: 'gray',
                                                }}
                                            >
                                                {formatTimeAgo(
                                                    message.lastMessageTime,
                                                )}
                                            </div>
                                        </div>
                                    </Link>
                                ),
                            )
                        ) : (
                            <div>채팅이 없습니다</div>
                        )}
                    </div>
                </div>
            ) : (
                <div></div>
            )}
        </>
    );
}
