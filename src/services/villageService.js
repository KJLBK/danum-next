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

// 동네이야기 게시판 조회 로직
export async function villageShow() {
    try {
        const response = await fetch(
            `/danum-backend/board/village/show`,
            {
                method: 'GET',
            },
        );

        if (!response.ok) {
            throw new Error(`Error: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error('Error fetching data', error);
    }
}

// 동네이야기 게시판 상세 조회 로직
export async function villageDetail(villageId) {
    try {
        const response = await fetch(
            `/danum-backend/board/village/show/${villageId}`,
            {
                method: 'GET',
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

// 동네이야기 게시판 수정 로직
export async function villageUpdate(id, title, content) {
    const token = getAccessToken();

    try {
        const response = await fetch(
            `/danum-backend/board/village/update`,
            {
                method: 'PUT',
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    id,
                    title,
                    content,
                }),
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

// 동네이야기 게시판 삭제 로직
export async function villageDelete(id) {
    const token = getAccessToken();

    try {
        const response = await fetch(
            `/danum-backend/board/village/villages/${id}`,
            {
                method: 'DELETE',
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

// 동네게시판 태그 필터링 로직
export async function villageType(postType) {
    try {
        const response = await fetch(
            `/danum-backend/board/village/by-type/${postType}`,
            {
                method: 'GET',
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
