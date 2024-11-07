'use client';

import { useRouter } from 'next/navigation';
import { formatTimeAgo } from '../../utils/timeFormat';
import { notificationRead } from '../../services/notificationService';
import styles from './NotificationsItem.module.css';

export default function NotificationsItem({
    notification,
    onRead,
}) {
    const router = useRouter();
    const { id, content, link, read, type, createdAt } =
        notification;

    const handleClick = async () => {
        try {
            await notificationRead(id);
            onRead(id);
            router.push(link);
        } catch (error) {
            console.error('알림 읽음 처리 실패:', error);
            router.push(link);
        }
    };

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
        <div
            className={styles.linkWrapper}
            onClick={handleClick}
            style={{ cursor: 'pointer' }}
        >
            <div className={styles.notificationItem}>
                <div className={styles.notificationContent}>
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
        </div>
    );
}
