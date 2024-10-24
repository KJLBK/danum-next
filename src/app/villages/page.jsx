'use client';
import { useState, useEffect } from 'react';
import {
    villageShow,
    villageType,
} from '../../services/villageService';
import VillageItem from '../../components/village/view/VillageItem';
import style from './page.module.css';

export default function Villages() {
    const [data, setData] = useState([]);
    const [postType, setPostType] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = postType
                    ? await villageType(postType)
                    : await villageShow();
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
                </select>
            </div>

            <ul>
                {data.map((item) => (
                    <VillageItem
                        key={item.village_id}
                        {...item}
                    />
                ))}
            </ul>
        </div>
    );
}
