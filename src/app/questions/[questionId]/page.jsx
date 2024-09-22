'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import {
    questionDetail,
    questionCommentShow,
} from '../../../service/questionService';
import QuestionCommentItem from '../../../components/question/QuestionCommentItem';
import QuestionCommentNew from '../../../components/question/QuestionCommentNew';

export default function QuestionsViewPage() {
    const [data, setData] = useState([]);
    const [comment, setComment] = useState([]);
    const params = useParams();
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await questionDetail(
                    params.questionId
                ); // questionDetail 호출
                setData(response); // 가져온 데이터 상태 업데이트
            } catch (err) {
                console.error('Error:', err);
            }
        };
        const fetchComment = async () => {
            try {
                const response = await questionCommentShow(
                    params.questionId
                );
                setComment(response); // 가져온 데이터 상태 업데이트
            } catch (err) {
                console.error('Error:', err);
            }
        };
        fetchData();
        fetchComment();
    }, []);
    return (
        <div>
            <h2>제목 : {data.title}</h2>
            <p>
                {data.email} | {data.created_at} |{' '}
                {data.view_count}
            </p>
            <p>내용 : {data.content}</p>
            <hr />
            <h2>댓글</h2>
            <QuestionCommentNew
                questionId={params.questionId}
            />
            {comment.map((item) => (
                <QuestionCommentItem
                    key={item.comment_id}
                    {...item}
                />
            ))}
        </div>
    );
}
