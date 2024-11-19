'use client';

import { useEffect } from 'react';

import PopularPostlist from './List';
import Spinner from '../../common/Spinner';
import usePopularPosts from '../../../hooks/usePopularPosts';
import styles from './PopularPosts.module.css';

export default function PopularPosts() {
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

    return (
        <div className={styles.popularPostsItem}>
            <div>
                <PopularPostlist
                    header="지금 인기있는 질문 이야기"
                    data={data?.popularQuestions || []}
                />
            </div>
            <div>
                <PopularPostlist
                    header="지금 인기있는 동네 이야기"
                    data={data?.popularVillages || []}
                />
            </div>
        </div>
    );
}
