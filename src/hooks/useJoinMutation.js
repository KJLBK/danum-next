import { useMutation } from '@tanstack/react-query';
import { join } from '../service/authService';

export function useJoinMutation() {
    return useMutation((userData) => join(userData));
}
