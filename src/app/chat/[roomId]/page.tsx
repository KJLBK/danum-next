type Props = {
    params: {
        roomId: string;
    };
};

export default function ChatPage({ params }: Props) {
    const name = params.roomId;
    return (
        <>
            <p>/chat/[roomId] page</p>
            <h1>{name}</h1>
        </>
    );
}
