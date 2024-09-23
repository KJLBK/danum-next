'use client';

import ToastEditor from '../../../components/question/ToastEditor';
import { useState, useRef } from 'react';
import { questionNew } from '../../../service/questionService';
import { useRouter } from 'next/navigation';

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
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            // Check if editorRef is defined
            if (editorRef.current) {
                const content =
                    editorRef.current.getContent();
                await questionNew({ ...formData, content });
                setFormData({
                    email: '',
                    title: '',
                    content: '',
                    createId: '',
                });
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
                <div>
                    <label htmlFor='email'>이메일</label>
                    <input
                        type='email'
                        id='email'
                        name='email'
                        value={formData.email}
                        onChange={onChangeData}
                        required
                    />
                </div>
                <div>
                    <label htmlFor='title'>제목</label>
                    <input
                        type='text'
                        id='title'
                        name='title'
                        value={formData.title}
                        onChange={onChangeData}
                        required
                    />
                </div>
                <div>
                    <label htmlFor='content'>내용</label>
                    <ToastEditor
                        ref={editorRef}
                        initialContent={formData.content} // 초기 콘텐츠 설정
                    />
                </div>
                <button type='submit'>작성</button>
            </form>
        </div>
    );
}
