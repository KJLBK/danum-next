export default function ChatPage({ params }) {
    const name = params.roomId;
    return (
        <>
            <p>/chat/[roomId] page</p>
            <h1>{name}</h1>
        </>
    );
}
