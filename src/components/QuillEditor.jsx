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
                                ['clean'],
                            ],
                        },
                    }
                );

                // Register the image handler
                quillRef.current
                    .getModule('toolbar')
                    .addHandler('image', imageHandler);
            }
        }

        initQuill();
    }, []);

    const imageHandler = async () => {
        const input = document.createElement('input');
        input.setAttribute('type', 'file');
        input.setAttribute('accept', 'image/*');
        input.click();

        input.onchange = async () => {
            const file = input.files[0];
            if (file) {
                const imageUrl =
                    await uploadImageToS3(file);
                if (imageUrl) {
                    const range =
                        quillRef.current.getSelection();
                    quillRef.current.insertEmbed(
                        range.index,
                        'image',
                        imageUrl
                    );
                }
            }
        };
    };

    const uploadImageToS3 = async (file) => {
        const formData = new FormData();
        formData.append('img', file);

        try {
            const response = await fetch('/api/upload', {
                // Update the URL based on your API route
                method: 'POST',
                body: formData,
            });

            const result = await response.json();
            if (response.ok) {
                return result.url; // Assuming your backend returns the image URL
            } else {
                console.error(
                    'Error uploading image:',
                    result.message
                );
                return null;
            }
        } catch (error) {
            console.error('Error uploading image:', error);
            return null;
        }
    };

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
