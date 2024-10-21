// services/commentService.js
import {
    quesitonCommentSelect,
    quesitonCommentDeselect,
    questionCommentShow,
} from '../services/questionService';

// 채택된 댓글 선택/해제 처리 로직
export const handleCommentSelection = async (
    questionId,
    commentId,
    selectedCommentId,
    setSelectedCommentId,
    setComments,
) => {
    try {
        // 현재 선택된 댓글이 있으면 해제 처리
        if (selectedCommentId) {
            await quesitonCommentDeselect(
                questionId,
                selectedCommentId,
            );
        }

        // 같은 댓글을 다시 선택하면 선택 해제
        if (selectedCommentId === commentId) {
            setSelectedCommentId(null); // 현재 댓글 선택 해제
        } else {
            await quesitonCommentSelect(
                questionId,
                commentId,
            ); // 새로운 댓글 선택
            setSelectedCommentId(commentId); // 새로운 선택된 댓글 ID 설정
        }

        // 댓글 목록을 다시 가져와서 상태 업데이트
        const updatedComments =
            await questionCommentShow(questionId);
        setComments(updatedComments);
    } catch (error) {
        console.error(
            '댓글 선택/해제 중 오류 발생:',
            error,
        );
    }
};
