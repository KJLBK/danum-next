import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useAuthStore = create(
    persist(
        (set) => ({
            user: null,
            role: null,
            expiration: null,
            isLoggedIn: false,
            setAuth: (user, role, expiration) =>
                set({
                    user,
                    role,
                    expiration,
                    isLoggedIn: true,
                }),
            clearAuth: () =>
                set({
                    user: null,
                    role: null,
                    expiration: null,
                    isLoggedIn: false,
                }),
        }),
        {
            name: 'auth-storage',
            storage:
                typeof window !== 'undefined'
                    ? localStorage
                    : undefined, // SSR에서 localStorage가 없는 경우 처리
        }
    )
);
