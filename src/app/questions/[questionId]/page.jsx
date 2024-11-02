'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import {
    questionDetail,
    questionDelete,
    questionCommentShow,
} from '../../../services/questionService';
import { handleCommentSelection } from '../../../hooks/commentSelect'; // 서비스 함수 import
import QuestionCommentItem from '../../../components/question/comment/QuestionCommentItem';
import QuestionCommentNew from '../../../components/question/new/QuestionCommentNew';
import QuillViewer from '../../../components/board/QuillViewer';
import PostInfoPanel from '../../../components/board/PostInfoPanel';
import { useAuthStore } from '../../../stores/authStore';

export default function QuestionsViewPage() {
    const [data, setData] = useState({});
    const [comments, setComments] = useState([]);
    const [selectedCommentId, setSelectedCommentId] =
        useState(null);
    const params = useParams();
    const { isLoggedIn, user } = useAuthStore();

    // 질문과 댓글을 가져오는 함수
    const fetchData = async () => {
        try {
            const response = await questionDetail(
                params.questionId,
            );
            setData(response);
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
    const onSelectComment = (commentId) => {
        handleCommentSelection(
            params.questionId,
            commentId,
            selectedCommentId,
            setSelectedCommentId,
            setComments,
        );
    };

    return (
        <div>
            <PostInfoPanel
                data={data}
                board="questions"
                onDelete={questionDelete}
            />
            <QuillViewer content={data.content} />
            <hr />
            <h2>댓글</h2>

            {isLoggedIn ? (
                <QuestionCommentNew
                    email={user}
                    questionId={params.questionId}
                />
            ) : (
                <p>댓글을 작성하려면 로그인하세요.</p>
            )}

            {comments.map((item) => (
                <QuestionCommentItem
                    key={item.comment_id}
                    {...item}
                    emailCheck={isLoggedIn ? user : null}
                    questionId={params.questionId}
                    accepted={
                        item.comment_id ===
                        selectedCommentId
                    } // 선택된 댓글 ID에 따라 채택 상태 설정
                    onSelect={onSelectComment} // 선택 이벤트 핸들러
                />
            ))}
        </div>
    );
}
