// components/auth/LoginForm.jsx
'use client';
import { useState } from 'react';
import { useLogin } from '../../hooks/useLogin';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import styles from './LoginForm.module.css';
export default function LoginForm({
    onLoginSuccess,
    onJoinClick,
}) {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const [error, setError] = useState(null);
    const searchParams = useSearchParams();
    const redirectUrl = searchParams.get('from') || '/';

    const { mutate, isLoading, isError } = useLogin();

    const handleSubmit = (e) => {
        e.preventDefault();
        mutate(
            {
                email: formData.email,
                password: formData.password,
            },
            {
                onSuccess: () => {
                    onLoginSuccess?.(redirectUrl);
                    console.log(
                        `로그인 성공 ${redirectUrl}`,
                    );
                },
                onError: (err) => {
                    setError('로그인 실패: ' + err.message);
                },
            },
        );
    };

    return (
        <div className={styles.container}>
            <h2 className={styles.h2}>DANUM</h2>
            <h4 className={styles.h4}>
                우리 동네 모든 질문을 다, 나누는 다눔!{' '}
                <br />
                지금 다눔에서 내 고민을 다 나누고 가세요.
            </h4>
            <form
                onSubmit={handleSubmit}
                className={styles.form}
            >
                <input
                    className={styles.input}
                    type="email"
                    value={formData.email}
                    onChange={(e) =>
                        setFormData((prev) => ({
                            ...prev,
                            email: e.target.value,
                        }))
                    }
                    placeholder="이메일"
                    required
                />
                <input
                    className={styles.input}
                    type="password"
                    value={formData.password}
                    onChange={(e) =>
                        setFormData((prev) => ({
                            ...prev,
                            password: e.target.value,
                        }))
                    }
                    placeholder="비밀번호"
                    required
                />
                <button
                    type="submit"
                    disabled={isLoading}
                    className={styles.button}
                >
                    {isLoading ? '로그인 중...' : '로그인'}
                </button>
            </form>
            <p
                className={styles.p}
                type="button"
                onClick={onJoinClick}
            >
                회원가입
            </p>
            {isError && (
                <p style={{ color: 'red' }}>
                    로그인 중 오류가 발생했습니다.
                </p>
            )}
            {error && (
                <p style={{ color: 'red' }}>{error}</p>
            )}
        </div>
    );
}
