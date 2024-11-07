'use client';

import { useRouter } from 'next/navigation';
import Button from '../../common/Button';

export default function LoginButton() {
    const router = useRouter();
    const handleLoginClick = () => {
        router.push('/login', { scroll: false });
    };
    return (
        <>
            <Button
                type="button"
                onClick={handleLoginClick}
            >
                로그인
            </Button>
        </>
    );
}
