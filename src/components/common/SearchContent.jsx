'use client';

import { useState, useEffect } from 'react';
import {
    useRouter,
    useSearchParams,
} from 'next/navigation';
import BoardItem from '../../components/board/view/BoardItem';
import styles from './SearchContent.module.css';

export default function SearchContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState({
        content: [],
        pageNumber: 0,
        pageSize: 10,
        totalElements: 0,
        totalPages: 0,
        last: false,
    });
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const keyword = searchParams.get('keyword');
        const page =
            parseInt(searchParams.get('page')) || 0;
        if (keyword) {
            setSearchQuery(keyword);
            fetchSearchResults(keyword, page);
        }
    }, [searchParams]);

    const fetchSearchResults = async (
        keyword,
        page = 0,
    ) => {
        if (!keyword.trim()) return;

        setIsLoading(true);
        try {
            const response = await fetch(
                `/danum-backend/main/search?keyword=${encodeURIComponent(keyword)}&page=${page}&size=10`,
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

            const data = await response.json();
            if (data.content.length === 0 && page > 0) {
                fetchSearchResults(keyword, page - 1);
            } else {
                setSearchResults(data);
            }
        } catch (error) {
            console.error('Search error:', error);
            setSearchResults({
                content: [],
                pageNumber: 0,
                pageSize: 10,
                totalElements: 0,
                totalPages: 0,
                last: true,
            });
        } finally {
            setIsLoading(false);
        }
    };

    const handleSearch = (e) => {
        setSearchQuery(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        router.push(
            `/search?keyword=${encodeURIComponent(searchQuery)}&page=0`,
        );
        fetchSearchResults(searchQuery, 0);
    };

    const handlePageChange = (newPage) => {
        if (
            newPage < 0 ||
            newPage >= searchResults.totalPages
        )
            return;
        router.push(
            `/search?keyword=${encodeURIComponent(searchQuery)}&page=${newPage}`,
        );
        fetchSearchResults(searchQuery, newPage);
    };

    return (
        <div className={styles.searchContainer}>
            <h1>검색 페이지</h1>

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
                <button
                    type="submit"
                    className={styles.searchButton}
                >
                    검색
                </button>
            </form>

            {isLoading && <div>검색 중...</div>}

            <div className={styles.resultsContainer}>
                {searchResults.content.length > 0
                    ? searchResults.content.map(
                          (result, index) => (
                              <BoardItem
                                  key={index}
                                  question_id={
                                      result.question_id
                                  }
                                  village_id={
                                      result.village_id
                                  }
                                  title={result.title}
                                  content={result.content}
                                  author={result.author}
                                  created_at={
                                      result.created_at
                                  }
                                  view_count={
                                      result.view_count
                                  }
                                  board={
                                      result.question_id
                                          ? 'questions'
                                          : 'villages'
                                  }
                              />
                          ),
                      )
                    : searchQuery &&
                      !isLoading && (
                          <div className={styles.noResults}>
                              검색 결과가 없습니다.
                          </div>
                      )}
            </div>

            {searchResults.totalPages > 1 && (
                <div className={styles.pagination}>
                    <button
                        onClick={() =>
                            handlePageChange(
                                searchResults.pageNumber -
                                    1,
                            )
                        }
                        disabled={
                            searchResults.pageNumber === 0
                        }
                        className={styles.pageButton}
                    >
                        이전
                    </button>
                    {[
                        ...Array(searchResults.totalPages),
                    ].map((_, i) => (
                        <button
                            key={i}
                            onClick={() =>
                                handlePageChange(i)
                            }
                            disabled={
                                i ===
                                searchResults.pageNumber
                            }
                            className={styles.pageButton}
                        >
                            {i + 1}
                        </button>
                    ))}
                    <button
                        onClick={() =>
                            handlePageChange(
                                searchResults.pageNumber +
                                    1,
                            )
                        }
                        disabled={searchResults.last}
                        className={styles.pageButton}
                    >
                        다음
                    </button>
                </div>
            )}
        </div>
    );
}
