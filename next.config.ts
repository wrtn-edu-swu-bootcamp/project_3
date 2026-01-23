import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // Vercel 배포를 위해 output: 'export' 제거
  // Vercel은 자동으로 정적 생성 및 최적화를 수행합니다
  trailingSlash: true,        // URL 끝에 / 추가
  images: {
    // Vercel에서는 이미지 최적화가 자동으로 지원됩니다
    unoptimized: false
  }
};

export default nextConfig;
