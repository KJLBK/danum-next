import { useState, useEffect } from 'react';
import {
    questionCommentDelete,
    questionCommentUpdate,
} from '../../../services/questionService';
import style from './QuestionCommentItem.module.css';
import { formatTimeAgo } from '../../../utils/timeFormat';
import { useAuthStore } from '../../../stores/authStore';

export default function QuestionCommentItem({
    content,
    email,
    created_at,
    comment_id,
    emailCheck,
    accepted,
    onSelect,
}) {
    const [isEditing, setIsEditing] = useState(false);
    const [updatedContent, setUpdatedContent] =
        useState(content);
    const { user } = useAuthStore();

    // 댓글 삭제 함수
    const handleDelete = () => {
        questionCommentDelete(comment_id);
    };

    // 댓글 수정 함수
    const handleUpdate = async () => {
        try {
            await questionCommentUpdate(
                comment_id,
                updatedContent,
            );
            setIsEditing(false);
        } catch (error) {
            console.error('Error updating comment:', error);
        }
    };

    // 댓글 채택 함수
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
                    {email === user && ( // 채택 버튼을 작성자에게만 보여주기
                        <button
                            onClick={handleSelect}
                            disabled={accepted} // 이미 채택된 경우 비활성화
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
