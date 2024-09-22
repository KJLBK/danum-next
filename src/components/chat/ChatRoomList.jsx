'use client'; // ?
import Link from 'next/link';

export default function ChatRoomList({ rooms }) {
    return (
        <ul>
            {rooms.map((room) => (
                <li key={room.roomId}>
                    <Link href={`/chat/${room.roomId}`}>
                        {room.name}
                    </Link>
                </li>
            ))}
        </ul>
    );
}
