'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import {
    villageDetail,
    villageDelete,
    villageCommentShow,
    villageCommentNew,
    villageCommentDelete,
    villageCommentUpdate,
} from '../../../services/villageService';
import CommentItem from '../../../components/board/view/CommentItem';
import CommentNew from '../../../components/board/new/CommentNew';
import PostInfoPanel from '../../../components/board/view/PostInfoPanel';
import QuillViewer from '../../../components/board/view/QuillViewer';
import { useAuthStore } from '../../../stores/authStore';
import { handleCommentSelection } from '../../../hooks/commentSelect';

export default function VillageViewPage() {
    const [data, setData] = useState({});
    const [comments, setComments] = useState([]);
    const [selectedCommentId, setSelectedCommentId] =
        useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const params = useParams();
    const { isLoggedIn, user } = useAuthStore();
    const [author, setAuthor] = useState('');

    const fetchData = async () => {
        setIsLoading(true);
        try {
            const [postResponse, commentsResponse] =
                await Promise.all([
                    villageDetail(params.villageId),
                    villageCommentShow(params.villageId),
                ]);

            setData(postResponse);
            setAuthor(postResponse.author.userId);
            setComments(commentsResponse);

            // 채택된 댓글이 있는지 확인
            const acceptedComment = commentsResponse.find(
                (comment) => comment.accepted,
            );
            if (acceptedComment) {
                setSelectedCommentId(
                    acceptedComment.comment_id,
                );
            }
        } catch (err) {
            console.error('데이터 로딩 오류:', err);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, [params.villageId]);

    const onSelectComment = async (commentId) => {
        if (isLoading) return; // 로딩 중에는 선택 방지

        await handleCommentSelection(
            params.villageId,
            commentId,
            selectedCommentId,
            setSelectedCommentId,
            setComments,
            'village',
        );
    };

    if (isLoading) {
        return <div>로딩 중...</div>;
    }

    return (
        <>
            <PostInfoPanel
                data={data}
                board="villages"
                onDelete={villageDelete}
            />
            <QuillViewer content={data.content} />
            <hr />
            <h2>댓글</h2>
            {isLoggedIn ? (
                <CommentNew
                    postId={params.villageId}
                    email={user}
                    onSubmitComment={villageCommentNew}
                    type="village"
                />
            ) : (
                <p>댓글을 작성하려면 로그인하세요.</p>
            )}
            {comments.map((item) => (
                <CommentItem
                    key={item.comment_id}
                    {...item}
                    author={author}
                    selectedCommentId={selectedCommentId}
                    onSelect={onSelectComment}
                    onDelete={villageCommentDelete}
                    onUpdate={villageCommentUpdate}
                    type="village"
                />
            ))}
        </>
    );
}
