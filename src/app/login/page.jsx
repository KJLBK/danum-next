'use client';

import { useEffect } from 'react';
import LoginForm from '../../components/auth/LoginForm';
import { useAuthStore } from '../../store/authStore';
import {
    useRouter,
    useSearchParams,
} from 'next/navigation';

export default function LoginPage() {
    const user = useAuthStore((state) => state.user);
    const router = useRouter();
    const searchParams = useSearchParams();
    const redirect = searchParams.get('redirect') || '/';

    useEffect(() => {
        if (user) {
            router.push(redirect);
        }
    }, [user, router, redirect]);

    return (
        <>
            <p>Login</p>

            <LoginForm redirect={redirect} />
        </>
    );
}
