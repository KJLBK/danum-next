import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useParams } from 'next/navigation';
import Modal from '../../../components/common/Modal';
import { formatTimeAgo } from '../../../utils/timeFormat';
import style from './PostInfoPanel.module.css';
import { useAuthStore } from '../../../stores/authStore';
import AuthorChatButton from '../../chat/AuthorChatButton';

export default function PostInfoPanel({ data }) {
    const [isModalOpen, setModalOpen] = useState(false);
    const params = useParams();
    const router = useRouter();
    const { user } = useAuthStore();

    // 수정 페이지로 이동하는 함수
    const goToEditPage = () => {
        router.push(`/questions/${params.questionId}/edit`);
    };

    // 모달 열기/닫기 함수
    const openModal = () => setModalOpen(true);
    const closeModal = () => setModalOpen(false);

    // 게시글 삭제 함수
    const handleDelete = () => {
        questionDelete(params.questionId);
        router.push('/questions');
    };

    return (
        <>
            <h1 className={style.title}>{data.title}</h1>
            <div className={style.info}>
                <span className={style.profile}></span>
                <span className={style.email}>
                    <AuthorChatButton
                        userId={data.author?.userId}
                        userName={data.author?.userName}
                    />
                </span>
                &nbsp;&nbsp;
                <span className={style.metaInfo}>
                    {formatTimeAgo(data.created_at)} • 읽음{' '}
                    {data.view_count}
                </span>
                <div
                    className={`${style.button} ${user !== data.author?.userId ? '' : style.hide}`}
                >
                    <button onClick={goToEditPage}>
                        수정
                    </button>
                    <button onClick={openModal}>
                        삭제
                    </button>
                </div>
            </div>

            {/* 모달 */}
            {isModalOpen && (
                <Modal
                    isOpen={isModalOpen}
                    title="게시글 삭제"
                    content="정말로 게시글을 삭제하시겠습니까?"
                    onConfirm={handleDelete}
                    onCancel={closeModal}
                />
            )}
        </>
    );
}
