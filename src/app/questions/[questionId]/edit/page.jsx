// EditQuestionPage.jsx
'use client';

import { useState, useEffect, useRef } from 'react';
import { useParams, useRouter } from 'next/navigation';
import {
    questionDetail,
    questionUpdate,
} from '../../../../service/questionService';
import dynamic from 'next/dynamic';
import 'quill/dist/quill.snow.css'; // Quill 에디터 스타일
import QuillEditor from '../../../../components/QuillEditor';

// Quill을 동적으로 불러오기
const Quill = dynamic(() => import('quill'), {
    ssr: false, // 서버 사이드 렌더링 비활성화
});

export default function EditQuestionPage() {
    const [data, setData] = useState({
        title: '',
        content: '',
    });
    const [isLoading, setIsLoading] = useState(true);
    const params = useParams();
    const editorRef = useRef(null);
    const router = useRouter();

    useEffect(() => {
        // 기존 데이터를 불러와서 초기값으로 설정
        const fetchQuestionData = async () => {
            try {
                const response = await questionDetail(
                    params.questionId
                );
                setData({
                    title: response.title || '', // title이 없을 경우 빈 문자열로 설정
                    content: response.content || '', // content가 없을 경우 빈 문자열로 설정
                });
                setIsLoading(false);
            } catch (err) {
                console.error(
                    'Error fetching question detail:',
                    err
                );
                setIsLoading(false);
            }
        };

        fetchQuestionData();
    }, [params.questionId]);

    const handleUpdate = async () => {
        try {
            const content = editorRef.current.getContent(); // Quill 에디터의 내용을 가져옴
            if (!data.title.trim()) {
                alert('제목을 입력하세요.'); // 제목이 빈 문자열인지 확인
                return;
            }
            const id = params.questionId;
            const title = data.title;

            await questionUpdate(id, title, content);
            router.push(`/questions/${params.questionId}`); // 수정 후 해당 질문 페이지로 이동
        } catch (error) {
            console.error(
                'Error updating question:',
                error
            );
        }
    };

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>질문 수정하기</h1>
            <div>
                <label>제목</label>
                <input
                    type='text'
                    value={data.title}
                    onChange={(e) =>
                        setData({
                            ...data,
                            title: e.target.value,
                        })
                    }
                />
            </div>

            <div>
                {/* QuillEditor에 content를 prop으로 전달 */}
                <QuillEditor
                    ref={editorRef}
                    content={data.content}
                />
            </div>
            <button onClick={handleUpdate}>
                수정 완료
            </button>
        </div>
    );
}
