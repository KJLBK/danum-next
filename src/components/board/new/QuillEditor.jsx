'use client';

import React, {
    useEffect,
    useRef,
    forwardRef,
    useImperativeHandle,
} from 'react';
import dynamic from 'next/dynamic';
import styles from './QuillEditor.module.css';

import 'quill/dist/quill.snow.css';

const Quill = dynamic(() => import('react-quill'), {
    ssr: false,
});

const QuillEditor = forwardRef((props, ref) => {
    const editorRef = useRef(null);
    const quillRef = useRef(null);

    useImperativeHandle(ref, () => ({
        getContent: () => {
            return quillRef.current
                ? quillRef.current.root.innerHTML
                : '';
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
                        placeholder: `궁금한 점을 자유롭게 물어보세요!

• 일상적인 궁금증부터 전문적인 질문까지 무엇이든 환영합니다
• AI와 동네 이웃들이 함께 답변해드려요
• 구체적으로 설명해주시면 더 정확한 답변을 받으실 수 있어요
• 사진이나 자료를 첨부하시면 이해하는데 도움이 됩니다

예시: 
- 이 동네에서 맛있는 돈까스 맛집 추천해주세요!
- 강아지 산책시키기 좋은 장소 어디인가요?
- 이 지역 미용실 추천해주세요.`,
                        modules: {
                            toolbar: {
                                container: [
                                    [
                                        {
                                            header: [
                                                1,
                                                2,
                                                false,
                                            ],
                                        },
                                    ],
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
                                    ], // Ensure image button is included
                                    ['clean'], // Clear formatting
                                ],
                                handlers: {
                                    image: imageHandler, // Custom image handler
                                },
                            },
                        },
                    },
                );

                // Load existing content if provided
                if (props.content) {
                    quillRef.current.clipboard.dangerouslyPasteHTML(
                        props.content,
                    );
                }
            }
        }

        initQuill();
    }, [props.content]);

    const imageHandler = () => {
        const input = document.createElement('input');
        input.setAttribute('type', 'file');
        input.setAttribute('accept', 'image/*');
        input.style.display = 'none';
        document.body.appendChild(input);

        input.onchange = async () => {
            const file = input.files[0];
            if (file) {
                const formData = new FormData();
                formData.append('img', file);

                // Replace '/api/upload' with your actual upload endpoint
                const result = await fetch('/api/upload', {
                    method: 'POST',
                    body: formData,
                }).then((res) => res.json());

                if (result.message === 'OK') {
                    const range =
                        quillRef.current.getSelection();
                    quillRef.current.insertEmbed(
                        range.index,
                        'image',
                        result.url,
                    );
                } else {
                    alert('Image upload failed.'); // Alert on upload failure
                }
            }
            document.body.removeChild(input); // Clean up input element
        };

        input.click(); // Open file chooser
    };

    return (
        <div>
            <div
                id="editor"
                ref={editorRef}
                style={{ height: '400px' }}
            />
        </div>
    );
});

QuillEditor.displayName = 'QuillEditor';

export default QuillEditor;
