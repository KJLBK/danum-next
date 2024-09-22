export default function ChatMessageList({
    messages,
    currentUser,
}) {
    return (
        <>
            {messages.map((msg, index) => (
                <div key={index}>
                    {/* sender에 대한 classname 에외처리 내용 생략 */}
                    <div>
                        <p>{msg.sender}</p>
                        <p>{msg.message}</p>
                    </div>
                </div>
            ))}
        </>
    );
}
