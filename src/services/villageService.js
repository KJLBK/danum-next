import { getAccessToken } from './tokenService';

// 동네이야기 게시판 생성 로직
export async function villageNew({
    email,
    title,
    content,
    postType,
}) {
    const token = getAccessToken();

    try {
        const response = await fetch(
            `/danum-backend/board/village/new`,
            {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email,
                    title,
                    content,
                    postType,
                }),
            },
        );

        if (!response.ok) {
            throw new Error(`Error: ${response.status}`);
        }
    } catch (error) {
        console.error('Error fetching data', error);
        return [];
    }
}
