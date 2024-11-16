'use client';
import { useParams } from 'next/navigation';
import PostInfoPanel from '../../../components/board/view/PostInfoPanel';
import CommentsList from '../../../components/board/view/comment/CommentsList';
import useQuestionDetail from '../../../hooks/village/useQuestionDetail';
import AICommentItem from '../../../components/board/view/aiComment/AICommentItem';

export default function QuestionsViewPage() {
    const params = useParams();
    const postId = params.questionId || params.villageId;

    const { data, isLoading, deleteQuestion, isDeleting } =
        useQuestionDetail(postId);

    if (isLoading) return <div>Loading...</div>;

    return (
        <div>
            <PostInfoPanel
                board="questions"
                postId={postId}
                data={data}
                isDeleting={isDeleting}
                deletePost={deleteQuestion}
            />
            <AICommentItem
                content={data.content}
                author={data.author?.userId}
            />
            <CommentsList
                type="question"
                PostAuthorId={data.author?.userId}
            />
        </div>
    );
}
