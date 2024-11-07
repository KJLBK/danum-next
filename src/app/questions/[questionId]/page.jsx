'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import {
    questionDetail,
    questionDelete,
    questionCommentShow,
    questionCommentNew,
    questionCommentDelete,
    questionCommentUpdate,
} from '../../../services/questionService';
import { handleCommentSelection } from '../../../hooks/commentSelect';
import CommentItem from '../../../components/board/view/CommentItem';
import CommentNew from '../../../components/board/new/CommentNew';
import QuillViewer from '../../../components/board/view/QuillViewer';
import PostInfoPanel from '../../../components/board/view/PostInfoPanel';
import { useAuthStore } from '../../../stores/authStore';
import { aiChat } from '../../../services/chatGPTService';
import styles from './page.module.css';

export default function QuestionsViewPage() {
    const [data, setData] = useState({});
    const [comments, setComments] = useState([]);
    const [selectedCommentId, setSelectedCommentId] =
        useState(null);
    const params = useParams();
    const { isLoggedIn, email } = useAuthStore();
    const [author, setAuthor] = useState('');
    const [message, setMessage] = useState('');
    const [originalContent, setOriginalContent] =
        useState('');
    const [aiInteractions, setAiInteractions] = useState(
        [],
    );

    const fetchData = async () => {
        try {
            const response = await questionDetail(
                params.questionId,
            );

            // 원본 내용과 AI 상호작용 분리
            const contentSections =
                response.content.split('[AI 답변]');
            const originalText = contentSections[0].trim();

            // AI 답변과 추가 질문 처리
            const interactions = [];
            if (contentSections.length > 1) {
                for (
                    let i = 1;
                    i < contentSections.length;
                    i++
                ) {
                    const parts =
                        contentSections[i].split(
                            '[추가 질문]',
                        );
                    interactions.push({
                        answer: parts[0].trim(),
                        question: parts[1]?.trim() || '',
                    });
                }
            }

            setData(response);
            setOriginalContent(originalText);
            setAiInteractions(interactions);
            setAuthor(response.author.userId);
        } catch (err) {
            console.error(
                '질문 세부 정보 가져오기 오류:',
                err,
            );
        }
    };

    const fetchComments = async () => {
        try {
            const response = await questionCommentShow(
                params.questionId,
            );
            setComments(response);
            const selectedComment = response.find(
                (comment) => comment.accepted === true,
            );
            if (selectedComment) {
                setSelectedCommentId(
                    selectedComment.comment_id,
                );
            }
        } catch (err) {
            console.error('댓글 가져오기 오류:', err);
        }
    };

    useEffect(() => {
        fetchData();
        fetchComments();
    }, [params.questionId]);

    const onSelectComment = async (commentId) => {
        await handleCommentSelection(
            params.questionId,
            commentId,
            selectedCommentId,
            setSelectedCommentId,
            setComments,
            'question',
        );
    };

    const handleMessage = (e) => {
        setMessage(e.target.value);
    };

    const handleAiChat = async () => {
        if (!message.trim()) return;
        try {
            await aiChat(params.questionId, message);
            location.reload();
        } catch (error) {
            console.error('AI 채팅 오류:', error);
        }
    };

    return (
        <div>
            <PostInfoPanel
                data={data}
                board="questions"
                onDelete={questionDelete}
            />
            <div>
                <div className={styles.originalContent}>
                    <QuillViewer
                        content={originalContent}
                    />
                </div>
                <hr />

                {aiInteractions.map(
                    (interaction, index) => (
                        <div
                            key={index}
                            className={
                                styles.interactionContainer
                            }
                        >
                            <div
                                className={styles.aiAnswer}
                            >
                                <h2>AI 답변 {index + 1}</h2>
                                {interaction.answer}
                            </div>

                            {interaction.question && (
                                <div
                                    className={
                                        styles.additionalQuestion
                                    }
                                >
                                    <h2>추가 질문</h2>
                                    <p>
                                        {
                                            interaction.question
                                        }
                                    </p>
                                </div>
                            )}
                        </div>
                    ),
                )}

                {email === author && (
                    <div className={styles.questionForm}>
                        <h3>AI에게 추가 질문하기</h3>
                        <div className={styles.inputGroup}>
                            <input
                                type="text"
                                value={message}
                                onChange={handleMessage}
                                placeholder="AI에게 질문하세요"
                                className={styles.input}
                            />
                            <button
                                onClick={handleAiChat}
                                className={styles.button}
                            >
                                질문하기
                            </button>
                        </div>
                    </div>
                )}
            </div>

            <div className={styles.commentsSection}>
                <h2>댓글</h2>
                {isLoggedIn ? (
                    <CommentNew
                        postId={params.questionId}
                        email={email}
                        onSubmitComment={questionCommentNew}
                        type="question"
                    />
                ) : (
                    <p>댓글을 작성하려면 로그인하세요.</p>
                )}

                {comments.map((item) => (
                    <CommentItem
                        key={item.comment_id}
                        {...item}
                        author={author}
                        onSelect={onSelectComment}
                        onDelete={questionCommentDelete}
                        onUpdate={questionCommentUpdate}
                        type="question"
                    />
                ))}
            </div>
        </div>
    );
}
