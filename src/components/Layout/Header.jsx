'use client';

import { usePathname } from 'next/navigation';
import { useAuthStore } from '../../stores/authStore';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import styles from '../../styles/Header.module.css';

import SearchIcon from '../../../public/search.svg';
import LoginButton from './Header/LoginButton';
import GetProfile from '../auth/GetProfile';
import NotificationsIcon from './Header/NotificationsIcon';

export default function Header() {
    const { user, isLoggedIn } = useAuthStore();
    const pathname = usePathname();
    const [hydrated, setHydrated] = useState(false); // Hydration 상태 관리

    // 클라이언트에서만 상태를 업데이트
    useEffect(() => {
        setHydrated(true);
    }, []);

    const isActive = (path) => {
        if (pathname === path) {
            console.log(`Current active path: ${path}`);
        }
        return pathname === path
            ? styles['text-primary-basic']
            : '';
    };

    return (
        <header>
            <div className={styles['header-div']}>
                <ul className={styles['header-ul']}>
                    <li>
                        <a href="/">danum</a>
                    </li>
                    <li className={isActive('/')}>
                        <Link href="/">홈</Link>
                    </li>
                    <li className={isActive('/villages')}>
                        <Link href="/villages">
                            동네이야기
                        </Link>
                    </li>
                    <li className={isActive('/questions')}>
                        <Link href="/questions">
                            질문이야기
                        </Link>
                    </li>
                    <li className={isActive('/chat')}>
                        <Link href="/chat">채팅</Link>
                    </li>
                    <li className={isActive('/test')}>
                        <Link href="/test">테스트</Link>
                    </li>
                </ul>
                <ul className={styles['header-ul']}>
                    <Link href="/search">
                        <SearchIcon />
                    </Link>
                    <NotificationsIcon
                        isLoggedIn={isLoggedIn}
                    />
                    {/* hydration이 완료된 후에만 상태 확인 */}
                    {hydrated && !isLoggedIn ? (
                        <LoginButton />
                    ) : (
                        hydrated &&
                        isLoggedIn && <GetProfile />
                    )}
                </ul>
            </div>
        </header>
    );
}
