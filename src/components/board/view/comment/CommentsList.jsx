'use client';

import { useParams } from 'next/navigation';
import { useComments } from '../../../../hooks/village/useComments';
import CommentNew from './CommentNew';
import UserComment from './UserComment';
import { useAuthStore } from '../../../../stores/authStore';
import Spinner from '../../../common/Spinner';

export default function CommentsList({
    type,
    PostAuthorId,
}) {
    const params = useParams();
    const { email, isLoggedIn } = useAuthStore();
    const postId = params.questionId || params.villageId;

    const { comments, isLoading, addComment } = useComments(
        postId,
        type,
    );

    if (isLoading) {
        return <Spinner />;
    }

    return (
        <>
            <hr />
            <h2>댓글</h2>
            {isLoggedIn ? (
                <CommentNew
                    postId={postId}
                    email={email}
                    onSubmitComment={addComment.mutate}
                    type={type}
                />
            ) : (
                <p>댓글을 작성하려면 로그인하세요.</p>
            )}
            {comments?.map((item) => (
                <UserComment
                    key={item.comment_id}
                    {...item}
                    author={item.email}
                    postId={postId}
                    type={type}
                    PostAuthorId={PostAuthorId}
                />
            ))}
        </>
    );
}
