export default async function questionNew({ email, title, content, createId }) {
  const token =
    "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhQGEiLCJyb2xlIjpbeyJhdXRob3JpdHkiOiJBRE1JTiJ9XSwiZXhwIjoyMDE2MjYyMzYyfQ.sUoNzSqQtO7A6eAOkUbCb4_lPL96i8xkIHyvI3X6TfU";

  try {
    const response = await fetch("/api/board/question/new", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, title, content, createId }),
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }
    alert("생성 완료");
    return response;
  } catch (error) {
    console.error("Error fetching data", error);
    return [];
  }
}
