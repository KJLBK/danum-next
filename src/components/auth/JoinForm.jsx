'use client';

import { useState } from 'react';
import Input from '../common/Input';
import Button from '../common/Button';
import { join } from '../../services/authService';
import KakaoMap from '../../app/map/page'; // KakaoMap 컴포넌트를 가져옴
import Profile from './Profile';
import { useMutation } from '@tanstack/react-query';

export default function JoinForm() {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        passwordCheck: '',
        phone: '',
        name: '',
        latitude: '',
        longitude: '',
        address: '',
        profileImageUrl: '',
    });
    const [error, setError] = useState('');

    const mutation = useMutation({
        mutationFn: async (formData) => {
            return await join(formData);
        },
        onError: (err) => {
            setError('회원가입 실패: ' + err.message);
        },
        onSuccess: (data) =>
            console.log('회원가입 성공', data),
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        const { password, passwordCheck } = formData;

        // 비밀번호 길이 확인
        if (password.length <= 8 || password.length >= 16) {
            setError(
                '비밀번호는 8자 이상 16자 이하여야 합니다.',
            );
            return;
        }

        // 비밀번호와 비밀번호 확인 일치 여부 확인
        if (password !== passwordCheck) {
            setError('비밀번호가 일치하지 않습니다.');
            return;
        }

        mutation.mutate(formData);
    };

    // 공통 onChange 핸들러
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    return (
        <>
            <form onSubmit={handleSubmit}>
                <Input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="이메일"
                    required
                />
                <Input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    placeholder="비밀번호"
                    required
                />
                <Input
                    type="password"
                    name="passwordCheck"
                    value={formData.passwordCheck}
                    onChange={handleInputChange}
                    placeholder="비밀번호 확인"
                    required
                />
                <Input
                    type="text"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="전화번호"
                    required
                />
                <Input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="이름"
                    required
                />
                <KakaoMap
                    onLocationChange={(location) =>
                        setFormData({
                            ...formData,
                            latitude: location.latitude,
                            longitude: location.longitude,
                            address: location.address,
                        })
                    }
                />

                {/* KakaoMap에서 위도/경도 받기 */}
                {/* Profile 컴포넌트에 기본 이미지 및 변경 함수 전달 */}
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

                <Button
                    type="submit"
                    disabled={
                        !formData.latitude ||
                        !formData.longitude
                    }
                >
                    회원가입
                </Button>
                {/* TODO: 회원가입 성공 후 이동하는 코드가 없음 */}
                <p style={{ color: 'red' }}>{error}</p>
            </form>
        </>
    );
}
