import Link from 'next/link';

export default function QuestionItem({
    question_id,
    title,
    content,
    email,
    created_at,
}) {
    return (
        <Link href={`/questions/${question_id}`}>
            <h2>제목 : {title}</h2>
            <p>내용 : {content}</p>
            <p>작성자: {email}</p>
            <p>작성 시간: {created_at}</p>
        </Link>
    );
}
