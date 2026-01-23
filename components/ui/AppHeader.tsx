// components/ui/AppHeader.tsx
'use client';

import { useRouter } from 'next/navigation';
import { Logo } from './Logo';
import { NotificationBell, type NotificationItem } from './NotificationBell';

interface AppHeaderProps {
  showBack?: boolean;
  title?: string;
  notifications?: NotificationItem[];
  showActions?: boolean; // show notification bell and settings
}

export function AppHeader({ 
  showBack = false, 
  title, 
  notifications = [],
  showActions = true 
}: AppHeaderProps) {
  const router = useRouter();

  return (
    <header 
      className="
        sticky top-0 z-50
        h-14 px-4 
        flex items-center justify-between 
        bg-white
        border-b border-gray-100
      "
    >
      {/* 왼쪽: 뒤로가기 버튼 또는 로고 */}
      {showBack ? (
        <button
          onClick={() => router.back()}
          aria-label="뒤로가기"
          className="
            w-10 h-10 -ml-2
            flex items-center justify-center 
            rounded-full
            text-gray-600 hover:text-gray-900
            hover:bg-gray-100
            transition-colors duration-200
          "
        >
          <svg 
            className="w-6 h-6" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M15 19l-7-7 7-7" 
            />
          </svg>
        </button>
      ) : (
        <button
          onClick={() => router.push('/demo/')}
          aria-label="홈으로 가기"
          className="
            hover:opacity-70
            transition-opacity duration-200
            cursor-pointer
          "
        >
          <Logo size="sm" showIcon={false} />
        </button>
      )}

      {/* 가운데: 타이틀 (선택사항) */}
      {title && (
        <div className="absolute left-1/2 -translate-x-1/2">
          <h1 className="text-base font-semibold text-gray-900">
            {title}
          </h1>
        </div>
      )}

      {/* 오른쪽: 알림 벨 + 설정 아이콘 */}
      {showActions ? (
        <div className="flex items-center gap-1">
          <NotificationBell notifications={notifications} />
          
          <button
            onClick={() => {/* TODO: 설정 페이지 구현 */}}
            aria-label="설정"
            className="
              w-10 h-10 rounded-full
              flex items-center justify-center
              text-gray-600 hover:text-gray-900
              hover:bg-gray-100
              transition-colors duration-200
            "
          >
            {/* Settings Icon (Gear) */}
            <svg 
              className="w-6 h-6" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" 
              />
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" 
              />
            </svg>
          </button>
        </div>
      ) : (
        <div className="w-10" />
      )}
    </header>
  );
}
