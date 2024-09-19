'use client';

import { useEffect, useState } from 'react';
import { questionShow } from '../../service/questions';
import QuestionItem from '../../components/question/QuestionItem';

export default function QuestionPage() {
    const [data, setData] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await questionShow(); // questionShow 호출
                setData(response); // 가져온 데이터 상태 업데이트
            } catch (err) {
                console.error('Error:', err);
            }
        };
        fetchData();
    }, []);
    return (
        <>
            <h2>질문 이야기</h2>
            <ul>
                {data.map((item) => (
                    <QuestionItem
                        key={item.question_id}
                        {...item}
                    />
                ))}
            </ul>
        </>
    );
}
