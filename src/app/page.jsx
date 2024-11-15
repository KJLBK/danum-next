import RecentMessagesList from '../components/chat/RecentMessagesList';
import PopularPosts from '../components/home/PopularPosts/PopularPosts';
import RecentPosts from '../components/home/RecentPosts';
import MyProfile from '../components/profile/myProfile';
import styles from './page.module.css';
import Image from 'next/image';

export default function Home() {
    return (
        <>
            <></>
            <div>
                <Image
                    src="/banner.png"
                    alt="banner"
                    layout="responsive"
                    height={3000}
                    width={450}
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
