'use client';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '../../../stores/authStore';
import style from './NewButton.module.css';

export default function NewButton({ type }) {
    const { isLoggedIn } = useAuthStore();
    const router = useRouter();

    const handleClick = () => {
        if (!isLoggedIn) {
            router.push('/login');
            return;
        }

        switch (type) {
            case 'question':
                router.push('/new/question');
                break;
            case 'village':
                router.push('/new/village');
                break;
            default:
                router.push('/login');
        }
    };

    return (
        <button
            className={style.writeButton}
            onClick={handleClick}
        >
            글쓰기
        </button>
    );
}
