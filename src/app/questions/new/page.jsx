"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
export default function QuestionPostingPage() {
  const [formData, setFormData] = useState({
    title: "",
    content: "",
  });

  const router = useRouter();

  const onChangeData = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault(); // 새로고침 방지
    console.log("Form Data", formData);
    router.push("/");
  };

  return (
    <div>
      <h2>글쓰기 페이지</h2>
      <form onSubmit={onSubmit}>
        <div>
          <label className="title">제목</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={onChangeData}
            required
          />
        </div>
        <div>
          <label className="content">내용</label>
          <textarea
            id="content"
            name="content"
            value={formData.content}
            onChange={onChangeData}
            required
          />
        </div>
        <button type="submit">작성</button>
      </form>
    </div>
  );
}
