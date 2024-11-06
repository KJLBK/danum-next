'use client';

import dynamic from 'next/dynamic';
import { useEffect, useRef } from 'react';
import style from './QuillViewer.module.css';

const Quill = dynamic(() => import('quill'), {
    ssr: false,
});

export default function QuillViewer({ content }) {
    const editorRef = useRef(null);

    useEffect(() => {
        if (!editorRef.current) return;

        async function initQuill() {
            const QuillInstance = (await import('quill'))
                .default;
            const quill = new QuillInstance(
                editorRef.current,
                {
                    theme: 'snow',
                    readOnly: true,
                    modules: {
                        toolbar: false,
                    },
                },
            );

            if (content) {
                // \n\n을 <p> 태그로 변환
                const formattedContent = content
                    .split('\n\n')
                    .map(
                        (paragraph) =>
                            `<p>${paragraph}</p>`,
                    )
                    .join('');

                quill.clipboard.dangerouslyPasteHTML(
                    formattedContent,
                );
            }
        }

        initQuill();
    }, [content]);

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
