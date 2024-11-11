import {
    getAccessToken,
    removeAccessToken,
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
            },
        );

        if (!res.ok) {
            throw new Error('Login failed');
        }
        return await res.text();
    } catch (err) {
        throw new Error(err.message);
    }
}

// 로그아웃 로직

export async function logout(clearAuth) {
    try {
        clearAuth();
        await fetch('/danum-backend/logout', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${getAccessToken()}`,
            },
        });
        removeAccessToken();
    } catch {
        console.log('로그아웃');
    }
}

// 회원가입 로직
export async function join(formData) {
    const res = await fetch('/danum-backend/member/join', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
    });
    if (!res.ok) {
        throw new Error('회원가입에 실패했습니다.');
    }
    return res.json();
}

/**
 * AccessToken 검증(Client)
 * URL: POST /auth/check-expiration
 * 설명: accessToken 헤더에 집어넣어서 유효한지 확인합니다.
 * 인증: 필요
 * 응답: is???= false 라고 뜨면 200
 */

export async function verifyATokenToClient(accessToken) {
    try {
        const res = await fetch(
            `/danum-backend/auth/check-expiration`,
            {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json',
                    Authorization: `Bearer ${accessToken}`,
                },
            },
        );

        const data = await res.json();
        console.log('AccessToken 검증 성공', data);
        return data;
    } catch {
        console.log('AccessToken 검증 실패');
        return { isExpired: true };
    }
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
            },
        );
        const data = await res.json();
        console.log('AccessToken 검증 성공');
        return data;
    } catch (err) {
        console.log('AccessToken 검증 실패');
        return { isExpired: true };
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
            },
        );
        const data = await res.text(); // 한번만 호출
        console.log('accessToken 발급');
        return data;
    } catch (error) {
        throw new Error(error.message);
    }
}

// 프로필 이미지 가져오는 로직

export async function getProfile() {
    const accessToken = getAccessToken();

    try {
        const res = await fetch(
            `/danum-backend/member/profile-image`,
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${accessToken}`,
                },
            },
        );

        if (!res.ok) {
            throw new Error(
                'Failed to fetch profile image',
            );
        }

        const url = await res.text(); // 응답을 JSON 형식으로 파싱
        return url; // 파싱한 데이터를 반환
    } catch (err) {
        throw new Error(err.message);
    }
}

// 유저정보 가져오는 API (member/me)
export async function fetchUserData() {
    const accessToken = getAccessToken();

    try {
        const res = await fetch(
            `/danum-backend/member/me`,
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${accessToken}`,
                },
            },
        );

        return await res.json();
    } catch {
        console.log(
            '유저 정보를 가져오는 것을 실패하였습니다.',
        );
    }
}

// 프로필 변경하는 로직
export async function userUpdate({
    email,
    password,
    phone,
    name,
    latitude,
    longitude,
    address,
    profileImageUrl,
}) {
    const token = getAccessToken();

    try {
        const response = await fetch(
            `/danum-backend/member/update`,
            {
                method: 'PUT',
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email,
                    password,
                    phone,
                    name,
                    latitude,
                    longitude,
                    address,
                    profileImageUrl,
                }),
            },
        );

        if (!response.ok) {
            throw new Error(`Error: ${response.status}`);
        }
        return response;
    } catch (error) {
        console.error('Error fetching data', error);
        return [];
    }
}
