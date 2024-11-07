// components/common/CommentItem.jsx
import { useState } from 'react';
import style from './CommentItem.module.css';
import { formatTimeAgo } from '../../../utils/timeFormat';
import { useAuthStore } from '../../../stores/authStore';

export default function CommentItem({
    content,
    email: commentEmail,
    created_at,
    comment_id,
    accepted,
    onSelect,
    onDelete,
    onUpdate,
    author,
    type, // 'question' or 'village'
}) {
    const [isEditing, setIsEditing] = useState(false);
    const [updatedContent, setUpdatedContent] =
        useState(content);
    const { email } = useAuthStore();

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
                <span>{commentEmail}</span>
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
                    {commentEmail === email && (
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
                    {author === email && (
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
