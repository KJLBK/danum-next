'use client';

import { useEffect, useState } from 'react';
import Spinner from '../../components/common/Spinner';

export default function Test() {
    const [loading, setLoading] = useState(true);
    // 3초 후에 로딩 상태를 false로 변경하여 Spinner가 사라지도록 합니다.
    useEffect(() => {
        const timer = setTimeout(
            () => setLoading(false),
            3000,
        );
        return () => clearTimeout(timer);
    }, []);

    return (
        <>
            <div
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: '100vh',
                }}
            >
                {loading ? <Spinner /> : <p>loaded!</p>}
            </div>
        </>
    );
}
