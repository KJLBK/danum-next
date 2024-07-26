type Props = {
    params: {
        qId: string;
    };
};

export default function QuestionsViewPage({
    params,
}: Props) {
    const viewId = params.qId;
    console.log(viewId);
    return (
        <>
            <p>/questions/[question_id] page</p>
            <h1>{viewId}</h1>
        </>
    );
}
