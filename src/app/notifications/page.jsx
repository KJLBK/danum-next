'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { notificationShow } from '../../services/notificationService';

export default function NotificationPage() {
    const [notifications, setNotifications] = useState([]);

    useEffect(() => {
        const fetchNotifications = async () => {
            try {
                const data = await notificationShow();
                setNotifications(data);
            } catch (error) {
                console.error(
                    '알림을 불러오는데 실패했습니다:',
                    error,
                );
            }
        };

        fetchNotifications();
    }, []);

    return (
        <div>
            <h1>알림</h1>
            <div>
                {notifications.map((notification) => (
                    <Link
                        href={notification.link}
                        key={notification.id}
                    >
                        <div
                            className={`notification-item ${notification.read ? 'read' : 'unread'}`}
                        >
                            <div>
                                <p>
                                    {notification.content}
                                </p>
                                <span>
                                    {formatDate(
                                        notification.createdAt,
                                    )}
                                </span>
                            </div>
                            <span>
                                {getNotificationType(
                                    notification.type,
                                )}
                            </span>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}
