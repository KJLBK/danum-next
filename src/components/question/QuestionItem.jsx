import Link from 'next/link';
import style from './QuestionItem.module.css';
import Image from 'next/image';

export default function QuestionItem({
    question_id,
    title,
    content,
    author,
    created_at,
    view_count,
}) {
    // 시간을 "몇 시간 전" 형식으로 변환하는 함수
    const formatTimeAgo = (dateString) => {
        const now = new Date();
        const createdDate = new Date(dateString);
        const diffInSeconds = Math.floor(
            (now - createdDate) / 1000
        ); // 두 날짜의 차이 (초 단위)

        const minutes = Math.floor(diffInSeconds / 60);
        const hours = Math.floor(diffInSeconds / 3600);
        const days = Math.floor(diffInSeconds / 86400);

        if (days > 0) {
            return `${days}일 전`;
        } else if (hours > 0) {
            return `${hours}시간 전`;
        } else if (minutes > 0) {
            return `${minutes}분 전`;
        } else {
            return '방금 전';
        }
    };

    // content에서 <img> 태그를 추출하는 함수
    const extractImages = (htmlString) => {
        const div = document.createElement('div');
        div.innerHTML = htmlString;

        const images = Array.from(
            div.querySelectorAll('img')
        ).map((img) => img.src);

        // <img> 태그 제거한 텍스트
        const textContent = div.innerText;

        return { images, textContent };
    };

    const { images, textContent } = extractImages(content);

    return (
        <div className={style.questionItem}>
            <Link href={`/questions/${question_id}`}>
                <div className={style.preview}>
                    <div className={style.textContainer}>
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
                                '/danum-logo.png'
                            } // Fallback to default image
                            width={30} // Desired width
                            height={30} // Desired height
                            objectFit='cover'
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
