'use client';

import { Suspense } from 'react';
import LoginForm from '../../components/auth/LoginForm';

export default function LoginPage() {
    return (
        <>
            <p>Login</p>
            <Suspense fallback={<div>Loading...</div>}>
                <LoginForm />
            </Suspense>
        </>
    );
}
