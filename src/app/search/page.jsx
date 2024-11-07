'use client';

import { Suspense } from 'react';
import SearchContent from '../../components/common/SearchContent';

export default function SearchPage() {
    return (
        <Suspense fallback={<div>검색 중...</div>}>
            <SearchContent />
        </Suspense>
    );
}
