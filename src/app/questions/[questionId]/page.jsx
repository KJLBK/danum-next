'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import {
    questionDetail,
    questionCommentShow,
    quesitonCommentSelect,
    quesitonCommentDeselect,
} from '../../../services/questionService';
import QuestionCommentItem from '../../../components/question/comment/QuestionCommentItem';
import QuestionCommentNew from '../../../components/question/new/QuestionCommentNew';
import style from './page.module.css';
import QuillViewer from '../../../components/question/view/QuillViewer';
import PostInfoPanel from '../../../components/question/view/PostInfoPanel';
import { useAuthStore } from '../../../stores/authStore';

export default function QuestionsViewPage() {
    const [data, setData] = useState({});
    const [comments, setComments] = useState([]);
    const [selectedCommentId, setSelectedCommentId] =
        useState(null); // 선택된 댓글 ID를 추적
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
                ); // 채택된 댓글 ID를 추적
            }
        } catch (err) {
            console.error('댓글 가져오기 오류:', err);
        }
    };

    useEffect(() => {
        fetchData();
        fetchComments();
    }, [params.questionId]); // questionId가 변경될 때마다 다시 가져옴

    // 댓글 선택 처리
    const handleCommentSelect = async (commentId) => {
        try {
            // 현재 선택된 댓글이 있으면 선택 해제
            if (selectedCommentId) {
                await quesitonCommentDeselect(
                    params.questionId,
                    selectedCommentId,
                );
            }

            // 같은 댓글이 선택되면 그냥 선택 해제
            if (selectedCommentId === commentId) {
                setSelectedCommentId(null); // 현재 댓글 선택 해제
            } else {
                await quesitonCommentSelect(
                    params.questionId,
                    commentId,
                ); // 새로운 댓글 선택
                setSelectedCommentId(commentId); // 새로운 선택된 댓글 ID 설정
            }

            // 댓글을 다시 가져와서 채택 상태 업데이트
            fetchComments();
        } catch (error) {
            console.error(
                '댓글 선택/해제 중 오류 발생:',
                error,
            );
        }
    };

    return (
        <div>
            <PostInfoPanel data={data} />
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
                    onSelect={handleCommentSelect}
                />
            ))}
        </div>
    );
}
