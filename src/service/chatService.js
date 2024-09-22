// fetch service code
// /chat/rooms

export async function fetchChatRooms() {
    const accessToken = localStorage.getItem('accessToken');
    const res = await fetch('/api/chat/rooms', {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
        },
    });
    console.log(res);
    if (!res.ok) {
        throw new Error('Failed to fetch chat rooms');
    }
    return res.json();
}

// /chat/room
export async function createChatRoom(name) {
    const accessToken = localStorage.getItem('accessToken');
    const res = await fetch('/api/chat/room', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(name),
    });

    if (!res.ok) {
        throw new Error('Failed to create chat room');
    }
    return res.json();
}

// chat/room/${roomId}
export async function fetchRoomInfo(roomId) {
    const accessToken = localStorage.getItem('accessToken');
    const res = await fetch(`/api/chat/room/${roomId}`, {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
        },
    });
    console.log('chatService.js:46', res);

    if (!res.ok) {
        throw new Error('Failed to fetch room info');
    }
    return res.json();
}
