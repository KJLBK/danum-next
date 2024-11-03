// components/common/CommentItem.jsx
import { useState } from 'react';
import style from './CommentItem.module.css';
import { formatTimeAgo } from '../../../utils/timeFormat';
import { useAuthStore } from '../../../stores/authStore';

export default function CommentItem({
    content,
    email,
    created_at,
    comment_id,
    accepted,
    onSelect,
    onDelete,
    onUpdate,
    type, // 'question' or 'village'
}) {
    const [isEditing, setIsEditing] = useState(false);
    const [updatedContent, setUpdatedContent] =
        useState(content);
    const { user } = useAuthStore();

    const handleDelete = () => {
        onDelete(comment_id);
    };

    const handleUpdate = async () => {
        try {
            await onUpdate(comment_id, updatedContent);
            setIsEditing(false);
        } catch (error) {
            console.error('Error updating comment:', error);
        }
    };

    const handleSelect = () => {
        if (onSelect) {
            onSelect(comment_id);
        }
    };

    return (
        <div className={style.comment}>
            <div className={style.email}>
                <span>{email}</span>
                <span className={style.time}>
                    {formatTimeAgo(created_at)}
                </span>
            </div>

            {isEditing ? (
                <>
                    <div className={style.buttons}>
                        <button onClick={handleUpdate}>
                            저장
                        </button>
                        <button
                            onClick={() =>
                                setIsEditing(false)
                            }
                        >
                            취소
                        </button>
                    </div>
                    <textarea
                        className={style.textarea}
                        value={updatedContent}
                        onChange={(e) =>
                            setUpdatedContent(
                                e.target.value,
                            )
                        }
                    />
                </>
            ) : (
                <>
                    {email === user && (
                        <div className={style.buttons}>
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
                        </div>
                    )}
                    <div className={style.content}>
                        {content}
                    </div>
                    {type === 'question' &&
                        email === user && (
                            <button
                                onClick={handleSelect}
                                disabled={accepted}
                            >
                                {accepted
                                    ? '채택됨'
                                    : '채택하기'}
                            </button>
                        )}
                </>
            )}
        </div>
    );
}
