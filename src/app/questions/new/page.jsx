'use client';

import ToastEditor from '../../../components/question/ToastEditor';
import { useState, useRef, useEffect } from 'react';
import { questionNew } from '../../../service/questionService';
import { useRouter } from 'next/navigation';

export default function QuestionNewPage() {
    const [formData, setFormData] = useState({
        email: '',
        title: '',
        content: '',
        createId: '',
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const router = useRouter();
    const editorRef = useRef();

    const onChangeData = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const onSubmit = (e) => {
        e.preventDefault();
        setIsSubmitting(true);
    };

    useEffect(() => {
        const submitForm = async () => {
            if (isSubmitting) {
                // Check if the code is running in the browser
                if (typeof window !== 'undefined') {
                    try {
                        // Check if editorRef is defined
                        if (editorRef.current) {
                            const content =
                                editorRef.current.getContent();
                            await questionNew({
                                ...formData,
                                content,
                            });
                            setFormData({
                                email: '',
                                title: '',
                                content: '',
                                createId: '',
                            });
                            router.push('/questions');
                        }
                    } catch (err) {
                        console.error(
                            'Submission error:',
                            err
                        );
                    } finally {
                        setIsSubmitting(false); // Reset the submitting state
                    }
                }
            }
        };

        submitForm();
    }, [isSubmitting, formData, router]); // Dependencies to trigger the effect

    return (
        <div>
            <h2>Create a New Question</h2>
            <form onSubmit={onSubmit}>
                <div>
                    <label htmlFor='email'>Email</label>
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
                    <label htmlFor='title'>Title</label>
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
                    <label htmlFor='content'>Content</label>
                    <ToastEditor
                        ref={editorRef}
                        initialContent={formData.content} // Set initial content
                    />
                </div>
                <button type='submit'>Submit</button>
            </form>
        </div>
    );
}
