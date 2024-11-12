'use server';

/**
 * 엔드포인트: GET /main/recent-posts
 * 응답 형식: JSON
 * */
export async function fetchRecentPosts(page) {
    try {
        const response = await fetch(
            `${process.env.NEXT_PUBLIC_BASE_URL}/main/recent-posts?page=${page}`,
        );

        if (!response.ok) {
            console.error(
                `Failed to fetch posts. Status: ${response.status}`,
            );
            throw new Error('Failed to fetch posts');
        }

        const data = await response.json();
        // console.log('Fetched Data:', data); // 응답 데이터 출력
        return data;
    } catch (error) {
        console.error(
            'Error fetching recent posts:',
            error,
        ); // 오류 시 콘솔 로그
        throw error;
    }
}

//질문이야기 게시판 조회 로직
export async function questionShow(page) {
    try {
        console.log(page, 'log');
        const response = await fetch(
            `${process.env.NEXT_PUBLIC_BASE_URL}/board/question/show?page=${page}`,
            {
                method: 'GET',
            },
        );

        if (!response.ok) {
            throw new Error(`Error: ${response.status}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching data', error);
        return [];
    }
}
