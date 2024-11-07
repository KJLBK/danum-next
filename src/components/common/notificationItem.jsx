// components/notification/NotificationItem.jsx
'use client';

import Link from 'next/link';
import { formatTimeAgo } from '../../utils/timeFormat';
import styles from './NotificationItem.module.css';

export default function NotificationItem({ notification }) {
    const { id, content, link, read, type, createdAt } =
        notification;

    const getNotificationType = (type) => {
        switch (type) {
            case 'VILLAGE_COMMENT':
                return '동네이야기 댓글';
            case 'QUESTION_COMMENT':
                return '질문이야기 댓글';
            case 'CHAT_ROOM_INVITE':
                return '채팅 알림';
            default:
                return '알림';
        }
    };

    return (
        <div className={styles.linkWrapper}>
            <Link href={link} className={styles.link}>
                <div className={styles.notificationItem}>
                    <div
                        className={
                            styles.notificationContent
                        }
                    >
                        <span className={styles.type}>
                            {getNotificationType(type)}
                        </span>
                        <div className={styles.infoWrapper}>
                            <div className={styles.message}>
                                {content}
                            </div>
                            <div className={styles.time}>
                                {formatTimeAgo(createdAt)}
                            </div>
                        </div>
                    </div>
                </div>
            </Link>
        </div>
    );
}
