import { jwtDecode } from 'jwt-decode';

export default async function login(email, password) {
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
            throw new Error('Login failed');
        }

        // Access Token을 localStorage 저장
        const token = await res.text();
        localStorage.setItem('accessToken', token);

        // JWT에서 사용자 정보 추출
        const user = jwtDecode(token);
        return { user }; // JWT 토큰과 디코딩된 사용자 정보 반환
    } catch (err) {
        throw new Error(err.message);
    }
}

// 로그아웃 로직

// Test 로직
export async function checkAuth(RefreshToken) {
    try {
        const res = await fetch('/api/auth/refresh', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${RefreshToken}`,
            },
        });
        const accessToken = await res.text();
        localStorage.setItem('accessToken', accessToken);
        console.log(jwtDecode(accessToken));
    } catch (error) {
        throw new Error(error.message);
    }
}
