//질문이야기 댓글 조회 로직
export async function questionCommentShow(questionId) {
    const token =
        'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhQGEiLCJyb2xlIjpbeyJhdXRob3JpdHkiOiJBRE1JTiJ9XSwiZXhwIjoyMDE2MjYyMzYyfQ.sUoNzSqQtO7A6eAOkUbCb4_lPL96i8xkIHyvI3X6TfU';

    try {
        const response = await fetch(
            `/api/board/question/comment/show/${questionId}`,
            {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
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
