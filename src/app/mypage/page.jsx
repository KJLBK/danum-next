'use client';
import { useEffect, useState } from 'react';
import {
    myQuestion,
    myVillage,
} from '../../services/mypageService';
import BoardItem from '../../components/board/view/BoardItem';
import { useAuthStore } from '../../stores/authStore';
import { useRouter } from 'next/navigation';
import styles from './page.module.css';
import Image from 'next/image';

export default function MypagePage() {
    const { email, exp, profileImageUrl, name } =
        useAuthStore();
    const [questions, setQuestions] = useState([]);
    const [villages, setVillages] = useState([]);
    const [activeTab, setActiveTab] = useState('question');
    const router = useRouter();

    useEffect(() => {
        const fetchData = async () => {
            if (email) {
                const questionData =
                    await myQuestion(email);
                const villageData = await myVillage(email);
                setQuestions(questionData.content || []);
                setVillages(villageData.content || []);
            }
        };

        fetchData();
    }, [email]);

    const handleEdit = () => {
        router.push('/mypage/edit');
    };

    const renderContent = () => {
        switch (activeTab) {
            case 'question':
                return questions.length > 0 ? (
                    <div>
                        {questions.map((question) => (
                            <BoardItem
                                key={question.question_id}
                                question_id={
                                    question.question_id
                                }
                                title={question.title}
                                content={question.content}
                                author={question.author}
                                created_at={
                                    question.created_at
                                }
                                view_count={
                                    question.view_count
                                }
                                board="questions"
                            />
                        ))}
                    </div>
                ) : (
                    <div className={styles.noContent}>
                        <Image
                            src="/eyes.png"
                            alt="danum"
                            width={100}
                            height={75}
                            priority={true}
                        />
                        <p>새로운 아티클이 없어요</p>
                        <button
                            onClick={() =>
                                router.push('/new/question')
                            }
                        >
                            새 아티클 쓰기
                        </button>
                    </div>
                );
            case 'village':
                return villages.length > 0 ? (
                    <div>
                        {villages.map((village) => (
                            <BoardItem
                                key={village.village_id}
                                village_id={
                                    village.village_id
                                }
                                title={village.title}
                                content={village.content}
                                author={village.author}
                                created_at={
                                    village.created_at
                                }
                                view_count={
                                    village.view_count
                                }
                                board="villages"
                            />
                        ))}
                    </div>
                ) : (
                    <div className={styles.noContent}>
                        <Image
                            src="/eyes.png"
                            alt="danum"
                            width={100}
                            height={75}
                            priority={true}
                        />
                        <p>새로운 마을 글이 없어요</p>
                        <button
                            onClick={() =>
                                router.push('/new/village')
                            }
                        >
                            새 글 쓰기
                        </button>
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <div className={styles.infoContainer}>
            <div className={styles.profileTop}>
                <Image
                    src={
                        profileImageUrl ||
                        '/logo-assets/android-chrome-512x512.png'
                    }
                    width={64}
                    height={64}
                    alt={`image`}
                />
                <button onClick={handleEdit}>
                    프로필 편집
                </button>
            </div>
            <h2 className={styles.name}>{name}</h2>
            <p className={styles.email}>{email}</p>

            <div className={styles.boardCategory}>
                <button
                    onClick={() => setActiveTab('question')}
                >
                    질문
                </button>
                <button
                    onClick={() => setActiveTab('village')}
                >
                    마을
                </button>
            </div>
            <div className={styles.boardContent}>
                {renderContent()}
            </div>
        </div>
    );
}
