export default function QuestionsViewPage({ params }) {
  console.log(params);
  const viewId = params.questionId;
  return (
    <>
      <p>/questions/ page</p>
      <h1>{viewId}</h1>
    </>
  );
}
