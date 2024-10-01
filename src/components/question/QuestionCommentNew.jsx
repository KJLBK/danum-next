import { useState } from 'react';
import { questionCommentNew } from '../../service/questionService';
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
        <div>
            <h2>댓글 쓰기</h2>
            <form onSubmit={onSubmit}>
                <div>
                    <label htmlFor='content'>내용</label>
                    <textarea
                        id='content'
                        name='content'
                        value={formData.content}
                        onChange={onChangeData}
                        required
                    />
                </div>
                <button type='submit'>작성</button>
            </form>
        </div>
    );
}
