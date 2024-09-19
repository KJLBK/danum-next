export default function QuestionCommentItem({
    content,
    email,
    created_at,
}) {
    return (
        <div>
            <h4>작성자: {email}</h4>
            <p>내용 : {content}</p>
            <p>작성 시간: {created_at}</p>
        </div>
    );
}
