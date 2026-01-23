// components/ui/StoreCard.tsx
import Link from 'next/link';
import { PriorityChip } from './PriorityChip';

interface StoreCardProps {
  id: string;
  name: string;
  emoji: string;
  category: string;
  period: { start: string; end: string };
  reviewCount: number;
  priorities: {
    urgent: number;
    consider: number;
    good: number;
  };
}

export function StoreCard({ 
  id, name, emoji, category, period, reviewCount, priorities 
}: StoreCardProps) {
  const formatDate = (date: string) => {
    const [, month, day] = date.split('-');
    return `${parseInt(month)}/${parseInt(day)}`;
  };

  return (
    <article
      className="
        bg-white rounded-2xl
        p-5 
        border border-gray-100
        shadow-sm hover:shadow-lg
        transition-all duration-300
        hover:-translate-y-1
        animate-fadeIn
      "
    >
      {/* 가게 정보 헤더 */}
      <div className="flex items-start gap-3 mb-4">
        <span className="text-3xl">{emoji}</span>
        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-bold text-gray-900 truncate">
            {name}
          </h3>
          <p className="text-sm text-gray-500 flex items-center gap-1">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
            {category}
          </p>
        </div>
      </div>

      {/* 기간 & 리뷰 수 */}
      <div className="flex items-center gap-3 mb-4 text-sm text-gray-500">
        <span className="flex items-center gap-1">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          {formatDate(period.start)} ~ {formatDate(period.end)}
        </span>
        <span className="flex items-center gap-1">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
          </svg>
          리뷰 {reviewCount}개
        </span>
      </div>

      {/* 우선순위 칩 */}
      <div className="flex flex-wrap gap-2 mb-5">
        <PriorityChip type="urgent" count={priorities.urgent} />
        <PriorityChip type="consider" count={priorities.consider} />
        <PriorityChip type="good" count={priorities.good} />
      </div>

      {/* CTA 버튼 */}
      <Link
        href={`/report/${id}/`}
        className="
          block w-full py-3.5 px-6 
          bg-gradient-to-r from-blue-500 to-blue-600
          hover:from-blue-600 hover:to-blue-700
          text-white text-center font-semibold
          rounded-xl
          shadow-sm hover:shadow-md
          transition-all duration-200
          active:scale-[0.98]
        "
      >
        리포트 보기
      </Link>
    </article>
  );
}
