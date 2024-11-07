'use client';
import { Suspense } from 'react';
import LoginForm from '../../components/auth/LoginForm';
import styles from './page.module.css';
import { useRouter } from 'next/navigation';

export default function LoginModal() {
    const router = useRouter();

    const handleClose = () => {
        router.back();
    };

    return (
        <div
            className={styles.modalOverlay}
            onClick={handleClose}
        >
            <div
                className={styles.modalContent}
                onClick={(e) => e.stopPropagation()}
            >
                <button
                    className={styles.closeButton}
                    onClick={handleClose}
                >
                    ×
                </button>
                <Suspense fallback={<div>Loading...</div>}>
                    <LoginForm />
                </Suspense>
            </div>
        </div>
    );
}
