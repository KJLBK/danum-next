// src/app/api/auth/login/route.js

import { jwtDecode } from 'jwt-decode';
import { NextResponse } from 'next/server';
import useAuthStore from '../../../store/authStore';
import { useRouter } from 'next/router';

export async function POST(req) {
    const { email, password } = await req.json();
    const setUser = useAuthStore((state) => state.setUser);
    const router = useRouter();

    try {
        /* 
            Endpoint : '/member/login'
            HTTP Method : POST
            Function : login
            Parameters : 
                RequestBody: LoginDto(email: String, 
                    password: String)
        */
        const res = await fetch('/api/member/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
        });
        if (!res.ok) {
            throw new Error('Failed to Login');
        } else {
            // res.json에서 어떤 token 명인지 명확히 모르겠음. 확인해보고 이름 수정할 것.
            console.log(res.json);
            const { token } = await res.json();

            // Access Token 을 쿠키에 저장
            document.cookie = `accessToken=${token}; HttpOnly; Secure; SameSite=Strict; Path=/`;

            const decoded = jwtDecode(token);
            setUser(decoded);

            router.push('/');
        }
    } catch (err) {
        return NextResponse.json(
            { error: err.message },
            { status: 500 }
        );
    }
}
