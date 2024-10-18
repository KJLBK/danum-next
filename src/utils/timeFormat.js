// timeFormat.js

/**
 * 시간을 상대적 포맷으로 변환하는 함수
 * @param {string} dateString - 날짜 문자열 (예: '2024-10-18T12:00:00Z')
 * @returns {string} 포맷된 시간 문자열 (예: '3시간 전')
 */

export const formatTimeAgo = (dateString) => {
    const now = new Date();
    const targetDate = new Date(dateString);
    const diffInSeconds = Math.floor(
        (now - targetDate) / 1000,
    );

    const minutes = Math.floor(diffInSeconds / 60);
    const hours = Math.floor(diffInSeconds / 3600);
    const days = Math.floor(diffInSeconds / 86400);

    if (days > 0) {
        return `${days}일 전`;
    } else if (hours > 0) {
        return `${hours}시간 전`;
    } else if (minutes > 0) {
        return `${minutes}분 전`;
    } else {
        return '방금 전';
    }
};
