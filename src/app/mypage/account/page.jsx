'use client';

import styles from './page.module.css';
import { useState, useEffect } from 'react';
import { useMutation } from '@tanstack/react-query';
import Modal from '../../../components/common/Modal';
import {
    passwordUpdate,
    fetchUserData,
} from '../../../services/authService';

export default function PasswordChangePage() {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        passwordCheck: '',
    });
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const getUserData = async () => {
            try {
                setIsLoading(true);
                const data = await fetchUserData();
                setFormData({
                    email: data.email,
                    password: '',
                    passwordCheck: '',
                });
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
        mutationFn: (password) =>
            passwordUpdate({ password }),
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

    const handlePasswordChange = () => {
        if (formData.password !== formData.passwordCheck) {
            setError('비밀번호가 일치하지 않습니다.');
            return;
        }
        if (formData.password.length < 1) {
            setError('비밀번호를 입력해주세요.');
            return;
        }
        mutation.mutate(formData);
    };

    if (isLoading) return <div>로딩 중...</div>;

    return (
        <div>
            <h2>계정</h2>
            <div>
                <p>이메일 계정</p>
                <p>{formData.email}</p>
            </div>
            <div>
                <button
                    onClick={() => setIsModalOpen(true)}
                >
                    비밀번호 변경
                </button>
            </div>

            <Modal
                isOpen={isModalOpen}
                title="비밀번호 변경"
                content={
                    <div>
                        <div>
                            <p>새로운 비밀번호</p>
                            <input
                                type="password"
                                placeholder="비밀번호를 입력해 주세요"
                                value={formData.password}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        password:
                                            e.target.value,
                                    })
                                }
                            />
                        </div>
                        <div>
                            <p>비밀번호 확인</p>
                            <input
                                type="password"
                                placeholder="비밀번호를 다시 입력해 주세요"
                                value={
                                    formData.passwordCheck
                                }
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        passwordCheck:
                                            e.target.value,
                                    })
                                }
                            />
                        </div>
                        {error && (
                            <p style={{ color: 'red' }}>
                                {error}
                            </p>
                        )}
                    </div>
                }
                onConfirm={handlePasswordChange}
                onCancel={() => {
                    setIsModalOpen(false);
                    setError('');
                    setFormData({
                        password: '',
                        passwordCheck: '',
                    });
                }}
            />
        </div>
    );
}
