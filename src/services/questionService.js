import { getAccessToken } from './tokenService';

// 질문이야기 게시판 생성 로직
export async function questionNew({
    email,
    title,
    content,
    createId,
}) {
    const token = getAccessToken();

    try {
        const response = await fetch(
            '/danum-backend/board/question/new',
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
                    createId,
                }),
            },
        );

        if (!response.ok) {
            throw new Error(`Error: ${response.status}`);
        }
        alert('생성 완료');
        return response;
    } catch (error) {
        console.error('Error fetching data', error);
        return [];
    }
}

// 질문이야기 게시판 삭제 로직
export async function questionDelete(id) {
    const token = getAccessToken();

    try {
        const response = await fetch(
            `/danum-backend/board/question/questions/${id}`,
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

// 질문이야기 수정 로직
export async function questionUpdate(id, title, content) {
    const token = getAccessToken();

    try {
        const response = await fetch(
            `/danum-backend/board/question/update`,
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

//질문이야기 게시판 상세 조회 로직
export async function questionDetail(questionId) {
    try {
        const response = await fetch(
            `/danum-backend/board/question/show/${questionId}`,
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

//질문이야기 댓글 조회 로직
export async function questionCommentShow(questionId) {
    try {
        const response = await fetch(
            `/danum-backend/board/question/comment/show/${questionId}`,
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

// 질문이야기 댓글 생성 로직
export async function questionCommentNew({
    question_id,
    member_email,
    content,
}) {
    const token = getAccessToken();

    try {
        const response = await fetch(
            '/danum-backend/board/question/comment/new',
            {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    question_id,
                    member_email,
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

// 질문이야기 댓글 삭제 로직
export async function questionCommentDelete(comment_id) {
    const token = getAccessToken();

    try {
        const response = await fetch(
            `/danum-backend/board/question/comment/${comment_id}`,
            {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    comment_id,
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

// 질문이야기 댓글 수정 로직
export async function questionCommentUpdate(id, content) {
    const token = getAccessToken();

    try {
        const response = await fetch(
            `/danum-backend/board/question/comment/update`,
            {
                method: 'PUT',
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    id,
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

// 질문이야기 댓글 채택 기능
export async function quesitonCommentSelect(
    questionId,
    commentId,
) {
    const token = getAccessToken();

    try {
        const response = await fetch(
            `/danum-backend/board/question/comment/${questionId}/accept/${commentId}`,
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

// 질문이야기 댓글 채택취소 기능
export async function quesitonCommentDeselect(
    questionId,
    commentId,
) {
    const token = getAccessToken();

    try {
        const response = await fetch(
            `/danum-backend/board/question/comment/${questionId}/unaccept/${commentId}`,
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

// 질문이야기 게시물 좋아요 기능 로직
export async function questionLike(questionId) {
    const token = getAccessToken();

    try {
        const response = await fetch(
            `/danum-backend/board/question/like/${questionId}`,
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
        console.error('Error', error);
        return [];
    }
}

// 지역별 글 조회 로직
export async function regionShow(
    city,
    district,
    pageParmas = 0,
) {
    const token = getAccessToken();
    try {
        const response = await fetch(
            `/danum-backend/board/question/region?city=${city}&district=${district}&page=${pageParmas}`,
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
