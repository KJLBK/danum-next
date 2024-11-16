'use client';

import { useParams, useRouter } from 'next/navigation';
import PostInfoPanel from '../../../../components/board/view/PostInfoPanel';
import CommentList from '../../../../components/board/view/comment/CommentList';
import useVillageDetail from '../../../../hooks/village/useVillageDetail';
import { useEffect } from 'react';
import styles from './page.module.css';
import Spinner from '../../../../components/common/Spinner';

// SVG 컴포넌트 분리
const FullScreenIcon = () => (
    <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="currentColor"
    >
        <path d="M5.81055 11.2793C6.2793 11.2793 6.61133 10.9375 6.61133 10.4688V10.2148L6.43555 7.5L8.27148 9.45312L10.5371 11.7481C10.6934 11.9043 10.8887 11.9824 11.1035 11.9824C11.6016 11.9824 11.9727 11.6504 11.9727 11.1523C11.9727 10.918 11.8945 10.7031 11.7285 10.5469L9.45312 8.27148L7.49023 6.43555L10.2246 6.61133H10.4688C10.9375 6.61133 11.2988 6.2793 11.2988 5.81055C11.2988 5.3418 10.9375 5 10.4688 5H6.41602C5.51758 5 5 5.51758 5 6.41602V10.4688C5 10.9277 5.3418 11.2793 5.81055 11.2793ZM14.1895 19.6875H18.2422C19.1406 19.6875 19.6582 19.1699 19.6582 18.2715V14.2188C19.6582 13.7598 19.3164 13.4082 18.8477 13.4082C18.3887 13.4082 18.0469 13.75 18.0469 14.2188V14.4727L18.2324 17.1875L16.3965 15.2344L14.1211 12.9394C13.9746 12.7832 13.7695 12.7051 13.5547 12.7051C13.0566 12.7051 12.6856 13.0371 12.6856 13.5352C12.6856 13.7695 12.7734 13.9844 12.9297 14.1406L15.2051 16.416L17.168 18.252L14.4434 18.0762H14.1895C13.7207 18.0762 13.3691 18.4082 13.3594 18.877C13.3594 19.3457 13.7207 19.6875 14.1895 19.6875Z" />
    </svg>
);

const CloseIcon = () => (
    <svg
        width="28"
        height="28"
        viewBox="0 0 28 28"
        fill="currentColor"
    >
        <path d="M8.31361 17.9346C7.94447 18.3037 7.92689 18.9629 8.3224 19.3408C8.70033 19.7363 9.3683 19.7188 9.73744 19.3496L14.0001 15.0869L18.2628 19.3496C18.6408 19.7275 19.2911 19.7363 19.6691 19.3408C20.0646 18.9629 20.0558 18.3037 19.6779 17.9258L15.4152 13.6631L19.6779 9.40918C20.0558 9.02246 20.0646 8.37207 19.6691 7.99414C19.2911 7.59863 18.6408 7.60742 18.2628 7.98535L14.0001 12.248L9.73744 7.98535C9.3683 7.61621 8.70033 7.59863 8.3224 7.99414C7.92689 8.37207 7.94447 9.03125 8.31361 9.40039L12.5763 13.6631L8.31361 17.9346Z" />
    </svg>
);

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

    // 이벤트 핸들러
    const handleClose = () => router.back();
    const handleFull = () => window.location.reload();

    useEffect(() => {
        document.body.style.overflow = 'hidden';
        document.body.style.paddingRight = '15px'; // 스크롤바 너비 보정
        return () => {
            document.body.style.overflow = 'auto';
            document.body.style.paddingRight = '0px';
        };
    }, []);

    if (isLoading) return <Spinner />;

    return (
        <div className={styles.modalContainer}>
            <div className={styles.modalContent}>
                <div className={styles.modalIcon}>
                    <button
                        className={styles.fullButton}
                        onClick={handleFull}
                    >
                        <FullScreenIcon />
                    </button>
                    <button
                        className={styles.closeButton}
                        onClick={handleClose}
                    >
                        <CloseIcon />
                    </button>
                </div>
                <div className={styles.modalPostBody}>
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
                            PostAuthorId={
                                data.author?.userId
                            }
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
