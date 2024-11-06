'use client';

import Image from 'next/image';
import { useAuthStore } from '../../stores/authStore';
import { useEffect } from 'react';
import './myProfile.css';

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

    useEffect(() => {
        // 컴포넌트가 로드될 때마다 로그인 상태를 검증
        checkAuthStatus();
    }, [checkAuthStatus]);

    return (
        <>
            {isLoggedIn ? (
                <div className="main-profile">
                    <p>내 프로필</p>
                    <Image
                        src={
                            profileUrl || defaultProfileUrl
                        } // profileUrl이 없으면 기본 이미지 사용
                        alt="프로필 이미지"
                        width={100} // 원하는 너비
                        height={100} // 원하는 높이
                    />
                    <span>
                        {name}({email})
                    </span>
                    <span>{role}</span>
                    <button>새 동네 이야기</button>
                    <button>새 질문 이야기</button>
                </div>
            ) : (
                <p>로그인 부탁.</p>
            )}
        </>
    );
}
