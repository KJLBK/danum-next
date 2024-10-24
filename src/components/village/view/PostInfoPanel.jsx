import AuthorChatButton from '../../chat/AuthorChatButton';
import style from './PostInfoPanel.module.css';
import { formatTimeAgo } from '../../../utils/timeFormat';
import { useParams, useRouter } from 'next/navigation';
import { useAuthStore } from '../../../stores/authStore';
import { villageDelete } from '../../../services/villageService';
import Modal from '../../../components/common/Modal';
import { useState } from 'react';

export default function PostInfoPanel({ data }) {
    const [isModalOpen, setModalOpen] = useState(false);
    const params = useParams();
    const router = useRouter();
    const { user } = useAuthStore();

    const goToEditPage = () => {
        router.push(`/villages/${params.villageId}/edit`);
    };

    const openModal = () => setModalOpen(true);
    const closeModal = () => setModalOpen(false);

    const handleDelete = () => {
        villageDelete(params.villageId);
        router.push('/villages');
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
                    className={`${style.button} ${user === data.author?.userId ? '' : style.hide}`}
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
