'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function SearchPage() {
    const router = useRouter();
    const [searchQuery, setSearchQuery] = useState('');

    const handleSearch = (e) => {
        setSearchQuery(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        router.push(`/search?query=${searchQuery}`);
    };

    return (
        <>
            <p>검색 페이지</p>
            <form onSubmit={handleSubmit}>
                <input
                    type="search"
                    onChange={handleSearch}
                    value={searchQuery}
                />
            </form>
        </>
    );
}
