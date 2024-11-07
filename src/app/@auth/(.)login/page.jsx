'use client';
import { Suspense } from 'react';
import LoginForm from '../../../components/auth/LoginForm';
import styles from './page.module.css';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function LoginModal() {
    const router = useRouter();

    useEffect(() => {
        // 모달이 마운트될 때 스크롤 막기
        document.body.style.overflow = 'hidden';
        document.body.style.paddingRight = '15px'; // 스크롤바 너비만큼 보정

        // 모달이 언마운트될 때 스크롤 복구
        return () => {
            document.body.style.overflow = 'unset';
            document.body.style.paddingRight = '0px';
        };
    }, []);

    const handleClose = () => {
        router.back();
    };

    const handleLoginSuccess = () => {
        handleClose();
        setTimeout(() => {
            router.push('/');
        }, 100);
    };

    const handleJoinClick = () => {
        handleClose();
        setTimeout(() => {
            router.push('/join');
        }, 100);
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
                    <LoginForm
                        onLoginSuccess={handleLoginSuccess}
                        onJoinClick={handleJoinClick}
                    />
                </Suspense>
            </div>
        </div>
    );
}
