import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useAuthStore = create(
    persist(
        (set) => ({
            user: null,
            role: null,
            date: null,
            isLoggedIn: false,
            setAuth: (user, role, date) =>
                set({ user, role, date, isLoggedIn: true }),
            clearAuth: () =>
                set({
                    user: null,
                    role: null,
                    date: null,
                    isLoggedIn: false,
                }),
        }),
        {
            name: 'auth-storage',
            getStorage: () => localStorage,
        }
    )
);
