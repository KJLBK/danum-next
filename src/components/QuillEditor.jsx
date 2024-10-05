// QuillEditor.jsx
'use client';

import React, {
    useEffect,
    useRef,
    forwardRef,
    useImperativeHandle,
    useState,
} from 'react';
import dynamic from 'next/dynamic';
import 'quill/dist/quill.snow.css';

const Quill = dynamic(() => import('quill'), {
    ssr: false,
});

const QuillEditor = forwardRef((props, ref) => {
    const editorRef = useRef(null);
    const quillRef = useRef(null);

    useImperativeHandle(ref, () => ({
        getContent: () => {
            if (quillRef.current) {
                return quillRef.current.root.innerHTML; // Quill 인스턴스에서 HTML 반환
            }
            return '';
        },
    }));

    useEffect(() => {
        async function initQuill() {
            const QuillInstance = (await import('quill'))
                .default;

            if (editorRef.current && !quillRef.current) {
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
                                [{ align: [] }],
                                ['clean'], // 서식 제거
                            ],
                        },
                    }
                );

                // 기존 콘텐츠가 있을 경우 Quill에 로드
                if (props.content) {
                    quillRef.current.clipboard.dangerouslyPasteHTML(
                        props.content
                    );
                }
            }
        }

        initQuill();
    }, [props.content]); // props.content가 변경될 때마다 실행

    return (
        <div>
            <div
                id='editor'
                ref={editorRef}
                style={{ height: '300px' }}
            />
        </div>
    );
});

QuillEditor.displayName = 'QuillEditor';

export default QuillEditor;
