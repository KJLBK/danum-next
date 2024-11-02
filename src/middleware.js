import { NextResponse } from 'next/server';
import {
    checkAuth,
    verifyAccessToken,
} from './services/authService';

export async function middleware(req) {
    const cookies = req.cookies;
    const accessToken = cookies.get('accessToken')?.value;
    const refreshToken = cookies.get('refreshToken')?.value;

    if (!accessToken && !refreshToken) {
        return redirectToLogin(req);
    }

    try {
        if (accessToken) {
            const verifyResponse =
                await verifyAccessToken(accessToken);
            if (!verifyResponse.isExpired) {
                return NextResponse.next();
            }
        }

        if (refreshToken) {
            const refreshResponse =
                await checkAuth(refreshToken);
            if (refreshResponse) {
                const { accessToken: newAccessToken } =
                    refreshResponse;
                const response = NextResponse.next();
                response.cookies.set(
                    'accessToken',
                    newAccessToken,
                    { path: '/' },
                );
                return response;
            }
        }

        return redirectToLogin(req);
    } catch (error) {
        console.error('Auth middleware error:', error);
        return redirectToLogin(req);
    }
}

function redirectToLogin(req) {
    const loginUrl = new URL('/login', req.url);
    loginUrl.searchParams.set('from', req.nextUrl.pathname);
    return NextResponse.redirect(loginUrl);
}

export const config = {
    matcher: ['/chat/:path*', '/mypage/:path*'],
};
