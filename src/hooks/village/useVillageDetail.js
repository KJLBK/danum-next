/**
 * useVillageDetail(게시물 상세 정보 훅)
 */

import {
    useMutation,
    useQuery,
    useQueryClient,
} from '@tanstack/react-query';
import {
    villageDelete,
    villageDetail,
} from '../../services/villageService';

export default function useVillageDetail(villageId) {
    const queryClient = useQueryClient();

    const { data, isLoading, error } = useQuery({
        queryKey: ['villageDetail', villageId],
        queryFn: () => villageDetail(villageId),
    });

    const deleteMutation = useMutation({
        mutationFn: villageDelete,
        onSuccess: () => {
            queryClient.invalidateQueries(['villageList']);
            queryClient.invalidateQueries([
                'villageDetail',
                villageId,
            ]);
        },
        onError: (error) => {
            console.error(
                'Failed to delete village post',
                error,
            );
        },
    });

    const deleteVillagePost = () =>
        deleteMutation.mutate(villageId);

    return {
        data,
        isLoading,
        error,
        deleteVillagePost,
        isDeleting: deleteMutation.isLoading,
    };
}
