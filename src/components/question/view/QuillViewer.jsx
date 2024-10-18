/* 
    Quill 에디터를 사용하여 질문 내용을 표시하는 컴포넌트.
    /q/[qid]/QuestionsViewPage 에서 사용중
*/

import dynamic from 'next/dynamic';
// import 'quill/dist/quill.snow.css';
// TODO: (질문)이거 왜 선언해놓은건지?
import { useEffect, useRef } from 'react';
import style from './QuillViewer.module.css';

// Quill을 동적으로 불러오기
const Quill = dynamic(() => import('quill'), {
    ssr: false, // 서버 사이드 렌더링 비활성화
});

export default function QuillViewer({ content }) {
    const editorRef = useRef(null);
    // Quill 에디터를 읽기 전용으로 설정하는 useEffect
    useEffect(() => {
        if (!editorRef.current) return;

        async function initQuill() {
            const QuillInstance = (await import('quill'))
                .default;

            const quill = new QuillInstance(
                editorRef.current,
                {
                    theme: 'snow', // Quill 기본 테마
                    readOnly: true, // 읽기 전용 모드
                    modules: {
                        toolbar: false, // 툴바 비활성화
                    },
                },
            );

            // Quill 인스턴스에 저장된 콘텐츠 설정 (HTML 형태일 경우)
            if (content) {
                quill.clipboard.dangerouslyPasteHTML(
                    content,
                ); // HTML 데이터를 Quill에 렌더링
            }
        }

        initQuill();
    }, [content]); // data.content가 변경될 때마다 실행

    return (
        <>
            <div>
                <div
                    className={style['q-view-content']}
                    id="quill-viewer"
                    ref={editorRef}
                ></div>
            </div>
        </>
    );
}
