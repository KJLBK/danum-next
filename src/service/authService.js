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

        const { token } = await res.json();

        // Access Token을 HttpOnly 쿠키에 저장 (클라이언트 측에서 접근 불가)
        document.cookie = `accessToken=${token}; HttpOnly; Secure; SameSite=Strict; Path=/`;

        // JWT에서 사용자 정보 추출
        const user = jwtDecode(token);

        return { token, user }; // JWT 토큰과 디코딩된 사용자 정보 반환
    } catch (err) {
        throw new Error(err.message);
    }
}
