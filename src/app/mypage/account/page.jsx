'use client';

import styles from './page.module.css';
import { useState, useEffect } from 'react';
import { useMutation } from '@tanstack/react-query';
import {
    passwordUpdate,
    fetchUserData,
} from '../../../services/authService';
import PasswordChangeModal from '../../../components/auth/PasswordChangeModal';

export default function PasswordChangePage() {
    const [email, setEmail] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const getUserData = async () => {
            try {
                setIsLoading(true);
                const data = await fetchUserData();
                setEmail(data.email);
            } catch (err) {
                setError(
                    '사용자 데이터를 불러오는데 실패했습니다.',
                );
            } finally {
                setIsLoading(false);
            }
        };
        getUserData();
    }, []);

    const mutation = useMutation({
        mutationFn: passwordUpdate,
        onSuccess: () => {
            alert('비밀번호가 성공적으로 변경되었습니다.');
            setIsModalOpen(false);
        },
        onError: (error) => {
            setError(
                '비밀번호 변경에 실패했습니다: ' +
                    error.message,
            );
        },
    });

    if (isLoading) return <div>로딩 중...</div>;

    return (
        <div>
            <div className={styles.container}>
                <div className={styles.content}>
                    <h2 className={styles.h2}>계정</h2>
                    <div className={styles.info}>
                        <p className={styles.emailInfo}>
                            이메일 계정
                        </p>
                        <p className={styles.email}>
                            {email}
                        </p>
                        <div className={styles.buttonDiv}>
                            <button
                                className={styles.button}
                                onClick={() =>
                                    setIsModalOpen(true)
                                }
                            >
                                비밀번호 변경
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <PasswordChangeModal
                isOpen={isModalOpen}
                onConfirm={(password) =>
                    mutation.mutate(password)
                }
                onCancel={() => {
                    setIsModalOpen(false);
                    setError('');
                }}
            />
        </div>
    );
}
