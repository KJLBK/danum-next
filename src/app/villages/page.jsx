'use client';
import { useState, useEffect } from 'react';
import InfiniteScroll from '../../components/common/InfiniteScroll';
import {
    villageShow,
    villageType,
    villageLocalShow,
} from '../../services/villageService';
import style from './page.module.css';
import { useAuthStore } from '../../stores/authStore';
import { useRouter } from 'next/navigation';
import NewButton from '../../components/board/new/NewButton';
import PopularPostlist from '../../components/home/PopularPosts/List';
import usePopularPosts from '../../hooks/usePopularPosts';
import Spinner from '../../components/common/Spinner';

export default function Villages() {
    const [postType, setPostType] = useState('');
    const { isLoggedIn } = useAuthStore();
    const router = useRouter();

    // postType에 따라 호출할 서비스 로직 설정
    const getServiceLogic = () => {
        switch (postType) {
            case 'DAILY':
            case 'QUESTION':
                return (pageParam) =>
                    villageType(postType, pageParam);
            case 'LOCAL':
                return (pageParam) =>
                    villageLocalShow(pageParam);
            default:
                return (pageParam) =>
                    villageShow(pageParam);
        }
    };

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

    const handleCategoryClick = (category) => {
        if (!isLoggedIn && category === 'LOCAL') {
            router.push('/login');
        } else {
            setPostType(category);
        }
    };

    return (
        <div className={style.pageContainer}>
            <h2 className={style.title}>동네 이야기</h2>
            <nav className={style.sidebar}>
                <ul className={style.menuList}>
                    <li
                        className={`${style.menuItem} ${postType === '' ? style.active : ''}`}
                        onClick={() =>
                            handleCategoryClick('')
                        }
                    >
                        전체보기
                    </li>
                    <li
                        className={`${style.menuItem} ${postType === 'DAILY' ? style.active : ''}`}
                        onClick={() =>
                            handleCategoryClick('DAILY')
                        }
                    >
                        일상보기
                    </li>
                    <li
                        className={`${style.menuItem} ${postType === 'QUESTION' ? style.active : ''}`}
                        onClick={() =>
                            handleCategoryClick('QUESTION')
                        }
                    >
                        질문보기
                    </li>
                    <li
                        className={`${style.menuItem} ${postType === 'LOCAL' ? style.active : ''}`}
                        onClick={() =>
                            handleCategoryClick('LOCAL')
                        }
                    >
                        내 지역
                    </li>
                </ul>
            </nav>
            {/* InfiniteScroll 컴포넌트를 사용하여 무한 스크롤 적용 */}
            <div className={style.aside}>
                <div className={style.InfiniteScroll}>
                    <InfiniteScroll
                        serviceLogic={getServiceLogic()}
                        queryKey={['villageData', postType]}
                    />
                </div>
                <div className={style.postList}>
                    <PopularPostlist
                        header="지금 인기있는 동네 이야기 🔥"
                        data={data?.popularVillages || []}
                    />
                </div>
            </div>
            <NewButton type="village" />
        </div>
    );
}
