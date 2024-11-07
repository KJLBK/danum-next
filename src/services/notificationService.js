import { getAccessToken } from './tokenService';
// 알림 목록 조회 로직
export async function notificationShow() {
    const token = getAccessToken();
    try {
        const response = await fetch(
            '/danum-backend/main/notifications',
            {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            },
        );

        if (!response.ok) {
            throw new Error(`Error: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error('Error fetching data', error);
        return [];
    }
}

// 읽지 않은 알림 개수 표시 로직
export async function notificationCount() {
    const token = getAccessToken();
    try {
        const response = await fetch(
            '/danum-backend/main/notifications/unread-count',
            {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            },
        );

        if (!response.ok) {
            throw new Error(`Error: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error('Error fetching data', error);
        return [];
    }
}

// 알림 읽음 처리
export async function notificationRead(notificationId) {
    const token = getAccessToken();

    try {
        const response = await fetch(
            `/danum-backend/main/notifications/${notificationId}/read`,
            {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            },
        );

        if (!response.ok) {
            throw new Error(`Error: ${response.status}`);
        }
        return response;
    } catch (error) {
        console.error('Error fetching data', error);
        return [];
    }
}
