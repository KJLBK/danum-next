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
            '프로필 이미지 가져오기 실패' + err.message,
        );
    }

    // 드롭다운 외부 클릭 감지
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target)
            ) {
                setIsDropdownOpen(false);
            }
        };

        document.addEventListener(
            'mousedown',
            handleClickOutside,
        );
        return () => {
            document.removeEventListener(
                'mousedown',
                handleClickOutside,
            );
        };
    }, []);

    const handleLogout = () => {
        mutation.mutate();
    };

    const handleMyPage = () => {
        router.push('/mypage');
    };

    const toggleDropdown = (event) => {
        setIsDropdownOpen(!isDropdownOpen);
        const rect = event.target.getBoundingClientRect();
        setDropdownPosition({
            top: rect.bottom,
            left: rect.left,
        });
    };

    if (error) {
        console.log(error);
        return <div>Error: {error}</div>;
    }

    if (!profileImage && isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <div className={styles.profileContainer}>
            <Image
                src={profileImage}
                alt="Profile"
                width={30}
                height={30}
                onClick={toggleDropdown}
                className={styles.profileImage}
            />
            {isDropdownOpen &&
                createPortal(
                    <div
                        className={styles.dropdownMenu}
                        style={{
                            position: 'fixed',
                            top: `${dropdownPosition.top}px`,
                            left: `${dropdownPosition.left}px`,
                        }}
                        ref={dropdownRef} // 드롭다운 참조 추가
                    >
                        <button
                            className={styles.closeButton}
                            onClick={() =>
                                setIsDropdownOpen(false)
                            } // X 버튼 클릭 시 드롭다운 닫기
                        >
                            X
                        </button>
                        <button
                            className={styles.dropdownItem}
                            onClick={handleMyPage}
                        >
                            My Page
                        </button>
                        <button
                            className={styles.dropdownItem}
                            onClick={handleLogout}
                        >
                            Logout
                        </button>
                    </div>,
                    document.body,
                )}
        </div>
    );
}
