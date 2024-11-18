'use client';

import Image from 'next/image';
import { useAuthStore } from '../../stores/authStore';
import { useEffect, useState } from 'react';
import './myProfile.css';
import { useRouter } from 'next/navigation';
import ExpBar from '../../components/auth/ExpBar';
import { fetchUserData } from '../../services/authService';
import Link from 'next/link';

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

    const handleLoginClick = () => {
        router.push('/login', { scroll: false });
    };

    return (
        <>
            {isLoggedIn ? (
                <div className="myprofile">
                    <p className="myprofile-p">
                        내 프로필 😊
                    </p>
                    <Link href="/mypage">
                        <div className="myprofile-header">
                            <Image
                                src={
                                    profileUrl ||
                                    defaultProfileUrl
                                }
                                alt="프로필 이미지"
                                width={60}
                                height={60}
                            />
                            <div className="myprofile-header-id">
                                <strong>{name}</strong>

                                <span>{role}</span>
                            </div>
                        </div>
                    </Link>
                    <div className="myprofile-write-btn">
                        <button
                            className="myprofile-write-btn-dongnae"
                            onClick={handleNewVillage}
                        >
                            새 동네이야기
                        </button>
                        <button
                            className="myprofile-write-btn-question"
                            onClick={handleNewQuestion}
                        >
                            새 질문이야기
                        </button>
                    </div>
                    <ExpBar exp={userExp} />
                </div>
            ) : (
                <>
                    <div className="main-logout">
                        <Image
                            src="/icon-assets/otter.png"
                            alt="sudal"
                            width={50}
                            height={50}
                        />
                        <p>
                            로그인하고
                            <br />
                            다눔을 이용해보세요
                        </p>
                        <button
                            type="button"
                            onClick={handleLoginClick}
                            className="loginButton"
                        >
                            다눔 시작하기
                        </button>
                    </div>
                </>
            )}
        </>
    );
}
