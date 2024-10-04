import { jwtDecode } from 'jwt-decode';
import {
    getAccessToken,
    removeAccessToken,
    setAccessToken,
} from './tokenService';

export async function login(email, password) {
    try {
        /* 
            Endpoint : '/member/login'
            HTTP Method : POST
            Function : login
            Parameters : 
                RequestBody: LoginDto(email: String, 
                    password: String)
        */
        const res = await fetch(
            '/danum-backend/member/login',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            }
        );

        if (!res.ok) {
            throw new Error('Login failed');
        }
        const accessToken = await res.text();

        // Access Token을 localStorage 저장
        setAccessToken(accessToken);

        // JWT에서 사용자 정보 추출
        const user = jwtDecode(accessToken);
        return { user }; // JWT 토큰과 디코딩된 사용자 정보 반환
    } catch (err) {
        throw new Error(err.message);
    }
}

// 로그아웃 로직

export async function logout(clearAuth) {
    try {
        clearAuth();
        removeAccessToken();
        await fetch('/danum-backend/logout', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${getAccessToken()}`,
            },
        });
    } catch (err) {
        throw new Error(err.message);
    }
}

// 회원가입 로직
export async function join(
    email,
    password,
    phone,
    name,
    latitude,
    longitude,
    profileImageUrl
) {
    let res;

    try {
        res = await fetch('/danum-backend/member/join', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email,
                password,
                phone,
                name,
                latitude: latitude, // 위도 double
                longitude: longitude, // 경도 double
                profileImageUrl,
            }),
        });
        if (!res.ok) {
            throw new Error('Join failed');
        }
    } catch (err) {
        throw new Error(err.message);
    }

    return await res.json();
}

/**
 * AccessToken 검증(FrontServer)
 * URL: POST /auth/check-expiration
 * 설명: accessToken 헤더에 집어넣어서 유효한지 확인합니다.
 * 인증: 필요
 * 응답: is???= false 라고 뜨면 200
 */

export async function verifyAccessToken(accessToken) {
    try {
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_BASE_URL}/auth/check-expiration`,
            {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json',
                    Authorization: `Bearer ${accessToken}`,
                },
            }
        );

        if (!res.ok) {
            throw new Error(
                `HTTP error! status: ${res.status}`
            );
        }
        const data = await res.json();

        return data;
    } catch (error) {
        throw new Error(error.message);
    }
}

// Test 로직(FrontServer)
export async function checkAuth(RefreshToken) {
    try {
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_BASE_URL}/auth/refresh`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${RefreshToken}`,
                },
            }
        );
        const data = await res.text(); // 한번만 호출

        return data;
    } catch (error) {
        throw new Error(error.message);
    }
}
