'use client';
import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { jwtDecode } from 'jwt-decode';
import { questionNew } from '../../service/questionService';
import QuillEditor from '../QuillEditor';

export default function QuestionNew() {
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
        const token = localStorage.getItem('accessToken');
        if (token) {
            const decoded = jwtDecode(token);
            setFormData((prevData) => ({
                ...prevData,
                email: decoded.sub,
            }));
            console.log(decoded.sub);
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
                <div>
                    <label className='email'>이메일</label>
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
                    <label className='title'>제목</label>
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
                    <QuillEditor ref={editorRef} />
                </div>
                <button type='submit'>작성</button>
            </form>
        </div>
    );
}
