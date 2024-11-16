'use client';

import { useParams } from 'next/navigation';
import PostInfoPanel from '../../../components/board/view/PostInfoPanel';
import CommentsList from '../../../components/board/view/comment/CommentsList';
import useVillageDetail from '../../../hooks/village/useVillageDetail';

export default function VillageViewPage() {
    const params = useParams();
    const postId = params.questionId || params.villageId;

    const {
        data,
        isLoading,
        deleteVillagePost,
        isDeleting,
    } = useVillageDetail(postId);

    if (isLoading) return <div>Loading...</div>;

    return (
        <>
            <PostInfoPanel
                board="villages"
                postId={postId}
                data={data}
                isDeleting={isDeleting}
                deletePost={deleteVillagePost}
            />
            <CommentsList
                type="village"
                PostAuthorId={data.author?.userId}
            />
        </>
    );
}
