// /hooks/useChatMutations.js
import {
    useMutation,
    useQueryClient,
} from '@tanstack/react-query';
import {
    createGroupChat,
    createPrivateChat,
} from '../services/chatService';

export function useCreateGroupChat() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: createGroupChat,
        onSuccess: (data) => {
            console.log('채팅방 생성 성공:', data);
            queryClient.invalidateQueries(['chatRooms']);
        },
        onError: (error) => {
            console.error(
                '채팅방 생성 실패:',
                error.message,
            );
        },
    });
}

export function useCreatePrivateChat() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: createPrivateChat,
        onSuccess: (data) => {
            console.log('1:1 채팅방 생성 성공:', data);
            queryClient.invalidateQueries(['chatRooms']);
        },
        onError: (error) => {
            console.error(
                '1:1 채팅방 생성 실패:',
                error.message,
            );
        },
    });
}
