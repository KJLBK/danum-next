'use client';
import { useState, useEffect } from 'react';
import { villageShow } from '../../services/villageService';
import VillageItem from '../../components/village/view/VillageItem';
import style from './page.module.css';

export default function Villages() {
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await villageShow();
                const reverseContent = [
                    ...response.content,
                ].reverse();
                setData(reverseContent);
            } catch (err) {
                console.error('Error:', err);
            }
        };
        fetchData();
    }, []);

    return (
        <div className={style.container}>
            <h2>동네 이야기</h2>
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
