'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { questionDetail } from '../../../service/questions';

export default function QuestionsViewPage() {
    const [data, setData] = useState([]);
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
        fetchData();
    }, []);
    return (
        <div>
            <h2>제목 : {data.title}</h2>
            <p>
                {data.email} | {data.created_at} |{' '}
                {data.view_count}
            </p>
            <p>내용 : {data.content}</p>
        </div>
    );
}
