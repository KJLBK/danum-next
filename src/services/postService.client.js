export async function fetchPopularPosts() {
    const response = await fetch(
        '/danum-backend/main/popular-posts',
    );

    if (!response.ok) {
        throw new Error(
            'Failed to fetch popular posts.',
            response.status,
        );
    }
    return await response.json();
}
