// /src/hooks/useLogin.js
import { useMutation } from '@tanstack/react-query';
import { login } from '../services/authService';
import { setAccessToken } from '../services/tokenService';
import { useAuthStore } from '../stores/authStore';
import {
    useRouter,
    useSearchParams,
} from 'next/navigation';

export function useLogin() {
    const { setAuthState } = useAuthStore();
    const router = useRouter();
    const searchParams = useSearchParams();

    const redirectPath = searchParams.get('from') || '/';

    return useMutation({
        mutationFn: ({ email, password }) =>
            login(email, password), // 최신 문법에 맞게 수정
        onSuccess: async (accessToken) => {
            setAccessToken(accessToken);
            await setAuthState();
            router.push(redirectPath);
        },
        onError: (error) => {
            console.error('로그인 실패:', error);
        },
    });
}
