'use client';
import { useState } from 'react';
import InfiniteScroll from '../../components/common/InfiniteScroll';
import {
    villageShow,
    villageType,
    villageLocalShow,
} from '../../services/villageService';
import style from './page.module.css';
import Link from 'next/link';

export default function Villages() {
    const [postType, setPostType] = useState('');

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

    const handleCategoryClick = (category) => {
        setPostType(category);
    };

    return (
        <div className={style.pageContainer}>
            <nav className={style.sidebar}>
                <h2 className={style.sidebarTitle}>
                    카테고리
                </h2>
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
                <Link href="/new/village">
                    <button className={style.writeButton}>
                        글 쓰기
                    </button>
                </Link>
            </nav>
            <div className={style.mainContent}>
                <h2 className={style.title}>동네 이야기</h2>
                {/* InfiniteScroll 컴포넌트를 사용하여 무한 스크롤 적용 */}
                <InfiniteScroll
                    serviceLogic={getServiceLogic()}
                    queryKey={['villageData', postType]}
                />
            </div>
        </div>
    );
}
