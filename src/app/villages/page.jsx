'use client';
import { useState, useEffect } from 'react';
import {
    villageShow,
    villageType,
    villageLocalShow,
} from '../../services/villageService';
import BoardItem from '../../components/common/board/BoardItem';
import style from './page.module.css';

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

    // 태그 필터링 기능
    const handleChange = (e) => {
        setPostType(e.target.value);
    };

    return (
        <div className={style.container}>
            <div className={style.top}>
                <h2 className={style.title}>동네 이야기</h2>
                <select
                    id="tagType"
                    name="tagType"
                    onChange={handleChange}
                    className={style.category}
                >
                    <option name="tagType" value="">
                        전체
                    </option>
                    <option name="tagType" value="DAILY">
                        일상
                    </option>
                    <option name="tagType" value="QUESTION">
                        질문
                    </option>
                    <option name="tagType" value="LOCAL">
                        내 지역
                    </option>
                </select>
            </div>

            <ul>
                {data.map((item) => (
                    <BoardItem
                        key={item.village_id}
                        board="villages"
                        {...item}
                    />
                ))}
            </ul>
        </div>
    );
}
