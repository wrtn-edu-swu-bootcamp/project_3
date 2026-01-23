import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'export',           // 정적 HTML 생성
  trailingSlash: true,        // URL 끝에 / 추가 (중요!)
  images: {
    unoptimized: true         // Static Export 제약
  }
};

export default nextConfig;
