'use client';

import { useInfiniteQuery } from '@tanstack/react-query';
import { useCallback, useEffect, useRef } from 'react';
import Spinner from './Spinner';
import './InfiniteScroll.css';
import { usePostStore } from '../../stores/postStore';
import { formatTimeAgo } from '../../utils/timeFormat';

export default function InfiniteScroll({
    serviceLogic,
    queryKey = ['data'],
}) {
    const observerRef = useRef(null);
    const addPosts = usePostStore(
        (state) => state.addPosts,
    );

    const {
        data,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        status,
        error,
    } = useInfiniteQuery({
        queryKey,
        queryFn: ({ pageParam = 1 }) => {
            console.log(`Fetching page: ${pageParam}`);
            return serviceLogic(pageParam);
        },
        getNextPageParam: (lastPage) => {
            return lastPage.last
                ? (lastPage.pageNumber = 0)
                : lastPage.pageNumber + 1;
        },
        onSuccess: (data) => {
            console.log('Fetched data:', data);
            data.pages.forEach((page) => {
                addPosts(page.content);
            });
        },
    });

    const handleObserver = useCallback(
        (entries) => {
            const [entry] = entries;
            console.log('Observer entry:', entry);
            if (entry.isIntersecting && hasNextPage) {
                console.log('Fetching next page...');
                fetchNextPage();
            }
        },
        [hasNextPage, fetchNextPage],
    );

    useEffect(() => {
        const observer = new IntersectionObserver(
            handleObserver,
            {
                threshold: 1.0,
            },
        );
        if (observerRef.current) {
            observer.observe(observerRef.current);
            console.log(
                'Observer attached to:',
                observerRef.current,
            );
        }
        return () => {
            if (observerRef.current) {
                observer.unobserve(observerRef.current);
                console.log(
                    'Observer detached from:',
                    observerRef.current,
                );
            }
            observer.disconnect();
        };
    }, [handleObserver]);

    useEffect(() => {
        console.log('Query status:', status);
        if (error) {
            console.error('Query error:', error);
        }
    }, [status, error]);

    return (
        <div className="infinite-scroll">
            {data?.pages.map((page, pageIndex) => (
                <div key={`page-${pageIndex}`}>
                    {page.content.map((post) => {
                        const isQuestion =
                            post.question_id !== undefined;
                        const key = isQuestion
                            ? `question-${post.question_id}`
                            : `village-${post.village_id}`;
                        return (
                            <div key={key} className="post">
                                <h3>{post.title}</h3>
                                <p>{post.content}</p>
                                <span>
                                    {formatTimeAgo(
                                        post.created_at,
                                    )}
                                </span>
                            </div>
                        );
                    })}
                </div>
            ))}

            <div ref={observerRef} className="observer">
                {isFetchingNextPage && <Spinner />}
            </div>
        </div>
    );
}
