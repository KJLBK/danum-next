import { fetchRecentPosts } from '../../services/postService';
import InfiniteScroll from '../common/InfiniteScroll';

export default function RecentPosts() {
    return (
        <>
            <h3>최근 게시물</h3>
            <InfiniteScroll
                serviceLogic={fetchRecentPosts}
                queryKey={['recentPosts']}
            />
        </>
    );
}
