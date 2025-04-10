'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Modal from '../../common/Modal';
import { formatTimeAgo } from '../../../utils/timeFormat';
import style from './PostInfoPanel.module.css';
import { useAuthStore } from '../../../stores/authStore';
import AuthorChatButton from '../../chat/AuthorChatButton';
import LikeButton from '../buttons/LikeButton';
import QuillViewer from './QuillViewer';
import Spinner from '../../common/Spinner';
import HelpButton from '../../common/HelpButton';

export default function PostInfoPanel({
    board,
    postId,
    data,
    isDeleting,
    deletePost,
}) {
    const [isModalOpen, setModalOpen] = useState(false);
    const router = useRouter();
    const { email: user, isLoggedIn } = useAuthStore();
    const content = data.content.split('[AI 답변]');

    // 수정 페이지로 이동하는 함수
    const goToEditPage = () => {
        router.back(); // 먼저 모달 닫기
        setTimeout(() => {
            router.push(`/${board}/${postId}/edit`);
        }, 100);
    };

    // 채팅 시작하면 모달 닫기
    const onClose = () => {
        router.back(); // 먼저 모달 닫기
    };

    // 모달 열기/닫기 함수
    const openModal = () => setModalOpen(true);
    const closeModal = () => setModalOpen(false);

    // 게시글 삭제 함수
    const handleDelete = async () => {
        deletePost();
        router.back(); // 상세 모달 닫기
        setTimeout(() => {
            router.push(`/${board}`);
        }, 100);
    };

    if (!data) {
        return <Spinner />;
    }

    return (
        <>
            <h1 className={style.title}>{data.title}</h1>
            <div className={style.info}>
                <span className={style.profile}></span>
                <span className={style.email}>
                    {isLoggedIn &&
                    user !== data.author?.userId ? (
                        <div>
                            <AuthorChatButton
                                userId={data.author?.userId}
                                userName={
                                    data.author?.userName
                                }
                                onChatStart={onClose}
                            />
                            <HelpButton />
                        </div>
                    ) : (
                        <span>{data.author?.userName}</span>
                    )}
                </span>
                &nbsp;&nbsp;
                <span className={style.metaInfo}>
                    {formatTimeAgo(data.created_at)} • 읽음{' '}
                    {data.view_count}
                </span>
                {user === data.author?.userId ? (
                    <div className={style.button}>
                        <button onClick={goToEditPage}>
                            수정
                        </button>
                        <button
                            onClick={openModal}
                            disabled={isDeleting}
                        >
                            {isDeleting
                                ? '삭제 중...'
                                : '삭제'}
                        </button>
                    </div>
                ) : (
                    <div className={style.button}>
                        <LikeButton
                            postId={postId}
                            board={board}
                            likeCount={data.like}
                        />
                    </div>
                )}
            </div>
            <QuillViewer content={content[0]} />

            <Modal
                isOpen={isModalOpen}
                title="게시글 삭제"
                content="정말로 게시글을 삭제하시겠습니까?"
                onConfirm={handleDelete}
                onCancel={closeModal}
            />
        </>
    );
}
