import { useQuery } from '@tanstack/react-query';
import { fetchPopularPosts } from '../services/postService.client';

export default function usePopularPosts() {
    return useQuery({
        queryKey: ['popularPosts'],
        queryFn: fetchPopularPosts,
        staleTime: 300000, // 5m
        cacheTime: 300000,
        refetchInterval: 300000,
        onError: (err) =>
            console.error(
                `Failed to fetch popular post: ${err}`,
            ),
    });
}
