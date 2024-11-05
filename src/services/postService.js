/**
 * 엔드포인트: GET /main/recent-posts
 * 응답 형식: JSON
 * */
export async function fetchRecentPosts(page) {
    const response = await fetch(
        `/main/recent-posts?page=${page}`,
    );
    if (!response.ok) {
        throw new Error('Failed to fetch posts');
    }
    return response.json();
}
