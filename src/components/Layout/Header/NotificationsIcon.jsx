'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import AlarmIcon from '../../../../public/bell.svg';
import { notificationCount } from '../../../services/notificationService';
import styles from './NotificationsIcon.module.css';

export default function NotificationIcon({ isLoggedIn }) {
    const [unreadCount, setUnreadCount] = useState(0);

    useEffect(() => {
        // 로그인된 사용자가 있을 때만 실행
        if (isLoggedIn) {
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

            const interval = setInterval(
                fetchUnreadCount,
                60000,
            );

            return () => clearInterval(interval);
        } else {
            // 로그아웃 상태일 때는 알림 개수 초기화
            setUnreadCount(0);
        }
    }, [isLoggedIn]); // user가 변경될 때마다 useEffect 재실행

    return (
        <>
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
        </>
    );
}
