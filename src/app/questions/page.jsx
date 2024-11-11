'use client';
import { questionShow } from '../../services/postService.server';
import style from './page.module.css';
import InfiniteScroll from '../../components/common/InfiniteScroll';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '../../stores/authStore';

export default function QuestionPage() {
    const { isLoggedIn } = useAuthStore();
    const router = useRouter();

    const handleNew = () => {
        if (isLoggedIn) {
            window.location.href = '/questions/new';
        } else {
            router.push('/login');
        }
    };

    return (
        <div className={style.container}>
            <h2>질문 이야기</h2>
            <button onClick={handleNew}>글쓰기</button>
            <InfiniteScroll
                serviceLogic={questionShow}
                queryKey={['questionPosts']}
            />
        </div>
    );
}
