'use client';
import { questionShow } from '../../services/postService.server';
import style from './page.module.css'; // CSS 모듈 임포트
import InfiniteScroll from '../../components/common/InfiniteScroll';
import { useRouter } from 'next/navigation';
export default function QuestionPage() {
    const router = useRouter();
    const handleNew = () => {
        router.push('/questions/new');
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
