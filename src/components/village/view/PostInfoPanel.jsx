import AuthorChatButton from '../../chat/AuthorChatButton';
import style from './PostInfoPanel.module.css';
import { formatTimeAgo } from '../../../utils/timeFormat';
import { useParams, useRouter } from 'next/navigation';
import { useAuthStore } from '../../../stores/authStore';

export default function PostInfoPanel({ data }) {
    const params = useParams();
    const router = useRouter();
    const { user } = useAuthStore();

    const goToEditPage = () => {
        router.push(`/villages/${params.villageId}/edit`);
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
                </div>
            </div>
        </>
    );
}
