'use client';
import { useRouter } from 'next/router';

export default function RouterComponent() {
    const router = useRouter();
    const currentPath = router.pathname;
    const query = router.query;
    const { id } = router.query;
    return (
        <div>
            <h1>curr path : {currentPath}</h1>
            <h2>query: {JSON.stringify(query)}</h2>
            <h2>ID: {id}</h2>
        </div>
    );
}
