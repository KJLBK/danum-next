'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useAuthStore } from '../../stores/authStore';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import styles from './Header.module.css';

import SearchIcon from '../../../public/search.svg';
import LoginButton from './Header/LoginButton';
import GetProfile from '../auth/GetProfile';
import NotificationsIcon from './Header/NotificationsIcon';
import DanumLogo from '../../../public/emoji-assets/\bdanumlogo';

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
                    <li className={styles['home']}>
                        <a
                            href="/"
                            className={styles.logo}
                            style={{ padding: 0 }}
                        >
                            <DanumLogo />
                        </a>
                    </li>
                    <div className={styles['header-li']}>
                        <li className={isActive('/')}>
                            <Link href="/">홈</Link>
                        </li>
                        <li
                            className={isActive(
                                '/villages',
                            )}
                        >
                            <Link href="/villages">
                                동네이야기
                            </Link>
                        </li>
                        <li
                            className={isActive(
                                '/questions',
                            )}
                        >
                            <Link href="/questions">
                                질문이야기
                            </Link>
                        </li>
                    </div>
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
