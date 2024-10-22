// /hooks/useChatQueries.js
import { useQuery } from '@tanstack/react-query';
import {
    getAllChatRooms,
    getChatRoomInfo,
    getRecentMessages,
    enterChatRoom,
    getChatMessages,
} from '../services/chatService';

export function useChatRooms() {
    return useQuery({
        queryKey: ['chatRooms'],
        queryFn: getAllChatRooms,
        staleTime: 1000 * 60 * 5,
        onError: (error) => {
            console.error(
                '채팅방 목록 조회 실패:',
                error.message,
            );
        },
    });
}

export function useChatRoomInfo(roomId) {
    return useQuery({
        queryKey: ['chatRoom', roomId],
        queryFn: () => getChatRoomInfo(roomId),
        enabled: !!roomId,
        onError: (error) => {
            console.error(
                '채팅방 정보 조회 실패:',
                error.message,
            );
        },
    });
}

export function useRecentMessages() {
    return useQuery({
        queryKey: ['recentMessages'],
        queryFn: getRecentMessages,
        onError: (error) => {
            console.error(
                '최근 메시지 조회 실패:',
                error.message,
            );
        },
    });
}

export function useEnterChatRoom(roomId) {
    return useQuery({
        queryKey: ['enterChatRoom', roomId],
        queryFn: () => enterChatRoom(roomId),
        enabled: !!roomId,
        onError: (error) => {
            console.error(
                '채팅방 입장 실패:',
                error.message,
            );
        },
    });
}

export function useChatMessages(roomId) {
    return useQuery({
        queryKey: ['chatMessages', roomId],
        queryFn: () => getChatMessages(roomId),
        enabled: !!roomId,
        onError: (error) => {
            console.error(
                '채팅방 메시지 조회 실패:',
                error.message,
            );
        },
    });
}
