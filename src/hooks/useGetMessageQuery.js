import { useQuery } from '@tanstack/react-query';
import { getChatMessages } from '../service/chatService';

export function useGetMessageQuery(roomID) {
    return useQuery(['messages', roomID], () =>
        getChatMessages(roomID)
    );
}
