'use client';

import { useRouter } from 'next/navigation';
import styles from './LoginButton.module.css';

export default function LoginButton() {
    const router = useRouter();
    const handleLoginClick = () => {
        router.push('/login', { scroll: false });
    };
    return (
        <>
            <button
                type="button"
                onClick={handleLoginClick}
                className={styles.loginButton}
            >
                로그인
            </button>
        </>
    );
}
