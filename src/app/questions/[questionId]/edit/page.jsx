// EditQuestionPage.jsx
'use client';

import { useState, useEffect, useRef } from 'react';
import { useParams, useRouter } from 'next/navigation';
import {
    questionDetail,
    questionUpdate,
} from '../../../../services/questionService';
import dynamic from 'next/dynamic';
import 'quill/dist/quill.snow.css'; // Quill 에디터 스타일
import QuillEditor from '../../../../components/board/new/QuillEditor';
import style from './page.module.css';

// Quill을 동적으로 불러오기
const Quill = dynamic(() => import('quill'), {
    ssr: false, // 서버 사이드 렌더링 비활성화
});

export default function EditQuestionPage() {
    const [data, setData] = useState({
        title: '',
        content: '',
        aiContent: '', // AI 답변 내용을 별도로 저장
    });
    const [isLoading, setIsLoading] = useState(true);
    const params = useParams();
    const editorRef = useRef(null);
    const router = useRouter();

    useEffect(() => {
        const fetchQuestionData = async () => {
            try {
                const response = await questionDetail(
                    params.questionId,
                );
                let visibleContent = response.content || '';

                const aiAnswerIndex =
                    visibleContent.indexOf('[AI 답변]');
                if (aiAnswerIndex !== -1) {
                    // AI 답변 부분을 분리하여 별도 상태로 저장
                    const userContent =
                        response.content.substring(
                            0,
                            aiAnswerIndex,
                        );
                    const aiContent =
                        response.content.substring(
                            aiAnswerIndex,
                        );

                    setData({
                        title: response.title || '',
                        content: userContent, // 사용자 내용만 에디터에 표시
                        aiContent: aiContent, // AI 답변 내용 별도 저장
                    });
                } else {
                    setData({
                        title: response.title || '',
                        content: response.content || '',
                        aiContent: '',
                    });
                }
                setIsLoading(false);
            } catch (err) {
                console.error(
                    'Error fetching question detail:',
                    err,
                );
                setIsLoading(false);
            }
        };

        fetchQuestionData();
    }, [params.questionId]);

    const handleUpdate = async () => {
        try {
            const editedContent =
                editorRef.current.getContent();

            // 수정된 내용과 AI 답변을 합쳐서 저장
            const finalContent = data.aiContent
                ? editedContent + data.aiContent
                : editedContent;

            if (!data.title.trim()) {
                alert('제목을 입력하세요.');
                return;
            }

            await questionUpdate(
                params.questionId,
                data.title,
                finalContent,
            );
            router.replace(
                `/questions/${params.questionId}`,
            );
        } catch (error) {
            console.error(
                'Error updating question:',
                error,
            );
        }
    };

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h2>게시글 수정</h2>
            <div className={style.formRow}>
                <input
                    className={style.input}
                    type="text"
                    id="title"
                    name="title"
                    required
                    value={data.title}
                    onChange={(e) =>
                        setData({
                            ...data,
                            title: e.target.value,
                        })
                    }
                />
                <button
                    onClick={handleUpdate}
                    className={style.button}
                >
                    수정
                </button>
            </div>

            <div>
                {/* QuillEditor에 content를 prop으로 전달 */}
                <QuillEditor
                    ref={editorRef}
                    content={data.content}
                />
            </div>
        </div>
    );
}
