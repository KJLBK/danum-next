import { create } from 'zustand';

export const useAuthStore = create((set) => ({
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
}));
