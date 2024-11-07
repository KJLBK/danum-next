import { NextResponse } from 'next/server';
import {
    checkAuth,
    verifyAccessToken,
} from './services/authService';

export async function middleware(req) {
    const cookies = req.cookies;
    const accessToken = cookies.get('accessToken')?.value;
    const refreshToken = cookies.get('refreshToken')?.value;
    const response = NextResponse.next();

    console.log('Middleware 시작');
    console.log('Access Token:', accessToken);
    console.log('Refresh Token:', refreshToken);

    if (!accessToken && !refreshToken) {
        console.log('Token이 모두 없음');
        return redirectToLogin(req);
    }

    if (accessToken) {
        console.log('Access Token이 존재함, 검증 시작');
        try {
            const verifyResponse =
                await verifyAccessToken(accessToken);
            console.log(
                'Access Token 검증 결과:',
                verifyResponse,
            );

            if (!verifyResponse.isExpired) {
                console.log(
                    'Access Token 유효함, 요청 계속 진행',
                );
                return NextResponse.next();
            } else {
                console.log('Access Token 만료됨');
            }
        } catch (error) {
            console.error(
                'Access Token 검증 중 오류 발생:',
                error,
            );
            removeAccessTokenCookie(response);
            if (refreshToken) {
                console.log(
                    'Refresh Token이 존재함, 재발급 요청 시작',
                );
                try {
                    const refreshResponse =
                        await checkAuth(refreshToken);
                    console.log(
                        'Refresh Token 검증 결과:',
                        refreshResponse,
                    );

                    if (refreshResponse) {
                        const accessToken = refreshResponse;
                        const response =
                            NextResponse.next();

                        setAccessTokenCookie(
                            response,
                            accessToken,
                        );
                        console.log(
                            '새 Access Token 발급 및 설정 완료',
                            accessToken,
                        );
                        return response;
                    } else {
                        console.log(
                            'Refresh Token이 유효하지 않음',
                        );
                    }
                } catch (error) {
                    console.error(
                        'Refresh Token 검증 중 오류 발생:',
                        error,
                    );
                    return redirectToLogin(req);
                }
            } else {
                console.log('Refresh Token이 없음');
            }
            return redirectToLogin(req);
        }
    } else {
        console.log('Access Token이 없음');
    }

    if (refreshToken) {
        console.log('Refresh Token이 존재함, 검증 시작');
    } else {
        console.log('Refresh Token이 없음');
    }

    console.log(
        '모든 조건을 만족하지 않아 로그인 페이지로 리다이렉트',
    );
    return redirectToLogin(req);
}

// Access Token을 설정하는 함수
function setAccessTokenCookie(response, token) {
    response.cookies.set('accessToken', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        path: '/',
    });
    console.log('새 Access Token 설정 완료');
}

// Access Token을 삭제하는 함수
function removeAccessTokenCookie(response) {
    response.cookies.set('accessToken', '', {
        maxAge: 0, // 쿠키 삭제 설정
        path: '/',
    });
    console.log('Access Token 삭제 완료');
}

function redirectToLogin(req) {
    const loginUrl = new URL('/login', req.url);
    loginUrl.searchParams.set('from', req.nextUrl.pathname);
    console.log(
        '로그인 페이지로 리다이렉트:',
        loginUrl.toString(),
    );
    return NextResponse.redirect(loginUrl);
}

export const config = {
    matcher: ['/chat/:path*', '/mypage/:path*'],
};
