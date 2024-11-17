'use client';
import { questionShow } from '../../services/postService.server';
import style from './page.module.css';
import InfiniteScroll from '../../components/common/InfiniteScroll';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '../../stores/authStore';
import RegionSelector from '../../components/board/buttons/RegionSelector';
import { regionShow } from '../../services/questionService';
import { useState } from 'react';

export default function QuestionPage() {
    const { isLoggedIn } = useAuthStore();
    const router = useRouter();
    const [regionData, setRegionData] = useState([]);

    const handleNew = () => {
        if (isLoggedIn) {
            router.push('/new/question');
        } else {
            router.push('/login');
        }
    };

    const handleRegionSelect = async ({
        city,
        district,
    }) => {
        try {
            console.log(city, district, 'data');
            const data = await regionShow(
                city,
                district,
                pageParams,
            );
            setRegionData(data);
            console.log(data);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div className={style.container}>
            <h2>질문 이야기</h2>
            {/* <RegionSelector
                onRegionSelect={handleRegionSelect}
            /> */}
            <InfiniteScroll
                serviceLogic={questionShow}
                queryKey={['questionPosts']}
            />
            <button
                className={style.writeButton}
                onClick={handleNew}
            >
                글쓰기
            </button>
        </div>
    );
}
