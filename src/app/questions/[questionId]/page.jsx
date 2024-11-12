'use client';
import { useParams } from 'next/navigation';
import PostInfoPanel from '../../../components/board/view/PostInfoPanel';
import CommentList from '../../../components/board/view/comment/CommentLIst';
import useQuestionDetail from '../../../hooks/village/useQuestionDetail';
import AICommentItem from '../../../components/board/view/aiComment/AiCommentItem';

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
            <CommentList
                type="question"
                PostAuthorId={data.author?.userId}
            />
        </div>
    );
}
