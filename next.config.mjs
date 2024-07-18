/** @type {import('next').NextConfig} */
const nextConfig = {
    async rewrites() {
        return [
            {
                source: '/api/:slug*',
                destination: 'http://43.203.8.51/:slug*',
            },
        ];
    },
};

export default nextConfig;
