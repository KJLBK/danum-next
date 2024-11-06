'use client';

import { useEffect } from 'react';

import PopularPostlist from './List';
import Spinner from '../../common/Spinner';
import usePopularPosts from '../../../hooks/usePopularPosts';

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
        <div>
            <div>
                <PopularPostlist
                    header="인기 질문"
                    data={data?.popularQuestions || []}
                />
            </div>
            <div>
                <PopularPostlist
                    header="인기 동네 게시글"
                    data={data?.popularVillages || []}
                />
            </div>
        </div>
    );
}
