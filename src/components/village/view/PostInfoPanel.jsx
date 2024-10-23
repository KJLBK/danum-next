import AuthorChatButton from '../../chat/AuthorChatButton';
import style from './PostInfoPanel.module.css';
import { formatTimeAgo } from '../../../utils/timeFormat';

export default function PostInfoPanel({ data }) {
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
            </div>
        </>
    );
}
