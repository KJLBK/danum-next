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

    // 초기 사용자 데이터 불러오기
    useEffect(() => {
        const getUserData = async () => {
            try {
                setIsLoading(true);
                const data = await fetchUserData();
                setFormData({
                    email: data.email,
                    phone: data.phone,
                    name: data.name,
                    latitude: data.latitude,
                    longitude: data.longitude,
                    address: data.address,
                    profileImageUrl: data.profileImageUrl,
                });
                console.log(data);
            } catch (err) {
                setError(
                    '사용자 데이터를 불러오는데 실패했습니다.',
                );
                console.error(
                    'Error fetching user data:',
                    err,
                );
            } finally {
                setIsLoading(false);
            }
        };

        getUserData();
    }, []);

    // 프로필 업데이트 뮤테이션
    const mutation = useMutation({
        mutationFn: async (formData) => {
            return await userUpdate(formData);
        },
        onError: (err) => {
            setError('프로필 수정 실패: ' + err.message);
        },
        onSuccess: (data) => {
            console.log('프로필 수정 성공', data);
            router.push('/mypage'); // 프로필 페이지로 이동
        },
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        mutation.mutate(formData);
    };

    // 입력 필드 변경 핸들러
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    if (isLoading) return <div>로딩 중...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div>
            <h2>프로필 수정</h2>
            <form onSubmit={handleSubmit}>
                <Profile
                    profileImageUrl={
                        formData.profileImageUrl
                    }
                    onImageChange={(imageUrl) =>
                        setFormData({
                            ...formData,
                            profileImageUrl: imageUrl,
                        })
                    }
                />
                <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="이메일"
                    disabled // 이메일은 수정 불가
                />
                <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="닉네임"
                    required
                />
                <KakaoMap
                    initialLocation={{
                        latitude: formData.latitude,
                        longitude: formData.longitude,
                        address: formData.address,
                    }}
                    onLocationChange={(location) =>
                        setFormData({
                            ...formData,
                            latitude: location.latitude,
                            longitude: location.longitude,
                            address: location.address,
                        })
                    }
                />

                <button
                    type="submit"
                    disabled={
                        !formData.latitude ||
                        !formData.longitude
                    }
                >
                    저장
                </button>
                {error && (
                    <p style={{ color: 'red' }}>{error}</p>
                )}
            </form>
        </div>
    );
}
