import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import {
    checkAuth,
    fetchUserData,
    verifyATokenToClient,
} from '../services/authService';
import {
    getCookie,
    setAccessToken,
} from '../services/tokenService';

export const useAuthStore = create(
    persist(
        (set) => ({
            user: null,
            email: null,
            active: null,
            address: null,
            contribution: null,
            exp: null,
            latitude: null,
            longitude: null,
            name: null,
            profileImageUrl: null,
            role: null,
            isLoggedIn: false,
            // 상태를 설정하는 함수
            setAuth: (data) => {
                const { password, ...filteredData } = data;
                set({ ...filteredData, isLoggedIn: true });
            },
            setAuthState: async () => {
                try {
                    const user = await fetchUserData();
                    console.log(user);
                    useAuthStore.getState().setAuth(user);
                } catch (err) {
                    console.log(err);
                }
            },

            // 상태를 초기화하는 함수
            clearAuth: () =>
                set({
                    user: null,
                    email: null,
                    active: null,
                    address: null,
                    contribution: null,
                    exp: null,
                    latitude: null,
                    longitude: null,
                    name: null,
                    profileImageUrl: null,
                    role: null,
                    isLoggedIn: false,
                }),

            // 인증 상태를 체크하는 함수
            checkAuthStatus: async () => {
                const accessToken =
                    getCookie('accessToken');

                if (accessToken) {
                    const isAuthenticated =
                        await verifyATokenToClient(
                            accessToken,
                        );
                    console.log(
                        '> AccessToken 만료? :',
                        isAuthenticated.status === 500 ||
                            isAuthenticated.isExpired ===
                                true,
                    );

                    if (
                        isAuthenticated.status === 500 ||
                        isAuthenticated.isExpired === true
                    ) {
                        // Access Token이 만료된 경우 Refresh Token을 사용해 갱신
                        await useAuthStore
                            .getState()
                            .refreshToken();
                    }
                } else {
                    console.log(
                        'accessToken 없음',
                        accessToken,
                    );
                    // Access Token이 없을 경우 Refresh Token 사용
                    await useAuthStore
                        .getState()
                        .refreshToken();
                }
            },

            // 토큰 갱신을 위한 함수
            refreshToken: async () => {
                const refreshToken =
                    getCookie('refreshToken');
                console.log(
                    'zustand-refreshToken',
                    refreshToken,
                );

                if (refreshToken) {
                    try {
                        const newAccessToken =
                            await checkAuth(refreshToken);
                        console.log(
                            '토큰 발급',
                            newAccessToken,
                        );
                        if (newAccessToken) {
                            setAccessToken(newAccessToken);
                            console.log('토큰 갱신');
                        } else {
                            // 새 Access Token이 없다면 로그아웃 처리
                            console.log(
                                '토큰 갱신 실패 : 로그아웃',
                            );
                            await useAuthStore
                                .getState()
                                .clearAuth();
                        }
                    } catch (error) {
                        console.error(
                            '토큰 갱신 오류:',
                            error,
                        );
                        await useAuthStore
                            .getState()
                            .clearAuth(); // 오류 시 로그아웃
                    }
                } else {
                    // Refresh Token이 없는 경우 로그아웃
                    await useAuthStore
                        .getState()
                        .clearAuth();
                }
            },
        }),
        {
            name: 'auth-storage',
            storage: {
                getItem: (name) => {
                    const item = localStorage.getItem(name);
                    return item ? JSON.parse(item) : null;
                },
                setItem: (name, value) => {
                    localStorage.setItem(
                        name,
                        JSON.stringify(value),
                    );
                },
                removeItem: (name) => {
                    localStorage.removeItem(name);
                },
            },
        },
    ),
);
