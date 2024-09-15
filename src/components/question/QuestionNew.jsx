'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import questionNew from '../../service/question/questionNew';
export default function QuestionNew() {
  const [formData, setFormData] = useState({
    email: '',
    title: '',
    content: '',
    createId: '',
  });

  const router = useRouter();

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
      const response = await questionNew(formData);
      setFormData({
        email: '',
        title: '',
        content: '',
        createId: '',
      });
      router.push('/');
    } catch (err) {
      console.log(err);
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
          <label className='content'>내용</label>
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
