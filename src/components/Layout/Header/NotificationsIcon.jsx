'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import AlarmIcon from '../../../../public/bell.svg';
import { notificationCount } from '../../../services/notificationService';
import styles from './NotificationsIcon.module.css';

export default function NotificationIcon() {
    const [unreadCount, setUnreadCount] = useState(0);

    useEffect(() => {
        const fetchUnreadCount = async () => {
            try {
                const count = await notificationCount();
                setUnreadCount(count);
            } catch (error) {
                console.error(
                    'Failed to fetch unread count:',
                    error,
                );
            }
        };

        fetchUnreadCount();

        // 1분마다 갱신
        const interval = setInterval(
            fetchUnreadCount,
            5000,
        );

        return () => clearInterval(interval);
    }, []);

    return (
        <div className={styles.container}>
            <Link href="/notifications">
                <div className={styles.iconWrapper}>
                    <AlarmIcon />
                    {unreadCount > 0 && (
                        <span className={styles.badge}>
                            {unreadCount > 99
                                ? '99+'
                                : unreadCount}
                        </span>
                    )}
                </div>
            </Link>
        </div>
    );
}
