import { useMutation } from '@tanstack/react-query';
import { login } from '../service/authService';

export function useLoginMutation() {
    return useMutation(({ email, password }) =>
        login(email, password)
    );
}
