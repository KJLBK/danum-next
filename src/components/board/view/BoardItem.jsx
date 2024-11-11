import Link from 'next/link';
import style from './BoardItem.module.css';
import Image from 'next/image';
import { formatTimeAgo } from '../../../utils/timeFormat';

export default function BoardItem({
    question_id,
    village_id,
    title,
    content,
    author,
    created_at,
    view_count,
    board, // 어떤 게시판인지 확인하는 값
    hasAcceptedComment,
}) {
    // content에서 <img> 태그를 추출하는 함수
    const extractImages = (htmlString) => {
        const div = document.createElement('div');
        div.innerHTML = htmlString;

        const images = Array.from(
            div.querySelectorAll('img'),
        ).map((img) => img.src);

        // <img> 태그 제거한 텍스트
        const textContent = div.innerText;

        return { images, textContent };
    };

    const id = question_id || village_id;
    const { images, textContent } = extractImages(content);

    return (
        <div className={style.boardItem}>
            <Link href={`/${board}/${id}`} scroll={false}>
                <div className={style.preview}>
                    <div className={style.textContainer}>
                        <p>
                            {/* TODO: STYLE */}
                            {board === 'questions'
                                ? '동네이야기'
                                : '질문이야기'}

                            {hasAcceptedComment
                                ? '이웃답변채택완료'
                                : 'GPT답변완료'}
                            {}
                        </p>
                        <h2 className={style.title}>
                            {title}
                        </h2>
                        <p className={style.textContent}>
                            {textContent}
                        </p>
                    </div>
                    <div className={style.images}>
                        {images.map((src, index) => (
                            <img
                                key={index}
                                src={src}
                                alt={`image-${index}`}
                                className={
                                    style.imagePreview
                                }
                            />
                        ))}
                    </div>
                </div>

                <div className={style.info}>
                    <span className={style.profile}>
                        <Image
                            src={
                                author?.profileImageUrl ||
                                '/logo-assets/android-chrome-512x512.png'
                            } // Fallback to default image
                            alt="프로필"
                            width={30} // Desired width
                            height={30} // Desired height
                            style={{ objectFit: 'cover' }}
                        />
                    </span>
                    <span className={style.userName}>
                        {author.userName}
                    </span>
                    <span className={style.metaInfo}>
                        {formatTimeAgo(created_at)} • 읽음
                        {view_count}
                    </span>
                </div>
            </Link>
        </div>
    );
}
