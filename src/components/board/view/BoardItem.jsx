import Link from 'next/link';
import style from './BoardItem.module.css';
import Image from 'next/image';
import { formatTimeAgo } from '../../../utils/timeFormat';

// content에서 <img> 태그를 추출하는 함수 (유틸리티로 분리 가능)
const extractImages = (htmlString) => {
    const div = document.createElement('div');
    div.innerHTML = htmlString;

    const images = Array.from(
        div.querySelectorAll('img'),
    ).map((img) => img.src);
    const textContent = div.innerText; // <img> 태그 제거한 텍스트

    return { images, textContent };
};

// 게시판 태그 렌더링 함수
const renderTags = (
    board,
    hasAcceptedComment,
    postType,
) => {
    if (board === 'questions') {
        return (
            <>
                <span className={style.tag}>
                    질문이야기
                </span>
                <span className={style.tag}>
                    {hasAcceptedComment
                        ? '이웃답변채택완료'
                        : 'GPT답변완료'}
                </span>
            </>
        );
    }
    return (
        <>
            <span className={style.tag}>동네이야기</span>
            {postType && (
                <span className={style.tag}>
                    {postType === 'DAILY' && '일상'}
                    {postType === 'QUESTION' && '질문'}
                </span>
            )}
        </>
    );
};

export default function BoardItem({
    question_id,
    village_id,
    title,
    content,
    author,
    created_at,
    view_count,
    board,
    hasAcceptedComment,
    postType,
}) {
    const id = question_id || village_id;
    const { images, textContent } = extractImages(content);

    return (
        <Link href={`/${board}/${id}`} scroll={false}>
            <article className={style.boardItem}>
                <div className={style.preview}>
                    <div className={style.textContainer}>
                        <div className={style.tagContainer}>
                            {renderTags(
                                board,
                                hasAcceptedComment,
                                postType,
                            )}
                        </div>
                        <h2 className={style.title}>
                            {title}
                        </h2>
                        <p className={style.textContent}>
                            {textContent}
                        </p>
                    </div>
                    <div className={style.images}>
                        {images.map((src, index) => (
                            <Image
                                key={index}
                                src={
                                    src ||
                                    '/logo-assets/android-chrome-512x512.png'
                                }
                                width={138}
                                height={92}
                                alt={`image-${index}`}
                                className={
                                    style.imagePreview
                                }
                            />
                        ))}
                    </div>
                </div>
                <div className={style.info}>
                    <div className={style.info_profile}>
                        <span className={style.profile}>
                            <Image
                                src={
                                    author?.profileImageUrl ||
                                    '/logo-assets/android-chrome-512x512.png'
                                }
                                alt="프로필"
                                width={28}
                                height={28}
                                style={{
                                    objectFit: 'cover',
                                }}
                            />
                        </span>
                        <span className={style.userName}>
                            {author.userName}
                        </span>
                    </div>

                    <span className={style.metaInfo}>
                        {formatTimeAgo(created_at)} • 읽음{' '}
                        {view_count}
                    </span>
                </div>
            </article>
        </Link>
    );
}
