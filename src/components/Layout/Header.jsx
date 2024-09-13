'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import styles from '../../styles/Header.module.css';

import AlarmIcon from '../../../public/bell.svg';
import SearchIcon from '../../../public/search.svg';

export default function Header() {
    const pathname = usePathname();

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
                        <Link href="/">danum</Link>
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
                    {/* TO DO: 기능구현 */}
                    <SearchIcon />
                    <AlarmIcon />
                    <li>유저</li>
                </ul>
            </div>
        </header>
    );
}
