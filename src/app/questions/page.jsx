'use client';
import { questionShow } from '../../services/postService.server';
import style from './page.module.css';
import InfiniteScroll from '../../components/common/InfiniteScroll';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '../../stores/authStore';
import RegionSelector from '../../components/board/buttons/RegionSelector';
import { regionShow } from '../../services/questionService';
import { useState, useEffect } from 'react';
import NewButton from '../../components/board/new/NewButton';
import PopularPostlist from '../../components/home/PopularPosts/List';
import usePopularPosts from '../../hooks/usePopularPosts';
import Spinner from '../../components/common/Spinner';

export default function QuestionPage() {
    const { isLoggedIn } = useAuthStore();
    const router = useRouter();
    const [regionData, setRegionData] = useState([]);

    const { data, error, isLoading, isError } =
        usePopularPosts();

    useEffect(() => {
        if (data) {
            console.log('Fetced Popular posts data', data);
        }
    });

    if (isLoading) {
        return <Spinner />;
    }

    if (isError) {
        console.log(error.message);
    }

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

            <div className={style.aside}>
                <div className={style.InfiniteScroll}>
                    <InfiniteScroll
                        serviceLogic={questionShow}
                        queryKey={['questionPosts']}
                    />
                </div>
                <div className={style.postList}>
                    <PopularPostlist
                        header="지금 인기있는 질문 이야기 🔥"
                        data={data?.popularQuestions || []}
                    />
                </div>
            </div>
            <NewButton type="question" />
        </div>
    );
}
