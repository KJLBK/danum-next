const nextConfig = {
    async rewrites() {
        return [
            {
                source: '/api/:slug*',
                destination:
                    `${process.env.NEXT_PUBLIC_BASE_URL}:slug*`,
            },
        ];
    },
};

export default nextConfig;
