'use client';

import { useState } from 'react';
import styles from './PasswordChangeModal.module.css';

export default function PasswordChangeModal({
    isOpen,
    onConfirm,
    onCancel,
}) {
    const [formData, setFormData] = useState({
        password: '',
        passwordCheck: '',
    });
    const [error, setError] = useState('');

    if (!isOpen) return null;

    const handleSubmit = () => {
        if (formData.password.length < 1) {
            setError('비밀번호를 입력해주세요.');
            return;
        }
        if (formData.password !== formData.passwordCheck) {
            setError('비밀번호가 일치하지 않습니다.');
            return;
        }
        onConfirm(formData); // password만 전달
        setFormData({ password: '', passwordCheck: '' }); // 입력값 초기화
        setError('');
    };

    return (
        <div className={styles.overlay}>
            <div className={styles.modal}>
                <div className={styles.header}>
                    <h3>비밀번호 변경</h3>
                    <button
                        className={styles.closeButton}
                        onClick={onCancel}
                    >
                        ✕
                    </button>
                </div>
                <div className={styles.content}>
                    <div className={styles.inputGroup}>
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
                    <div className={styles.inputGroup}>
                        <p>비밀번호 확인</p>
                        <input
                            type="password"
                            placeholder="비밀번호를 다시 입력해 주세요"
                            value={formData.passwordCheck}
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
                        <p className={styles.error}>
                            {error}
                        </p>
                    )}
                </div>
                <div className={styles.footer}>
                    <button
                        className={styles.cancelButton}
                        onClick={onCancel}
                    >
                        취소
                    </button>
                    <button
                        className={styles.confirmButton}
                        onClick={handleSubmit}
                    >
                        완료
                    </button>
                </div>
            </div>
        </div>
    );
}
