import { questionCommentDelete } from '../../service/questionService';

export default function QuestionCommentItem({
    content,
    email, // 댓글 작성자 이메일
    created_at,
    comment_id,
    emailCheck, // 로그인된 사용자 이메일 (부모 컴포넌트에서 전달)
}) {
    const handleDelete = () => {
        questionCommentDelete(comment_id);
    };

    return (
        <div>
            <h4>작성자: {email}</h4>
            <p>내용 : {content}</p>
            <p>작성 시간: {created_at}</p>

            {/* 이메일이 본인 이메일과 일치할 때만 삭제 버튼 표시 */}
            {email === emailCheck && (
                <button onClick={handleDelete}>삭제</button>
            )}
        </div>
    );
}
