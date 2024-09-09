const { create } = require('zustand');

export const useAuthStore = create((set) => ({
    user: null,
    setUser: (user) => set({ user }),
    clearUser: () => set({ user: null }),
}));
