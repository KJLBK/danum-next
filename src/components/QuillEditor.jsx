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
    const [previewImages, setPreviewImages] = useState([]); // State to hold image URLs for preview

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
                const { url, key } =
                    await uploadImageToS3(file);
                if (url) {
                    const range =
                        quillRef.current.getSelection();
                    quillRef.current.insertEmbed(
                        range.index,
                        'image',
                        url
                    );

                    // Add the uploaded image's key and URL to the previewImages state
                    setPreviewImages((prev) => [
                        ...prev,
                        { key, url },
                    ]);
                }
            }
        };
    };

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
                return { url: result.url, key: result.key }; // Return both the image URL and key
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

    // Method to retrieve content and text
    useImperativeHandle(ref, () => ({
        getContent: () => {
            if (quillRef.current) {
                return quillRef.current.root.innerHTML;
            }
            return '';
        },
        getText: () => {
            if (quillRef.current) {
                return quillRef.current.getText();
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

QuillEditor.displayName = 'QuillEditor';

export default QuillEditor;
