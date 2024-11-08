'use client';

import { useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '../../../stores/authStore';
import QuillEditor from '../../../components/board/new/QuillEditor';
import { villageNew } from '../../../services/villageService';

export default function VillagePostingPage() {
    const { email } = useAuthStore();
    const editorRef = useRef();
    const router = useRouter();

    const [formData, setFormData] = useState({
        email: '',
        title: '',
        content: '',
        postType: 'DAILY',
    });

    const onChangeData = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editorRef.current) {
                const editorContent =
                    editorRef.current.getContent();
                const updatedFormData = {
                    ...formData,
                    email: email,
                    content: editorContent,
                };

                await villageNew(updatedFormData);
                router.push('/villages');
            }
        } catch (err) {
            console.error('Submission error:', err);
        }
    };
    return (
        <div>
            <h2>동네 글쓰기 페이지</h2>
            <form onSubmit={onSubmit}>
                <div>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        value={formData.title}
                        onChange={onChangeData}
                        required
                    />
                    <button type="submit">작성</button>
                </div>
                <fieldset>
                    <legend>카테고리</legend>
                    <div>
                        <label>
                            <input
                                type="radio"
                                id="DAILY"
                                value="DAILY"
                                name="postType"
                                onChange={onChangeData}
                                checked={
                                    formData.postType ===
                                    'DAILY'
                                }
                            />
                            일상 게시글
                        </label>
                    </div>
                    <div>
                        <label>
                            <input
                                type="radio"
                                id="QUESTION"
                                value="QUESTION"
                                name="postType"
                                onChange={onChangeData}
                                checked={
                                    formData.postType ===
                                    'QUESTION'
                                }
                            />
                            질문 게시글
                        </label>
                    </div>
                </fieldset>
                <div>
                    <QuillEditor ref={editorRef} />
                </div>
            </form>
        </div>
    );
}
