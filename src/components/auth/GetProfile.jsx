'use client';

import { useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import { getProfile } from '../../services/authService';
import { useRouter } from 'next/navigation';
import styles from './GetProfile.module.css';
import { createPortal } from 'react-dom';
import { useAuthStore } from '../../stores/authStore';
import { logout } from '../../services/authService';
import {
    useMutation,
    useQuery,
} from '@tanstack/react-query';
import MyProfile from '../profile/myProfile';
import Spinner from '../common/Spinner';

export default function GetProfile() {
    const [isDropdownOpen, setIsDropdownOpen] =
        useState(false);
    const [dropdownPosition, setDropdownPosition] =
        useState({ top: 0, left: 0 });
    const router = useRouter();
    const { clearAuth } = useAuthStore();
    const [error, setError] = useState(null);
    const dropdownRef = useRef(null); // 드롭다운 참조

    const mutation = useMutation({
        mutationFn: async () => {
            await logout(clearAuth);
        },
        onError: (err) => {
            setError('로그아웃 실패:' + err.message);
        },
        onSuccess: () => {
            console.log('로그아웃 성공');
            router.push('/');
        },
    });

    const {
        data: profileImage,
        err: profileError,
        isLoading,
    } = useQuery({
        queryKey: ['profile'],
        queryFn: getProfile,
    });

    if (profileError) {
        console.log(
            '프로필 이미지 가져오기 실패: ' +
                profileError.message,
        );
    }

    // 드롭다운 외부 클릭 감지
    useEffect(() => {
        const handleClickOutside = (event) => {
            // 프로필 이미지를 제외한 모든 클릭에 대해 드롭다운을 닫음
            if (isDropdownOpen) {
                setIsDropdownOpen(false);
            }
        };

        // 스크롤 락 추가/제거
        if (isDropdownOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }

        document.addEventListener(
            'click',
            handleClickOutside,
        );
        return () => {
            document.body.style.overflow = ''; // cleanup
            document.removeEventListener(
                'click',
                handleClickOutside,
            );
        };
    }, [isDropdownOpen]);

    const handleLogout = () => {
        mutation.mutate();
    };

    const handleMyPage = () => {
        router.push('/mypage');
    };

    const handleChatList = () => {
        router.push('/chat/roomlist');
    };

    const handleAccount = () => {
        router.push('/mypage/account');
    };
    const toggleDropdown = (event) => {
        event.stopPropagation();

        // 드롭다운이 닫혀있을 때만 위치를 계산하고 열기
        if (!isDropdownOpen) {
            const rect =
                event.target.getBoundingClientRect();
            setDropdownPosition({
                top: rect.bottom,
                left: rect.left,
            });
        }
        setIsDropdownOpen(!isDropdownOpen);
    };

    if (error) {
        console.log(error);
        return <div>Error: {error}</div>;
    }

    if (isLoading) {
        return <Spinner />; // 로딩 중일 때 표시
    }

    const profileImageSrc =
        profileImage ||
        '/logo-assets/android-chrome-512x512.png'; // 프로필 이미지가 없을 때 기본 이미지 사용

    return (
        <div className={styles.profileContainer}>
            <Image
                src={profileImageSrc} // 기본 이미지 또는 프로필 이미지
                alt="Profile"
                width={35}
                height={35}
                onClick={toggleDropdown}
                className={styles.profileImage}
            />
            {isDropdownOpen &&
                createPortal(
                    <div className={styles.createPotalMenu}>
                        <div
                            className={styles.dropdownMenu}
                            style={{}}
                            ref={dropdownRef} // 드롭다운 참조 추가
                        >
                            <MyProfile />
                            <div
                                className={
                                    styles.getProfile_btn_item
                                }
                            >
                                <button
                                    className={
                                        styles.dropdownItem
                                    }
                                    onClick={handleMyPage}
                                >
                                    내 프로필 🧑🏻‍💻
                                </button>
                                <button
                                    className={
                                        styles.dropdownItem
                                    }
                                    onClick={handleChatList}
                                >
                                    채팅 목록 💬
                                </button>
                                <button
                                    className={
                                        styles.dropdownItem
                                    }
                                    onClick={handleAccount}
                                >
                                    계정 📝
                                </button>
                                <button
                                    className={
                                        styles.dropdownItem
                                    }
                                    onClick={handleLogout}
                                >
                                    로그아웃 🚪
                                </button>
                            </div>
                        </div>
                    </div>,
                    document.body,
                )}
        </div>
    );
}
