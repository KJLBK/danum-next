import InfiniteScroll from '../components/common/InfiniteScroll';
import styles from './page.module.css';

export default function Home() {
    return (
        <>
            <main className={styles.mainAside}>
                <aside className={styles.left}>
                    {/* 로그인 전 */}
                    {/* 로그인 후 */}
                </aside>
                <div className={styles.middle}>
                    {/* 질문(무한스크롤) */}
                    <InfiniteScroll />
                </div>
                <aside className={styles.right}>
                    {/* 인기 게시물 */}
                    {/* ??? */}
                </aside>
            </main>
        </>
    );
}
