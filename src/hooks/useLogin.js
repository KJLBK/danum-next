// /src/hooks/useLogin.js
import { useMutation } from '@tanstack/react-query';
import { login } from '../service/authService';
import { setAccessToken } from '../service/tokenService';
import { useAuthStore } from '../store/authStore';
import {
    useRouter,
    useSearchParams,
} from 'next/navigation';
import { jwtDecode } from 'jwt-decode';

export function useLogin() {
    const { setAuth } = useAuthStore();
    const router = useRouter();
    const searchParams = useSearchParams();

    const redirectPath = searchParams.get('from') || '/';

    return useMutation({
        mutationFn: ({ email, password }) =>
            login(email, password), // 최신 문법에 맞게 수정
        onSuccess: (accessToken) => {
            setAccessToken(accessToken);
            console.log(accessToken);

            try {
                const user = jwtDecode(accessToken);
                const expiration = new Date(
                    user.exp * 1000
                ).toLocaleString();
                setAuth(
                    user.sub,
                    user.role[0].authority,
                    expiration
                );

                router.push(redirectPath);
            } catch (error) {
                console.error('JWT 디코딩 오류:', error);
            }
        },
        onError: (error) => {
            console.error('로그인 실패:', error);
        },
    });
}
