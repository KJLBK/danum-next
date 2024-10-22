import { NextResponse } from 'next/server';
import {
    checkAuth,
    verifyAccessToken,
} from './services/authService';

export async function middleware(req) {
    const cookies = req.cookies;
    const accessToken = cookies.get('accessToken')?.value;
    const refreshToken = cookies.get('refreshToken')?.value;

    if (!accessToken) {
        return redirectToLogin(req);
    }

    try {
        const verifyResponse =
            await verifyAccessToken(accessToken);

        if (!verifyResponse.isExpired) {
            return NextResponse.next();
        }

        const refreshResponse =
            await checkAuth(refreshToken); // error

        if (refreshResponse.ok) {
            const { accessToken: newAccessToken } =
                await refreshResponse.json();

            const response = NextResponse.next();

            response.cookies.set(
                'accessToken',
                newAccessToken,
                {
                    path: '/',
                },
            );

            return response;
        }

        return redirectToLogin(req);
    } catch (error) {
        console.error('Auth middleware error:', error);
        return redirectToLogin(req);
    }
}

function redirectToLogin(req) {
    const loginUrl = new URL('/login', req.url);

    // 로그인 후에 사용자가 어디에서 왔는지 정보를 유지
    loginUrl.searchParams.set('from', req.nextUrl.pathname);

    return NextResponse.redirect(loginUrl);
}

export const config = {
    matcher: ['/chat/:path*', '/mypage/:path*'],
};
