'use client';
import { useState, useEffect } from 'react';
import {
    villageShow,
    villageType,
    villageLocalShow,
} from '../../services/villageService';
import BoardItem from '../../components/board/view/BoardItem';
import style from './page.module.css';
import Link from 'next/link';

export default function Villages() {
    const [data, setData] = useState([]);
    const [postType, setPostType] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                let response;
                if (postType === 'DAILY') {
                    response = await villageType(postType);
                } else if (postType === 'QUESTION') {
                    response = await villageType(postType);
                } else if (postType === 'LOCAL') {
                    response = await villageLocalShow();
                } else {
                    response = await villageShow();
                }
                const reverseContent = [
                    ...response.content,
                ].reverse();
                setData(reverseContent);
            } catch (err) {
                console.error('Error:', err);
            }
        };
        fetchData();
    }, [postType]);

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
                <Link href="/villages/new">
                    <button className={style.writeButton}>
                        글 쓰기
                    </button>
                </Link>
            </nav>
            <div className={style.mainContent}>
                <h2 className={style.title}>동네 이야기</h2>
                <ul className={style.boardList}>
                    {data.map((item) => (
                        <BoardItem
                            key={item.village_id}
                            village_id={item.village_id}
                            board="villages"
                            {...item}
                        />
                    ))}
                </ul>
            </div>
        </div>
    );
}
