'use client';

import { useState, useRef, useEffect } from 'react';
import { questionNew } from '../../../service/questionService';
import { useRouter } from 'next/navigation';
import { jwtDecode } from 'jwt-decode'; // jwtDecode를 올바르게 import
import styles from './page.module.css'; // CSS 파일 import

export default function QuestionNewPage() {
    const [formData, setFormData] = useState({
        email: '',
        title: '',
        content: '',
        createId: '',
    });
    const [ToastEditor, setToastEditor] = useState(null);
    const router = useRouter();
    const editorRef = useRef();

    useEffect(() => {
        import(
            '../../../components/question/ToastEditor'
        ).then((module) => {
            setToastEditor(() => module.default);
        });
    }, []);

    // 로컬 스토리지에서 JWT 토큰을 가져와 디코딩하는 useEffect
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
    }, []); // 컴포넌트가 로드될 때 한 번 실행

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
        <div className={styles.container}>
            <h2>글쓰기 페이지</h2>
            <form onSubmit={onSubmit}>
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
                    {ToastEditor && (
                        <ToastEditor
                            ref={editorRef}
                            initialContent={
                                formData.content
                            }
                        />
                    )}
                </div>
                <button type='submit'>작성</button>
            </form>
        </div>
    );
}
