// components/board/view/comment/UserComment.jsx
import { useEffect, useState } from 'react';
import style from './UserComment.module.css';
import { formatTimeAgo } from '../../../../utils/timeFormat';
import { useAuthStore } from '../../../../stores/authStore';
import { useComments } from '../../../../hooks/village/useComments';

export default function UserComment({
    content,
    created_at,
    comment_id,
    accepted,
    author,
    postId,
    type,
    PostAuthorId,
}) {
    const [isEditing, setIsEditing] = useState(false);
    const [updatedContent, setUpdatedContent] =
        useState(content);
    const { email } = useAuthStore();

    const {
        deleteComment,
        updateComment,
        acceptComment,
        unacceptComment,
    } = useComments(postId, type);

    useEffect(() => {
        console.log();
    });

    const handleDelete = () =>
        deleteComment.mutate(comment_id);
    const handleUpdate = async () => {
        await updateComment.mutate({
            id: comment_id,
            content: updatedContent,
        });
        setIsEditing(false);
    };
    const handleSelect = () => {
        if (accepted) {
            unacceptComment.mutate(comment_id);
        } else {
            acceptComment.mutate(comment_id);
        }
    };

    return (
        <div className={style.comment}>
            <div className={style.email}>
                <span>{author}</span>
                <span className={style.time}>
                    {formatTimeAgo(created_at)}
                </span>
            </div>
            {isEditing ? (
                <>
                    <textarea
                        className={style.textarea}
                        value={updatedContent}
                        onChange={(e) =>
                            setUpdatedContent(
                                e.target.value,
                            )
                        }
                    />
                    <button onClick={handleUpdate}>
                        저장
                    </button>
                    <button
                        onClick={() => setIsEditing(false)}
                    >
                        취소
                    </button>
                </>
            ) : (
                <>
                    {author === email && (
                        <>
                            <button
                                onClick={() =>
                                    setIsEditing(true)
                                }
                            >
                                수정
                            </button>
                            <button onClick={handleDelete}>
                                삭제
                            </button>
                        </>
                    )}
                    <div className={style.content}>
                        {content}
                    </div>
                    {PostAuthorId === email && (
                        <button onClick={handleSelect}>
                            {accepted
                                ? '채택해제'
                                : '채택하기'}
                        </button>
                    )}
                </>
            )}
        </div>
    );
}
