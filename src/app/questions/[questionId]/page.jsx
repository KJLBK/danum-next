export default function QuestionsViewPage({ params }) {
    const viewId = params.qId;
    console.log(viewId);
    return (
        <>
            <p>/questions/[question_id] page</p>
            <h1>{viewId}</h1>
        </>
    );
}
