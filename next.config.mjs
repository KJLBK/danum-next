const nextConfig = {
    async rewrites() {
        return [
            {
                source: '/danum-backend/:slug*',
                destination: `${process.env.NEXT_PUBLIC_BASE_URL}/:slug*`,
            },
        ];
    },

    // 이미지 호스트 설정 (S3 버킷)
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname:
                    'danum-bucket.s3.ap-northeast-2.amazonaws.com',
                pathname: '**',
            },
        ],
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
