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
