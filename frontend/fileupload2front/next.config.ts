import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    async rewrites() {
        return [
            {
                source: '/images/:path*',
                destination: 'http://localhost:8080/api/images/:path*',
            },
            {
                source: '/api/:path*', // 클라이언트에서는 /api로 시작하는 요청
                destination: 'http://localhost:8080/api/:path*', // 백엔드 주소
            },
        ];
    },
};

export default nextConfig;
