'use client';

import { useInfiniteQuery } from '@tanstack/react-query';
import { useCallback, useEffect, useRef } from 'react';
import Spinner from './Spinner';
import './InfiniteScroll.css';
import { usePostStore } from '../../stores/postStore';
import BoardItem from '../board/view/BoardItem';

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
        queryFn: ({ pageParam = 0 }) => {
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
                        const id = isQuestion
                            ? post.question_id
                            : post.village_id;
                        const board = isQuestion
                            ? 'questions'
                            : 'villages';

                        return (
                            <BoardItem
                                key={id}
                                question_id={
                                    post.question_id
                                }
                                village_id={post.village_id}
                                title={post.title}
                                content={post.content}
                                author={post.author}
                                created_at={post.created_at}
                                view_count={post.view_count}
                                hasAcceptedComment={
                                    post.hasAcceptedComment
                                }
                                board={board}
                            />
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
