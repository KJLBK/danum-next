import { useState } from 'react';
import Input from '../common/Input';
import Button from '../common/Button';

export default function ChatInput({ onSendMessage }) {
    const [message, setMessage] = useState('');
    const handleSubmit = (e) => {
        e.preventDefault();
        if (message.trim()) {
            onSendMessage(message);
            setMessage('');
        }
    };
    return (
        <>
            <form onSubmit={handleSubmit}>
                <Input
                    type="text"
                    value={message}
                    onChange={(e) =>
                        setMessage(e.target.value)
                    }
                    placeholder="메시지를 입력하세요."
                />
                <Button type="submit">전송</Button>
            </form>
        </>
    );
}
