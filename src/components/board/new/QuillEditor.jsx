'use client';

import React, {
    useEffect,
    useRef,
    forwardRef,
    useImperativeHandle,
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
