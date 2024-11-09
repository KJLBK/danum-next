'use client';
import { useEffect, useState } from 'react';
import {
    myQuestion,
    myVillage,
} from '../../services/mypageService';
import BoardItem from '../../components/board/view/BoardItem';
import { useAuthStore } from '../../stores/authStore';

export default function MypagePage() {
    const { email } = useAuthStore();
    const [questions, setQuestions] = useState([]);
    const [villages, setVillages] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            if (email) {
                const questionData =
                    await myQuestion(email);
                const villageData = await myVillage(email);
                // content 배열을 추출하여 설정
                setQuestions(questionData.content || []);
                setVillages(villageData.content || []);
            }
        };

        fetchData();
    }, [email]);

    return (
        <div className="mypage-container">
            <h2>내가 작성한 질문 글</h2>
            <div>
                {questions.map((question) => (
                    <BoardItem
                        key={question.question_id}
                        question_id={question.question_id}
                        title={question.title}
                        content={question.content}
                        author={question.author}
                        created_at={question.created_at}
                        view_count={question.view_count}
                        board="questions"
                    />
                ))}
            </div>

            <h2>내가 작성한 마을 글</h2>
            <div>
                {villages.map((village) => (
                    <BoardItem
                        key={village.village_id}
                        village_id={village.village_id}
                        title={village.title}
                        content={village.content}
                        author={village.author}
                        created_at={village.created_at}
                        view_count={village.view_count}
                        board="villages"
                    />
                ))}
            </div>
        </div>
    );
}
