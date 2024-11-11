import RecentMessagesList from '../components/chat/RecentMessagesList';
import PopularPosts from '../components/home/ PopularPosts/PopularPosts';
import RecentPosts from '../components/home/RecentPosts';
import MyProfile from '../components/profile/myProfile';
import styles from './page.module.css';

export default function Home() {
    return (
        <>
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
