'use client';
import React, {
    useEffect,
    useRef,
    forwardRef,
    useImperativeHandle, // 부모 컴포넌트에서 content를 가져오기 위함
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
    const [previewImages, setPreviewImages] = useState([]); // 이미지 미리보기를 위한 상태
    useImperativeHandle(ref, () => ({
        getContent: () => {
            if (quillRef.current) {
                return quillRef.current.root.innerHTML; // 텍스트와 이미지 URL 포함한 HTML 반환
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

                // 이미지 버튼에 핸들러 추가
                quillRef.current
                    .getModule('toolbar')
                    .addHandler('image', imageHandler);
            }
        }

        initQuill();
    }, []);

    // 이미지 업로드 핸들러
    const imageHandler = async () => {
        const input = document.createElement('input');
        input.setAttribute('type', 'file');
        input.setAttribute('accept', 'image/*');
        input.click();

        input.onchange = async () => {
            const file = input.files[0];
            if (file) {
                const { url } = await uploadImageToS3(file); // 이미지 업로드 후 URL 획득
                if (url) {
                    const range =
                        quillRef.current.getSelection();
                    quillRef.current.insertEmbed(
                        range.index,
                        'image',
                        url
                    ); // 에디터에 이미지 삽입
                    // 삽입된 이미지 크기 조절
                    const img =
                        quillRef.current.root.querySelector(
                            `img[src="${url}"]`
                        );
                    if (img) {
                        img.style.width = '300px'; // 너비를 100%로 조정 (또는 원하는 값)
                        img.style.height = 'auto'; // 비율을 유지하면서 높이 조정
                    }
                    // 미리보기 이미지 상태 업데이트
                    setPreviewImages((prev) => [
                        ...prev,
                        { url },
                    ]);
                }
            }
        };
    };

    // S3에 이미지 업로드
    const uploadImageToS3 = async (file) => {
        const formData = new FormData();
        formData.append('img', file);

        try {
            const response = await fetch('/api/upload', {
                method: 'POST',
                body: formData,
            });

            const result = await response.json();
            if (response.ok) {
                return { url: result.url }; // 이미지 URL 반환
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

QuillEditor.displayName = 'QuillEditor';

export default QuillEditor;
