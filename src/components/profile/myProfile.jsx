'use client';

import Image from 'next/image';
import { useAuthStore } from '../../stores/authStore';
import { useEffect, useState } from 'react';
import './myProfile.css';
import { useRouter } from 'next/navigation';
import ExpBar from '../../components/auth/ExpBar';
import { fetchUserData } from '../../services/authService';

export default function MyProfile() {
    const {
        name,
        email,
        role,
        profileImageUrl: profileUrl,
        checkAuthStatus,
        isLoggedIn,
    } = useAuthStore();
    const defaultProfileUrl =
        '/logo-assets/android-chrome-512x512.png';
    const router = useRouter();
    const [userExp, setUserExp] = useState(0);

    useEffect(() => {
        // 로그인 상태 검증
        checkAuthStatus();

        // 유저 경험치 데이터 가져오기
        const getUserExp = async () => {
            try {
                const userData = await fetchUserData();
                setUserExp(userData.exp);
            } catch (error) {
                console.error(
                    'Failed to fetch user exp:',
                    error,
                );
            }
        };

        if (isLoggedIn) {
            getUserExp();
        }
    }, [checkAuthStatus, isLoggedIn]);

    const handleNewQuestion = () => {
        router.push('/new/question');
    };

    const handleNewVillage = () => {
        router.push('/new/village');
    };

    return (
        <>
            {isLoggedIn ? (
                <div className="main-profile">
                    <Image
                        src={
                            profileUrl || defaultProfileUrl
                        }
                        alt="프로필 이미지"
                        width={100}
                        height={100}
                    />
                    <span>
                        {name}({email})
                    </span>
                    <span>{role}</span>
                    <ExpBar exp={userExp} />
                    <button onClick={handleNewVillage}>
                        새 동네이야기
                    </button>
                    <button onClick={handleNewQuestion}>
                        새 질문이야기
                    </button>
                </div>
            ) : (
                <p>로그인 부탁.</p>
            )}
        </>
    );
}
