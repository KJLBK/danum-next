'use client';

import { useEffect, useState } from 'react';
import questionShow from '../../service/question/questionShow';

export default function QuestionShowForm() {
  const [data, setData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await questionShow(); // questionShow 호출
        setData(response); // 가져온 데이터 상태 업데이트
        console.log(data);
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
        {data.length > 0 ? (
          data.map((item) => (
            <li key={item.question_id}>
              <h2>제목: {item.title}</h2>
              <p>내용: {item.content}</p>
              <p>작성자: {item.email}</p>
              <p>작성 시간: {item.created_at}</p>
              <hr />
            </li>
          ))
        ) : (
          <p>질문이 없습니다.</p>
        )}
      </ul>
    </>
  );
}
