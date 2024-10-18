'use client';

import { useEffect, useState } from 'react';
import { questionShow } from '../../services/questionService';
import QuestionItem from '../../components/question/QuestionItem';
import style from './page.module.css'; // CSS 모듈 임포트

export default function QuestionPage() {
    const [data, setData] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await questionShow(); // questionShow 호출
                const reverseContent = [
                    ...response.content,
                ].reverse();
                setData(reverseContent); // 가져온 데이터 상태 업데이트
            } catch (err) {
                console.error('Error:', err);
            }
        };
        fetchData();
    }, []);

    return (
        <div className={style.container}>
            <h2>질문 이야기</h2>
            <ul>
                {data.map((item) => (
                    <QuestionItem
                        key={item.question_id}
                        {...item}
                    />
                ))}
            </ul>
        </div>
    );
}
