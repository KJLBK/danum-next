'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import {
    questionDetail,
    questionDelete,
    questionCommentShow,
    questionCommentNew,
    questionCommentDelete,
    questionCommentUpdate,
} from '../../../services/questionService';
import { handleCommentSelection } from '../../../hooks/commentSelect'; // 서비스 함수 import
import CommentItem from '../../../components/board/view/CommentItem';
import CommentNew from '../../../components/board/new/CommentNew';
import QuillViewer from '../../../components/board/view/QuillViewer';
import PostInfoPanel from '../../../components/board/view/PostInfoPanel';
import { useAuthStore } from '../../../stores/authStore';
import { aiChat } from '../../../services/chatGPTService';

export default function QuestionsViewPage() {
    const [data, setData] = useState({});
    const [comments, setComments] = useState([]);
    const [selectedCommentId, setSelectedCommentId] =
        useState(null);
    const params = useParams();
    const { isLoggedIn, user } = useAuthStore();
    const [author, setAuthor] = useState('');
    const [message, setMessage] = useState('');

    // 질문과 댓글을 가져오는 함수
    const fetchData = async () => {
        try {
            const response = await questionDetail(
                params.questionId,
            );
            setData(response);
            setAuthor(response.author.userId);
        } catch (err) {
            console.error(
                '질문 세부 정보 가져오기 오류:',
                err,
            );
        }
    };

    const fetchComments = async () => {
        try {
            const response = await questionCommentShow(
                params.questionId,
            );
            setComments(response);
            const selectedComment = response.find(
                (comment) => comment.accepted === true,
            );
            if (selectedComment) {
                setSelectedCommentId(
                    selectedComment.comment_id,
                ); // 채택된 댓글 ID 추적
            }
        } catch (err) {
            console.error('댓글 가져오기 오류:', err);
        }
    };

    useEffect(() => {
        fetchData();
        fetchComments();
    }, [params.questionId]); // questionId가 변경될 때마다 다시 가져옴

    // 서비스 함수 호출로 댓글 선택/해제 처리
    const onSelectComment = async (commentId) => {
        await handleCommentSelection(
            params.questionId,
            commentId,
            selectedCommentId,
            setSelectedCommentId,
            setComments,
            'question',
        );
    };

    const handleMessage = (e) => {
        setMessage(e.target.value);
    };

    const handleAiChat = async () => {
        await aiChat(params.questionId, message);
        location.reload();
    };

    return (
        <div>
            <PostInfoPanel
                data={data}
                board="questions"
                onDelete={questionDelete}
            />
            <QuillViewer content={data.content} />

            {user === data.author?.userId ? (
                <div>
                    <input
                        type="text"
                        onChange={handleMessage}
                        value={message}
                    />
                    <button onClick={handleAiChat}>
                        질문
                    </button>
                </div>
            ) : (
                <div></div>
            )}
            <hr />
            <h2>댓글</h2>

            {isLoggedIn ? (
                <CommentNew
                    postId={params.questionId}
                    email={user}
                    onSubmitComment={questionCommentNew}
                    type="question"
                />
            ) : (
                <p>댓글을 작성하려면 로그인하세요.</p>
            )}

            {comments.map((item) => (
                <CommentItem
                    key={item.comment_id}
                    {...item}
                    author={author}
                    onSelect={onSelectComment}
                    onDelete={questionCommentDelete}
                    onUpdate={questionCommentUpdate}
                    type="question"
                />
            ))}
        </div>
    );
}
