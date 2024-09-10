export default async function QuestionPage() {
  const token =
    "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhQGEiLCJyb2xlIjpbeyJhdXRob3JpdHkiOiJBRE1JTiJ9XSwiZXhwIjoyMDE2MjYyMzYyfQ.sUoNzSqQtO7A6eAOkUbCb4_lPL96i8xkIHyvI3X6TfU";

  let data = await fetch("/api/board/question/show", {
    method: "GET",
    headers: { Authorization: `Bearer ${token}` },
  });
  let posts = await data.json();
  return (
    <>
      <h2>질문 이야기</h2>
      <ul>
        {posts.map((item) => (
          <li key={item.id}>
            <h2>{item.title}</h2>
            <p>{item.content}</p>
            <p>작성자: {item.email}</p>
            <p>작성 시간: {item.time}</p>
            <hr />
          </li>
        ))}
      </ul>
    </>
  );
}
