import Link from 'next/link';
import style from './QuestionItem.module.css';
import Image from 'next/image';
import { formatTimeAgo } from '../../../utils/timeFormat';

export default function QuestionItem({
    question_id,
    title,
    content,
    author,
    created_at,
    view_count,
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
