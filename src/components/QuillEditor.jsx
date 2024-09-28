'use client';
import React, {
    useEffect,
    useRef,
    forwardRef,
    useImperativeHandle,
} from 'react';
import dynamic from 'next/dynamic';
import 'quill/dist/quill.snow.css';

// Quill 라이브러리를 동적으로 불러오기
const Quill = dynamic(() => import('quill'), {
    ssr: false, // 서버 사이드 렌더링 비활성화
});

const QuillEditor = forwardRef((props, ref) => {
    const editorRef = useRef(null); // 에디터가 들어갈 ref
    const quillRef = useRef(null); // Quill 인스턴스를 저장할 ref

    useEffect(() => {
        async function initQuill() {
            const QuillInstance = (await import('quill'))
                .default;

            // Quill 인스턴스가 이미 생성되었는지 확인
            if (editorRef.current && !quillRef.current) {
                // Quill 인스턴스 생성
                quillRef.current = new QuillInstance(
                    editorRef.current,
                    {
                        theme: 'snow',
                        modules: {
                            toolbar: [
                                [{ header: [1, 2, false] }],
                                [
                                    'bold',
                                    'italic',
                                    'underline',
                                    'strike',
                                ],
                                [
                                    { list: 'ordered' },
                                    { list: 'bullet' },
                                ],
                                [
                                    'link',
                                    'image',
                                    'code-block',
                                ],
                                [{ align: [] }], // 텍스트 정렬 추가
                                ['clean'], // 서식 제거
                            ],
                        },
                    }
                );
            }
        }

        initQuill(); // Quill 에디터 초기화
    }, []);

    // 부모 컴포넌트에서 사용할 수 있는 메서드를 정의
    useImperativeHandle(ref, () => ({
        getContent: () => {
            if (quillRef.current) {
                return quillRef.current.root.innerHTML; // HTML 형식으로 반환
            }
            return '';
        },
        getText: () => {
            if (quillRef.current) {
                return quillRef.current.getText(); // 단순 텍스트 반환
            }
            return '';
        },
    }));

    return (
        <div>
            <div id='toolbar'></div>
            <div
                id='editor'
                ref={editorRef}
                style={{ height: '300px' }}
            ></div>
        </div>
    );
});

QuillEditor.displayName = 'QuillEditor'; // forwardRef 사용 시 컴포넌트 이름 지정

export default QuillEditor;
