'use client';

import { useState, useRef, useEffect } from 'react';
import { questionNew } from '../../../service/questionService';
import { useRouter } from 'next/navigation';
import { jwtDecode } from 'jwt-decode'; // Corrected jwtDecode import
import styles from './page.module.css'; // Importing the CSS file

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

    // Fetch JWT token from local storage and decode it
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
    }, []); // Only run when the component mounts

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
                router.push('/questions'); // Redirect after submission
            }
        } catch (err) {
            console.error('Submission error:', err);
        }
    };

    return (
        <div className={styles.container}>
            <form
                onSubmit={onSubmit}
                className={styles.form}
            >
                <div className={styles['form-row']}>
                    <input
                        type='text'
                        id='title'
                        name='title'
                        placeholder='제목을 적어주세요.'
                        value={formData.title}
                        onChange={onChangeData}
                        required
                        className={styles.input}
                    />
                    <button
                        type='submit'
                        className={styles.button}
                    >
                        작성
                    </button>
                </div>
                <div className={styles.ToastEditor}>
                    {ToastEditor && (
                        <ToastEditor
                            ref={editorRef}
                            initialContent={
                                formData.content
                            }
                        />
                    )}
                </div>
            </form>
        </div>
    );
}
