import { questionShow } from '../../services/postService';
import style from './page.module.css'; // CSS 모듈 임포트
import InfiniteScroll from '../../components/common/InfiniteScroll';

export default function QuestionPage() {
    return (
        <div className={style.container}>
            <h2>질문 이야기</h2>
            <InfiniteScroll
                serviceLogic={questionShow}
                queryKey={['questionPosts']}
            />
        </div>
    );
}
