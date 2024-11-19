'use client';

import { useQuery } from '@tanstack/react-query';
import { getRecentMessages } from '../../services/chatService';
import { useAuthStore } from '../../stores/authStore';
import { formatTimeAgo } from '../../utils/timeFormat';
import { useEffect } from 'react';
import Link from 'next/link';
import Spinner from '../common/Spinner';
import styles from './RecentMessagesList.module.css';
import Image from 'next/image';
import SpeechBalloon from '../../../public/emoji-assets/speechballoon';
import Eyes from '../../../public/emoji-assets/eyes';

export default function RecentMessagesList() {
    const { isLoggedIn } = useAuthStore();

    const {
        data: recentMessages,
        isLoading,
        isError,
        error,
    } = useQuery({
        queryKey: ['recentMessages'],
        queryFn: getRecentMessages,
        enabled: isLoggedIn,
    });

    useEffect(() => {
        console.log('Is Logged In:', isLoggedIn);
        console.log(recentMessages);
    });

    if (isLoading)
        return (
            <div className={styles.spinner}>
                <Spinner />
            </div>
        );

    if (isError)
        return (
            <div>
                {error}, Error fetching recent messages
            </div>
        );

    if (!isLoggedIn) return null;

    return (
        <>
            {isLoggedIn ? (
                <div className={styles.recentMessageList}>
                    <p className={styles.header}>
                        최근 채팅
                        <SpeechBalloon />
                    </p>
                    <div>
                        {recentMessages?.length > 0 ? (
                            recentMessages.map(
                                (message) => (
                                    <Link
                                        key={message.roomId}
                                        href={`/chat/${encodeURIComponent(message.roomId)}`}
                                    >
                                        <div
                                            className={
                                                styles.messageItem
                                            }
                                        >
                                            <div
                                                className={
                                                    styles.messageProfileImage
                                                }
                                            >
                                                <Image
                                                    src={
                                                        message.chatPartnerImage ||
                                                        '/logo-assets/android-chrome-512x512.png'
                                                    }
                                                    alt="profile-image"
                                                    width={
                                                        30
                                                    }
                                                    height={
                                                        30
                                                    }
                                                />
                                            </div>
                                            <div>
                                                <div
                                                    className={
                                                        styles.messageItemHeader
                                                    }
                                                >
                                                    <strong>
                                                        {message.chatPartnerName ||
                                                            message.roomName}
                                                    </strong>

                                                    <div
                                                        className={
                                                            styles.messageTime
                                                        }
                                                    >
                                                        {formatTimeAgo(
                                                            message.lastMessageTime,
                                                        )}
                                                    </div>
                                                </div>
                                                <div>
                                                    {
                                                        message.lastMessage
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                ),
                            )
                        ) : (
                            <div className={styles.noChat}>
                                채팅 내역이 없어요 <Eyes />
                            </div>
                        )}
                    </div>
                </div>
            ) : (
                <div></div>
            )}
        </>
    );
}
