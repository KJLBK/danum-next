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
            storage: {
                getItem: (name) => {
                    const item = localStorage.getItem(name);
                    return item ? JSON.parse(item) : null;
                },
                setItem: (name, value) => {
                    localStorage.setItem(
                        name,
                        JSON.stringify(value)
                    );
                },
                removeItem: (name) => {
                    localStorage.removeItem(name);
                },
            },
        }
    )
);
