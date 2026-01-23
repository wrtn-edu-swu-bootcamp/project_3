// components/ui/BadgeChips.tsx
import type { BadgeType } from '@/lib/types/report';

interface BadgeChipsProps {
  badges: BadgeType[];
}

const BADGE_CONFIG: Record<BadgeType, { label: string; icon: string; bgClass: string; textClass: string }> = {
  sample_small: {
    label: '표본 부족',
    icon: 'chart',
    bgClass: 'bg-amber-50 border-amber-200',
    textClass: 'text-amber-700'
  },
  low_confidence: {
    label: '확신 낮음',
    icon: 'question',
    bgClass: 'bg-gray-50 border-gray-200',
    textClass: 'text-gray-600'
  },
  event_possible: {
    label: '이벤트 가능성',
    icon: 'gift',
    bgClass: 'bg-purple-50 border-purple-200',
    textClass: 'text-purple-700'
  }
};

function BadgeIcon({ type }: { type: string }) {
  switch (type) {
    case 'chart':
      return (
        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      );
    case 'question':
      return (
        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      );
    case 'gift':
      return (
        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
        </svg>
      );
    default:
      return null;
  }
}

export function BadgeChips({ badges }: BadgeChipsProps) {
  if (badges.length === 0) return null;

  return (
    <div className="flex flex-wrap gap-2">
      {badges.map((badge) => {
        const config = BADGE_CONFIG[badge];
        return (
          <span
            key={badge}
            aria-label={`${config.label} 경고`}
            className={`
              inline-flex items-center gap-1.5
              px-3 py-1.5 
              border rounded-full
              text-xs font-medium
              ${config.bgClass} ${config.textClass}
            `}
          >
            <BadgeIcon type={config.icon} />
            {config.label}
          </span>
        );
      })}
    </div>
  );
}
