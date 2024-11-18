'use client';

import { useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '../../../stores/authStore';
import QuillEditor from '../../../components/board/new/QuillEditor';
import { villageNew } from '../../../services/villageService';
import style from './page.module.css';

export default function VillagePostingPage() {
    const { email } = useAuthStore();
    const editorRef = useRef();
    const router = useRouter();

    const [formData, setFormData] = useState({
        email: '',
        title: '',
        content: '',
        postType: '',
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
        <form onSubmit={onSubmit}>
            <div className={style.v_posting_page}>
                {/* 드롭다운 추가 */}
                <div className={style.dropdown_area}>
                    <select
                        id="postType"
                        name="postType"
                        value={formData.postType}
                        onChange={onChangeData}
                        required
                    >
                        <option value="" disabled>
                            게시글 유형 선택
                        </option>
                        <option value="DAILY">
                            일상 게시글
                        </option>
                        <option value="QUESTION">
                            질문 게시글
                        </option>
                    </select>
                </div>

                <div className={style.search_area}>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        value={formData.title}
                        onChange={onChangeData}
                        placeholder="제목을 입력하세요."
                        required
                    />
                </div>

                <div>
                    <QuillEditor ref={editorRef} />
                </div>

                <div
                    className={style.v_posting_submit_back}
                >
                    <div
                        className={
                            style.v_posting_submit_footer
                        }
                    >
                        {/* 버튼 비활성화 로직 추가 */}
                        <button
                            type="submit"
                            disabled={!formData.postType}
                        >
                            작성
                        </button>
                    </div>
                </div>
            </div>
        </form>
    );
}
