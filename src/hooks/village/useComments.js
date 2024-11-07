import {
    useMutation,
    useQuery,
    useQueryClient,
} from '@tanstack/react-query';
import {
    villageCommentDelete,
    villageCommentNew,
    villageCommentShow,
    villageCommentUpdate,
    villageAccept,
    villageUnaccept,
} from '../../services/villageService';
import {
    questionCommentDelete,
    questionCommentNew,
    questionCommentShow,
    questionCommentUpdate,
    quesitonCommentSelect,
    quesitonCommentDeselect,
} from '../../services/questionService';

export function useComments(postId, type) {
    const queryClient = useQueryClient();

    // 게시판 유형에 따라 API를 선택
    const api =
        type === 'village'
            ? {
                  show: villageCommentShow,
                  new: villageCommentNew,
                  delete: villageCommentDelete,
                  update: villageCommentUpdate,
                  accept: villageAccept,
                  unaccept: villageUnaccept,
              }
            : {
                  show: questionCommentShow,
                  new: questionCommentNew,
                  delete: questionCommentDelete,
                  update: questionCommentUpdate,
                  accept: quesitonCommentSelect,
                  unaccept: quesitonCommentDeselect,
              };

    // 댓글 목록 조회
    const { data: comments, isLoading } = useQuery({
        queryKey: [`${type}Comments`, postId],
        queryFn: () => api.show(postId),
    });

    // 댓글 추가
    const addComment = useMutation({
        mutationFn: (newCommentData) =>
            api.new(newCommentData),
        onSuccess: () => {
            queryClient.invalidateQueries([
                `${type}Comments`,
                postId,
            ]);
        },
    });

    // 댓글 삭제
    const deleteComment = useMutation({
        mutationFn: (commentId) => api.delete(commentId),
        onSuccess: () => {
            queryClient.invalidateQueries([
                `${type}Comments`,
                postId,
            ]);
        },
    });

    // 댓글 수정
    const updateComment = useMutation({
        mutationFn: ({ id, content }) =>
            api.update(id, content),
        onSuccess: () => {
            queryClient.invalidateQueries([
                `${type}Comments`,
                postId,
            ]);
        },
    });

    // 댓글 채택/채택 해제
    const acceptComment = useMutation({
        mutationFn: (commentId) =>
            api.accept(postId, commentId),
        onSuccess: () => {
            queryClient.invalidateQueries([
                `${type}Comments`,
                postId,
            ]);
        },
    });

    const unacceptComment = useMutation({
        mutationFn: (commentId) =>
            api.unaccept(postId, commentId),
        onSuccess: () => {
            queryClient.invalidateQueries([
                `${type}Comments`,
                postId,
            ]);
        },
    });

    return {
        comments,
        isLoading,
        addComment,
        deleteComment,
        updateComment,
        acceptComment,
        unacceptComment,
    };
}
