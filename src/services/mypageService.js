import { getAccessToken } from './tokenService';

// 작성한 question 글 조회
export async function myQuestion(email) {
    const token = getAccessToken();
    try {
        const response = await fetch(
            `/danum-backend/board/question/members/${email}/questions`,
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

// 작성한 village 글 조회
export async function myVillage(email) {
    const token = getAccessToken();
    try {
        const response = await fetch(
            `/danum-backend/board/village/members/${email}/villages`,
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
