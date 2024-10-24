import Link from 'next/link';
import Image from 'next/image';
import { formatTimeAgo } from '../../../utils/timeFormat';
import style from './VillageItem.module.css';

export default function VillageItem({
    village_id,
    title,
    content,
    author,
    created_at,
    view_count,
}) {
    // content에서 <img> 태그를 추출
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
        <div className={style.villageItem}>
            <Link href={`/villages/${village_id}`}>
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
                            }
                            alt="프로필"
                            width={30}
                            height={30}
                            style={{ objectFit: 'cover' }}
                        />
                    </span>
                    <span className={style.userName}>
                        {author?.userName}
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
