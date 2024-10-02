import { useState } from 'react';
import {
    questionCommentDelete,
    questionCommentUpdate,
} from '../../service/questionService';
import { createPrivateChat } from '../../service/chatService';
import style from './QuestionCommentItem.module.css';

export default function QuestionCommentItem({
    content,
    email, // 댓글 작성자 이메일
    created_at,
    comment_id,
    emailCheck, // 로그인된 사용자 이메일 (부모 컴포넌트에서 전달)
}) {
    const [isEditing, setIsEditing] = useState(false); // 수정 모드 상태
    const [updatedContent, setUpdatedContent] =
        useState(content); // 수정된 내용을 저장하는 상태

    // 시간을 "몇 시간 전" 형식으로 변환하는 함수
    const formatTimeAgo = (dateString) => {
        const now = new Date();
        const createdDate = new Date(dateString);
        const diffInSeconds = Math.floor(
            (now - createdDate) / 1000
        ); // 두 날짜의 차이 (초 단위)

        const minutes = Math.floor(diffInSeconds / 60);
        const hours = Math.floor(diffInSeconds / 3600);
        const days = Math.floor(diffInSeconds / 86400);

        if (days > 0) {
            return `${days}일 전`;
        } else if (hours > 0) {
            return `${hours}시간 전`;
        } else if (minutes > 0) {
            return `${minutes}분 전`;
        } else {
            return '방금 전';
        }
    };

    // 댓글 삭제 함수
    const handleDelete = () => {
        questionCommentDelete(comment_id);
    };

    // 댓글 수정 함수 (서버로 업데이트 요청)
    const handleUpdate = async () => {
        try {
            await questionCommentUpdate(
                comment_id,
                updatedContent
            ); // 수정된 내용을 서버로 전송
            setIsEditing(false); // 수정 모드 종료
        } catch (error) {
            console.error('Error updating comment:', error);
        }
    };

    // const handleChatInitiate = async () => {
    //     try {
    //         const res = await createPrivateChat()
    //     }
    // }

    return (
        <div className={style.comment}>
            {/* test - 영훈 | 0925 */}
            <div className={style.email}>
                <span>{email}</span>
                <span className={style.time}>
                    {formatTimeAgo(created_at)}
                </span>
            </div>

            {/* 수정 중일 때와 아닐 때 UI를 구분 */}
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
                    {/* 수정 모드: 입력 필드를 사용하여 수정 가능 */}
                    <textarea
                        value={updatedContent}
                        onChange={(e) =>
                            setUpdatedContent(
                                e.target.value
                            )
                        }
                    />
                </>
            ) : (
                <>
                    {/* 이메일이 본인 이메일과 일치할 때만 수정/삭제 버튼 표시 */}
                    {email === emailCheck && (
                        <>
                            <div className={style.buttons}>
                                <button
                                    onClick={() =>
                                        setIsEditing(true)
                                    }
                                >
                                    수정
                                </button>
                                <button
                                    onClick={handleDelete}
                                >
                                    삭제
                                </button>
                            </div>
                        </>
                    )}
                    {/* 기본 모드: 댓글 내용 표시 */}
                    <div className={style.content}>
                        {content}
                    </div>
                </>
            )}
        </div>
    );
}
