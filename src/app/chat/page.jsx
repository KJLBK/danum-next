'use client';

import { useEffect, useState } from 'react';
import { fetchChatRooms } from '../../service/chatService';
import ChatRoomList from '../../components/chat/ChatRoomList';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';

// ChatPage - 채팅룸 만드는 페이지?
export default function ChatPage() {
    const [rooms, setRooms] = useState([]);
    const [newRoomName, setNewRoomName] = useState('');

    useEffect(() => {
        loadRooms();
    });

    // error
    const loadRooms = async () => {
        try {
            const fetchedRooms = await fetchChatRooms();
            console.log(fetchedRooms);
            setRooms(fetchedRooms);
        } catch (error) {
            console.error(
                'Failed to fetch chat rooms(/chat/page.jsx-loadRooms)',
                error
            );
        }
    };

    const handleCreateRoom = async (e) => {
        e.preventDefault();
        if (!newRoomName.trim()) return;
        try {
            const newRoom =
                await createChatRoom(newRoomName);
            setRooms([...rooms, newRoom]);
            setNewRoomName('');
        } catch (error) {
            console.error(
                'Failed to create chat room(/chat/page.jsx-handleCreateRoom)',
                error
            );
        }
    };

    return (
        <>
            <form onSubmit={handleCreateRoom}>
                <Input
                    type="text"
                    value={newRoomName}
                    onChange={(e) =>
                        setNewRoomName(e.target.value)
                    }
                    placeholder="New Room Name"
                />
                <Button type="submit">Create Room</Button>
                <ChatRoomList rooms={rooms} />
            </form>
        </>
    );
}
