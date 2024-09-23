const nextConfig = {
    async rewrites() {
        return [
            {
                source: '/api/:slug*',
                destination: `${process.env.NEXT_PUBLIC_BASE_URL}/:slug*`,
            },
        ];
    },

    // Webpack 설정 추가
    webpack(config) {
        config.module.rules.push({
            test: /\.svg$/, // .svg 파일을 감지
            use: ['@svgr/webpack'], // svgr을 사용하여 SVG를 React 컴포넌트로 변환
        });

        return config; // 수정된 Webpack 설정 반환
    },
};

export default nextConfig;
