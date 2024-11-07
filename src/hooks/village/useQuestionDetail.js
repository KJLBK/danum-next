import {
    useMutation,
    useQuery,
    useQueryClient,
} from '@tanstack/react-query';
import {
    questionDetail,
    questionDelete,
    questionUpdate,
    questionLike,
} from '../../services/questionService';

export default function useQuestionDetail(questionId) {
    const queryClient = useQueryClient();

    // 질문 상세 조회
    const { data, isLoading, error } = useQuery({
        queryKey: ['questionDetail', questionId],
        queryFn: () => questionDetail(questionId),
    });

    // 질문 삭제
    const deleteMutation = useMutation({
        mutationFn: () => questionDelete(questionId),
        onSuccess: () => {
            queryClient.invalidateQueries(['questionList']);
        },
        onError: (error) => {
            console.error(
                'Failed to delete question',
                error,
            );
        },
    });

    // 질문 수정
    const updateMutation = useMutation({
        mutationFn: ({ title, content }) =>
            questionUpdate(questionId, title, content),
        onSuccess: () => {
            queryClient.invalidateQueries([
                'questionDetail',
                questionId,
            ]);
        },
        onError: (error) => {
            console.error(
                'Failed to update question',
                error,
            );
        },
    });

    // 질문 좋아요
    const likeMutation = useMutation({
        mutationFn: () => questionLike(questionId),
        onSuccess: () => {
            queryClient.invalidateQueries([
                'questionDetail',
                questionId,
            ]);
        },
        onError: (error) => {
            console.error('Failed to like question', error);
        },
    });

    const deleteQuestion = () => deleteMutation.mutate();
    const updateQuestion = (title, content) =>
        updateMutation.mutate({ title, content });
    const likeQuestion = () => likeMutation.mutate();

    return {
        data,
        isLoading,
        error,
        deleteQuestion,
        updateQuestion,
        likeQuestion,
        isDeleting: deleteMutation.isLoading,
        isUpdating: updateMutation.isLoading,
        isLiking: likeMutation.isLoading,
    };
}
