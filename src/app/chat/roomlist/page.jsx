'use client';
import {
    getAllChatRooms,
    getRecentMessages,
} from '../../../services/chatService';
import styles from './page.module.css';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '../../../stores/authStore';
import { useQuery } from '@tanstack/react-query';
import { formatTimeAgo } from '../../../utils/timeFormat';
import Image from 'next/image';
import Spinner from '../../../components/common/Spinner';

export default function RoomListPage() {
    const router = useRouter();
    const { email, isLoggedIn } = useAuthStore();

    const { data: chatRooms, isLoading: roomsLoading } =
        useQuery({
            queryKey: ['chatRooms'],
            queryFn: getAllChatRooms,
            enabled: isLoggedIn,
        });

    const {
        data: recentMessages,
        isLoading: messagesLoading,
    } = useQuery({
        queryKey: ['recentMessages'],
        queryFn: getRecentMessages,
        enabled: isLoggedIn,
    });

    const isLoading = roomsLoading || messagesLoading;

    if (isLoading) {
        return (
            <div className={styles.loading}>
                <Spinner />
            </div>
        );
    }

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>채팅 목록</h1>
            <div className={styles.roomList}>
                {chatRooms?.length === 0 ? (
                    <div className={styles.noRooms}>
                        참여 중인 채팅방이 없습니다.
                    </div>
                ) : (
                    chatRooms?.map((room) => {
                        const recentMessage =
                            recentMessages?.find(
                                (msg) =>
                                    msg.roomId ===
                                    room.roomId,
                            );

                        return (
                            <div
                                key={room.roomId}
                                className={styles.roomItem}
                                onClick={() =>
                                    router.push(
                                        `/chat/${room.roomId}`,
                                    )
                                }
                            >
                                <div
                                    className={
                                        styles.roomInfo
                                    }
                                >
                                    <div
                                        className={
                                            styles.profileImage
                                        }
                                    >
                                        <Image
                                            src={
                                                recentMessage?.chatPartnerImage ||
                                                '/logo-assets/android-chrome-512x512.png'
                                            }
                                            alt="profile"
                                            width={40}
                                            height={40}
                                        />
                                    </div>
                                    <div
                                        className={
                                            styles.details
                                        }
                                    >
                                        <div
                                            className={
                                                styles.header
                                            }
                                        >
                                            <h3
                                                className={
                                                    styles.roomName
                                                }
                                            >
                                                {room.oneToOne
                                                    ? recentMessage?.chatPartnerName ||
                                                      room.participants.find(
                                                          (
                                                              p,
                                                          ) =>
                                                              p !==
                                                              email,
                                                      )
                                                    : room.name}
                                            </h3>
                                            {recentMessage && (
                                                <span
                                                    className={
                                                        styles.time
                                                    }
                                                >
                                                    {formatTimeAgo(
                                                        recentMessage.lastMessageTime,
                                                    )}
                                                </span>
                                            )}
                                        </div>
                                        {recentMessage && (
                                            <p
                                                className={
                                                    styles.lastMessage
                                                }
                                            >
                                                {
                                                    recentMessage.lastMessage
                                                }
                                            </p>
                                        )}
                                    </div>
                                </div>
                            </div>
                        );
                    })
                )}
            </div>
        </div>
    );
}
