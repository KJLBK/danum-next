'use client';

import { useEffect, useState } from 'react';
import { notificationShow } from '../../services/notificationService';
import NotificationItem from '../../components/common/notificationItem';

export default function NotificationPage() {
    const [notifications, setNotifications] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchNotifications = async () => {
            try {
                setIsLoading(true);
                const data = await notificationShow();
                // read가 false인 알림만 필터링
                const unreadNotifications = data.filter(
                    (notification) => !notification.read,
                );
                setNotifications(unreadNotifications);
            } catch (error) {
                setError('알림을 불러오는데 실패했습니다.');
                console.error('알림 로드 에러:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchNotifications();
    }, []);

    const handleNotificationRead = (id) => {
        setNotifications((prev) =>
            prev.filter(
                (notification) => notification.id !== id,
            ),
        );
    };

    if (isLoading) {
        return <div>로딩 중...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div>
            <h1 style={{ textAlign: 'center' }}>알림</h1>
            <div>
                {notifications.length === 0 ? (
                    <div>새로운 알림이 없습니다.</div>
                ) : (
                    notifications.map((notification) => (
                        <NotificationItem
                            key={notification.id}
                            notification={notification}
                            onRead={handleNotificationRead}
                        />
                    ))
                )}
            </div>
        </div>
    );
}
