// components/common/CommentNew.jsx
import { useState } from 'react';
import style from './CommentNew.module.css';

export default function CommentNew({
    postId,
    email,
    onSubmitComment,
    type, // 'question' or 'village'
}) {
    const [formData, setFormData] = useState({
        [type === 'question'
            ? 'question_id'
            : 'village_id']: postId,
        member_email: email,
        content: '',
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
            console.log(formData, email);
            await onSubmitComment(formData);
            setFormData({
                [type === 'question'
                    ? 'question_id'
                    : 'village_id']: postId,
                member_email: formData.member_email,
                content: '',
            });
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <form onSubmit={onSubmit} className={style.form}>
            <input
                className={style.input}
                id="content"
                name="content"
                value={formData.content}
                onChange={onChangeData}
                placeholder={`${type === 'question' ? '질문' : '마을'}에 댓글을 작성하세요`}
                required
            />
            <button className={style.button} type="submit">
                작성
            </button>
        </form>
    );
}
