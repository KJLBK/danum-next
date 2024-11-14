'use client';

import { useState, useEffect } from 'react';
import {
    fetchUserData,
    userUpdate,
} from '../../../services/authService';
import Profile from '../../../components/auth/Profile';
import KakaoMap from '../../map/page';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import styles from './page.module.css';

export default function ProfileEdit() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        email: '',
        phone: '',
        name: '',
        latitude: '',
        longitude: '',
        address: '',
        profileImageUrl: '',
    });
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const getUserData = async () => {
            try {
                setIsLoading(true);
                const data = await fetchUserData();
                setFormData(data);
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
        mutationFn: userUpdate,
        onSuccess: () => router.push('/mypage'),
        onError: (err) =>
            setError('프로필 수정 실패: ' + err.message),
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        mutation.mutate(formData);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    if (isLoading) return <div>로딩 중...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div className={styles.container}>
            <form
                onSubmit={handleSubmit}
                className={styles.form}
            >
                <h2>프로필 관리</h2>

                <section className={styles.section}>
                    <h3>프로필 사진</h3>
                    <Profile
                        profileImageUrl={
                            formData.profileImageUrl
                        }
                        onImageChange={(imageUrl) =>
                            setFormData((prev) => ({
                                ...prev,
                                profileImageUrl: imageUrl,
                            }))
                        }
                    />
                </section>

                <section className={styles.section}>
                    <h3>위치</h3>
                    <KakaoMap
                        initialLocation={{
                            latitude: formData.latitude,
                            longitude: formData.longitude,
                            address: formData.address,
                        }}
                        onLocationChange={(location) =>
                            setFormData((prev) => ({
                                ...prev,
                                ...location,
                            }))
                        }
                    />
                </section>

                <section className={styles.section}>
                    <h3>닉네임</h3>
                    <div className={styles.inputWrapper}>
                        <input
                            className={styles.input}
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            placeholder="닉네임"
                            required
                        />
                    </div>
                </section>

                <div className={styles.buttonWrapper}>
                    <button
                        className={styles.button}
                        type="submit"
                        disabled={
                            !formData.latitude ||
                            !formData.longitude
                        }
                    >
                        저장
                    </button>
                </div>
            </form>
        </div>
    );
}
