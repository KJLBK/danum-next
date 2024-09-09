const nextConfig = {
    async rewrites() {
        return [
            {
                source: '/api/:slug*',
                destination:
                    'http://43.203.8.51:8080/:slug*',
            },
        ];
    },
};

export default nextConfig;
