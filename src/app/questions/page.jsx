export default async function QuestionPage() {
  const token =
    "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhQGEiLCJyb2xlIjpbeyJhdXRob3JpdHkiOiJBRE1JTiJ9XSwiZXhwIjoyMDE2MjYyMzYyfQ.sUoNzSqQtO7A6eAOkUbCb4_lPL96i8xkIHyvI3X6TfU";

  let posts = [];

  try {
    let data = await fetch("http://43.203.8.51:8080/board/question/show", {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    posts = await data.json();
  } catch (error) {
    console.error("Error fetching data", error);
  }
  return (
    <>
      <h2>질문 이야기</h2>
      <ul>
        {posts.map((item) => (
          <li key={item.question_id}>
            <h2>제목:{item.title}</h2>
            <p>내용:{item.content}</p>
            <p>작성자: {item.email}</p>
            <p>작성 시간: {item.created_at}</p>
            <hr />
          </li>
        ))}
      </ul>
    </>
  );
}
