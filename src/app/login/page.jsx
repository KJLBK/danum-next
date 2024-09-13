'use client';

import { useEffect } from 'react';
import LoginForm from '../../components/auth/LoginForm';
import { useAuthStore } from '../../store/authStore';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
    const { user } = useAuthStore();
    const router = useRouter();
    // const searchParams = useSearchParams();
    // const redirect = searchParams.get('redirect') || '/';

    useEffect(() => {
        if (user) {
            // router.push(redirect);
            router.push('/');
        }
    }, [user, router]);

    return (
        <>
            <p>Login</p>

            <LoginForm />
        </>
    );
}
