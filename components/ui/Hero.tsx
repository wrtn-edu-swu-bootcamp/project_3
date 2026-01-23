// components/ui/Hero.tsx
'use client';

export function Hero() {
  return (
    <section className="relative pb-8">
      {/* 배경 그라데이션 - 따뜻한 톤 */}
      <div className="absolute inset-0 bg-gradient-to-b from-orange-50 via-amber-50/30 to-gray-50 -z-10" />

      {/* 왼쪽 정렬 타이틀 영역 */}
      <div className="container pt-20 pb-8 text-left">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
          이번 주 리뷰, <span className="text-blue-500">3분</span>이면 끝나요
        </h1>
        <p className="text-base md:text-lg text-gray-600">
          가게를 검색하거나 저장된 가게에서 바로 확인할 수 있어요
        </p>
      </div>
    </section>
  );
}
