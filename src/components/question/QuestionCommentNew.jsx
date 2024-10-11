import { useState } from 'react';
import { questionCommentNew } from '../../services/questionService';
import style from './QuestionCommentNew.module.css';

export default function QuestionCommentNew({
    questionId,
    email,
}) {
    const [formData, setFormData] = useState({
        question_id: questionId, // 고정된 question_id
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
        e.preventDefault(); // 새로고침 방지
        try {
            const response =
                await questionCommentNew(formData);
            setFormData({
                question_id: questionId,
                member_email: formData.member_email, // 이메일 유지
                content: '', // 내용 초기화
            });
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <>
            <form
                onSubmit={onSubmit}
                className={style.form}
            >
                <input
                    className={style.input}
                    id="content"
                    name="content"
                    value={formData.content}
                    onChange={onChangeData}
                    required
                />
                <button
                    className={style.button}
                    type="submit"
                >
                    작성
                </button>
            </form>
        </>
    );
}
