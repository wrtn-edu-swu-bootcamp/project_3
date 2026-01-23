"use client";

import { useRouter } from "next/navigation";

/**
 * App Header
 * Purpose: 전역 네비게이션 (뒤로가기 + 브랜드)
 * States: Default, Pressed, Focus
 */
interface AppHeaderProps {
  showBack?: boolean;
}

export default function AppHeader({ showBack = false }: AppHeaderProps) {
  const router = useRouter();

  return (
    <header
      role="banner"
      className="h-[56px] bg-surface-card border-b border-border-default px-m flex items-center justify-between sticky top-0 z-10"
    >
      {/* 뒤로 버튼 */}
      {showBack ? (
        <button
          onClick={() => router.back()}
          aria-label="뒤로가기"
          className="w-[44px] h-[44px] flex items-center justify-center text-2xl text-text-primary hover:opacity-60 focus:opacity-100"
        >
          ←
        </button>
      ) : (
        <div className="w-[44px]" />
      )}

      {/* 로고 */}
      <h1 className="text-h2" aria-label="리액션 홈">
        리액션
      </h1>

      {/* Right Space */}
      <div className="w-[44px]" />
    </header>
  );
}
