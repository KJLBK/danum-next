'use client';

import { useParams, useRouter } from 'next/navigation';
import PostInfoPanel from '../../../../components/board/view/PostInfoPanel';
import CommentList from '../../../../components/board/view/comment/CommentLIst';
import useVillageDetail from '../../../../hooks/village/useVillageDetail';
import styles from './page.module.css';
import { useEffect } from 'react';

export default function VillageViewPage() {
    const params = useParams();
    const router = useRouter();
    const postId = params.questionId || params.villageId;

    const {
        data,
        isLoading,
        deleteVillagePost,
        isDeleting,
    } = useVillageDetail(postId);

    const handleClose = () => {
        router.back(); // 이전 페이지로 돌아가기
    };

    useEffect(() => {
        // 모달이 열릴 때
        document.body.style.overflow = 'hidden';
        document.body.style.paddingRight = '15px'; // 스크롤바 너비만큼 보정

        // 컴포넌트가 언마운트될 때 (모달이 닫힐 때)
        return () => {
            document.body.style.overflow = 'auto';
            document.body.style.paddingRight = '0px';
        };
    }, []);

    if (isLoading) return <div>Loading...</div>;

    return (
        <div className={styles.modalContainer}>
            <div className={styles.modalContent}>
                <button
                    className={styles.closeButton}
                    onClick={handleClose}
                >
                    ×
                </button>
                <div className={styles.modalHeader}>
                    <PostInfoPanel
                        board="villages"
                        postId={postId}
                        data={data}
                        isDeleting={isDeleting}
                        deletePost={deleteVillagePost}
                    />
                </div>
                <div className={styles.modalBody}>
                    <CommentList
                        type="village"
                        PostAuthorId={data.author?.userId}
                    />
                </div>
            </div>
        </div>
    );
}
