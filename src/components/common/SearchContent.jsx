'use client';

import { useState, useEffect } from 'react';
import {
    useRouter,
    useSearchParams,
} from 'next/navigation';
import styles from './SearchContent.module.css';
import InfiniteScroll from '../../components/common/InfiniteScroll';

export default function SearchContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [searchQuery, setSearchQuery] = useState('');
    const [isSearching, setIsSearching] = useState(false);

    useEffect(() => {
        const keyword = searchParams.get('keyword');
        if (keyword) {
            setSearchQuery(keyword);
            setIsSearching(true);
        }
    }, [searchParams]);

    const searchService = async (pageParam = 0) => {
        if (!searchQuery.trim())
            return {
                content: [],
                pageNumber: 0,
                pageSize: 10,
                totalElements: 0,
                totalPages: 0,
                last: true,
            };

        const response = await fetch(
            `/danum-backend/main/search?keyword=${encodeURIComponent(searchQuery)}&page=${pageParam}&size=10`,
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
            },
        );

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(
                errorData.message || 'Search failed',
            );
        }

        return response.json();
    };

    const handleSearch = (e) => {
        setSearchQuery(e.target.value);
        setIsSearching(false); // 검색어가 변경되면 검색 상태 초기화
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsSearching(true); // 검색 버튼을 눌렀을 때 검색 상태 활성화
        router.push(
            `/search?keyword=${encodeURIComponent(searchQuery)}`,
        );
    };

    return (
        <div className={styles.searchContainer}>
            <form
                onSubmit={handleSubmit}
                className={styles.searchForm}
            >
                <input
                    type="search"
                    onChange={handleSearch}
                    value={searchQuery}
                    placeholder="검색어를 입력하세요"
                    className={styles.searchInput}
                />
                <button className={styles.searchButton}>
                    <svg
                        className={styles.searchIcon}
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <circle cx="11" cy="11" r="8" />
                        <line
                            x1="21"
                            y1="21"
                            x2="16.65"
                            y2="16.65"
                        />
                    </svg>
                </button>
            </form>

            <div className={styles.resultsContainer}>
                {isSearching ? (
                    <InfiniteScroll
                        serviceLogic={searchService}
                        queryKey={['search', searchQuery]}
                    />
                ) : (
                    <div className={styles.noResults}></div>
                )}
            </div>
        </div>
    );
}
