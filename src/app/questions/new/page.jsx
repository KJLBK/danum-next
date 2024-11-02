'use client';
import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { jwtDecode } from 'jwt-decode';
import { questionNew } from '../../../services/questionService';
import style from './page.module.css';
import { getAccessToken } from '../../../services/tokenService';
import QuillEditor from '../../../components/board/QuillEditor';
export default function QuestionNewPage() {
    const [formData, setFormData] = useState({
        email: '',
        title: '',
        content: '',
        createId: '',
    });

    const router = useRouter();
    const editorRef = useRef();

    const onChangeData = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    useEffect(() => {
        const token = getAccessToken();
        if (token) {
            const decoded = jwtDecode(token);
            setFormData((prevData) => ({
                ...prevData,
                email: decoded.sub,
            }));
        }
    }, []);

    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editorRef.current) {
                const editorContent =
                    editorRef.current.getContent();
                const updatedFormData = {
                    ...formData,
                    content: editorContent,
                };

                await questionNew(updatedFormData);
                router.push('/questions');
            }
        } catch (err) {
            console.error('Submission error:', err);
        }
    };

    return (
        <div>
            <h2>글쓰기 페이지</h2>
            <form onSubmit={onSubmit}>
                <div className={style.formRow}>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        value={formData.title}
                        onChange={onChangeData}
                        required
                        className={style.input}
                    />
                    <button
                        type="submit"
                        className={style.button}
                    >
                        작성
                    </button>
                </div>
                <div>
                    <QuillEditor ref={editorRef} />
                </div>
            </form>
        </div>
    );
}
