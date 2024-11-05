export const usePostStore = create((set) => ({
    posts: [],
    addPosts: (newPosts) =>
        set((state) => ({
            posts: [...state.posts, ...newPosts],
        })),
}));
