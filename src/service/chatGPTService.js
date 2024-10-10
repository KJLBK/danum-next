import { getAccessToken } from './tokenService';

// chatGPT에게 질문을 시작하는 로직
export async function generateAI(message) {
    const accessToken = getAccessToken();
    if (!accessToken) {
        throw new Error('Access token is missing');
    }
    try {
        const res = await fetch('/danum-backend/open-ai', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${accessToken}`,
            },
            body: JSON.stringify({
                message,
            }),
        });

        if (!res.ok) {
            throw new Error('Failed to generate message');
        }
        return await res.json(); // 생성된 메시지에 대한 응답 받기
    } catch (err) {
        throw new Error(err.message);
    }
}

// chatGPT 대화 내용을 가져오는 로직
export async function getMessage(createId) {
    const accessToken = getAccessToken();

    try {
        const res = await fetch(
            `/danum-backend/open-ai/${createId}`,
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${accessToken}`,
                },
            }
        );

        if (!res.ok) {
            throw new Error('Failed to fetch message');
        }

        return await res.json(); // 메시지 내용을 JSON으로 반환
    } catch (err) {
        throw new Error(err.message);
    }
}

//chatGPT 대화를 종료하는 로직
export async function closeAI(createId) {
    const accessToken = getAccessToken();

    try {
        const res = await fetch(
            `/danum-backend/open-ai/${createId}`,
            {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${accessToken}`,
                },
            }
        );

        if (!res.ok) {
            throw new Error('Failed to close');
        }

        return await res.json(); // 종료에 대한 응답 받기
    } catch (err) {
        throw new Error(err.message);
    }
}
