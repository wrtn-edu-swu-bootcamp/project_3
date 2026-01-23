// components/ui/TossQuickActions.tsx
'use client';

import Link from 'next/link';

interface QuickAction {
  id: string;
  emoji: string;
  title: string;
  targetId?: string;
  href?: string;
}

const ACTIONS: QuickAction[] = [
  { id: '1', emoji: '⏱️', title: '3분 요약 보기', href: '/demo/quick-summary/' },
  { id: '2', emoji: 'ℹ️', title: '서비스 소개', targetId: 'service-intro' },
  { id: '3', emoji: '⭐', title: '저장된 가게', targetId: 'saved-stores' },
];

export function TossQuickActions() {
  const handleClick = (targetId: string) => {
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
      {ACTIONS.map((action) => {
        const content = (
          <>
            <div className="flex items-center gap-3">
              <span className="text-2xl">{action.emoji}</span>
              <span className="font-medium text-gray-900">{action.title}</span>
            </div>
            <svg 
              className="w-5 h-5 text-gray-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
              strokeWidth={2}
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                d="M9 5l7 7-7 7" 
              />
            </svg>
          </>
        );

        const className = "flex items-center justify-between p-4 bg-white border border-gray-200 rounded-xl hover:border-blue-400 hover:shadow-md transition-all group";

        // href가 있으면 Link, 없으면 button
        if (action.href) {
          return (
            <Link key={action.id} href={action.href} className={className}>
              {content}
            </Link>
          );
        }

        return (
          <button
            key={action.id}
            onClick={() => action.targetId && handleClick(action.targetId)}
            className={className}
          >
            {content}
          </button>
        );
      })}
    </div>
  );
}
