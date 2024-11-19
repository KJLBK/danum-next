import Link from 'next/link';
import { fetchRecentPosts } from '../../../services/postService.server';
import InfiniteScroll from '../../common/InfiniteScroll';
import styles from './RecentPosts.module.css';
import StarEyes from '../../../../public/emoji-assets/stareyes';
export default function RecentPosts() {
    return (
        <>
            <div className={styles.RecentPostsHeader}>
                <p>지금 올라오는 최신 이야기</p>
                <StarEyes />
            </div>
            <InfiniteScroll
                serviceLogic={fetchRecentPosts}
                queryKey={['recentPosts']}
            />
        </>
    );
}
