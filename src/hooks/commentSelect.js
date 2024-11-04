import {
    quesitonCommentSelect,
    quesitonCommentDeselect,
    questionCommentShow,
} from '../services/questionService';
import {
    villageAccept,
    villageUnaccept,
    villageCommentShow,
} from '../services/villageService';

export const handleCommentSelection = async (
    postId,
    commentId,
    selectedCommentId,
    setSelectedCommentId,
    setComments,
    type = 'question',
) => {
    try {
        const selectFn =
            type === 'question'
                ? quesitonCommentSelect
                : villageAccept;
        const deselectFn =
            type === 'question'
                ? quesitonCommentDeselect
                : villageUnaccept;
        const showCommentsFn =
            type === 'question'
                ? questionCommentShow
                : villageCommentShow;

        // 같은 댓글을 다시 클릭한 경우 (채택 해제)
        if (selectedCommentId === commentId) {
            await deselectFn(postId, selectedCommentId);
            setSelectedCommentId(null);
        }
        // 다른 댓글을 선택한 경우
        else {
            // 이미 채택된 댓글이 있는 경우, 먼저 해제
            if (selectedCommentId) {
                await deselectFn(postId, selectedCommentId);
            }
            // 새로운 댓글 채택
            await selectFn(postId, commentId);
            setSelectedCommentId(commentId);
        }

        // 댓글 목록 갱신
        const updatedComments =
            await showCommentsFn(postId);
        setComments(updatedComments);
    } catch (error) {
        console.error(
            '댓글 선택/해제 중 오류 발생:',
            error,
        );
    }
};
