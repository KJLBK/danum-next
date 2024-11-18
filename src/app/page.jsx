import RecentMessagesList from '../components/chat/RecentMessagesList';
import PopularPosts from '../components/home/PopularPosts/PopularPosts';
import RecentPosts from '../components/home/RecentChat/RecentPosts';
import MyProfile from '../components/profile/myProfile';
import styles from './page.module.css';
import Image from 'next/image';

export default function Home() {
    return (
        <>
            <div className={styles.banner}>
                <Image
                    src="/banner.png"
                    alt="banner"
                    className={styles.responsiveImage}
                    width={3000}
                    height={450}
                    priority
                />
            </div>
            <main className={styles.mainAside}>
                <aside className={styles.left}>
                    <MyProfile />
                    {/* 채팅 */}
                    <RecentMessagesList />
                </aside>
                <div className={styles.middle}>
                    {/* 질문(무한스크롤) */}
                    {/* <InfiniteScroll /> */}
                    <RecentPosts />
                </div>
                <aside className={styles.right}>
                    {/* 인기 게시물 */}
                    <PopularPosts />
                    {/* ??? */}
                </aside>
            </main>
        </>
    );
}
