'use client';

import { useState } from 'react';
import styles from './LikeButton.module.css';
import { villageLike } from '../../../services/villageService';
import { questionLike } from '../../../services/questionService';

export default function LikeButton({
    postId,
    board,
    likeCount,
    initialLiked = false,
}) {
    const [isLiked, setIsLiked] = useState(initialLiked);
    const [isLoading, setIsLoading] = useState(false);

    const handleLike = async () => {
        if (isLoading) return;

        setIsLoading(true);
        try {
            const likeService =
                board === 'questions'
                    ? questionLike
                    : villageLike;
            const response = await likeService(postId);

            if (response.ok) {
                // response.success 대신 response.ok 사용
                setIsLiked(!isLiked); // 좋아요 상태 토글
            } else {
                throw new Error(
                    'Failed to update like status',
                );
            }
        } catch (error) {
            console.error('Error updating like:', error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <label className={styles.container}>
            <input
                type="checkbox"
                checked={isLiked} // checked 속성 추가
                onChange={handleLike}
                disabled={isLoading}
            />
            <svg
                id="Layer_1"
                version="1.0"
                viewBox="0 0 24 24"
                xmlSpace="preserve"
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
            >
                <path d="M16.4,4C14.6,4,13,4.9,12,6.3C11,4.9,9.4,4,7.6,4C4.5,4,2,6.5,2,9.6C2,14,12,22,12,22s10-8,10-12.4C22,6.5,19.5,4,16.4,4z" />
            </svg>
            {likeCount}
        </label>
    );
}
