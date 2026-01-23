// components/ui/BeforeMidnightSection.tsx
import Link from 'next/link';
import { StoreCard } from './StoreCard';
import type { WeeklyReport } from '@/lib/types/report';

interface BeforeMidnightSectionProps {
  stores: WeeklyReport[];
}

export function BeforeMidnightSection({ stores }: BeforeMidnightSectionProps) {
  // Show only first 2 stores with urgent issues
  const urgentStores = stores
    .filter(store => store.priorities.urgent.length > 0)
    .slice(0, 2);

  // If no urgent stores, show first 2 stores
  const displayStores = urgentStores.length > 0 ? urgentStores : stores.slice(0, 2);

  if (displayStores.length === 0) {
    return null;
  }

  return (
    <section className="container py-12">
      {/* Section Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            저장된 가게
          </h2>
          <p className="text-sm text-gray-600">
            저장한 가게들을 확인하세요
          </p>
        </div>
        <Link
          href="/report/"
          className="text-blue-500 hover:text-blue-600 font-medium text-sm flex items-center gap-1 transition-colors"
        >
          <span>관리하기</span>
          <svg 
            className="w-4 h-4" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M9 5l7 7-7 7" 
            />
          </svg>
        </Link>
      </div>

      {/* Store Cards Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {displayStores.map((store) => (
          <StoreCard
            key={store.storeId}
            id={store.storeId}
            name={store.storeName}
            emoji={store.emoji}
            category={store.category}
            period={store.period}
            reviewCount={store.totalReviews}
            priorities={{
              urgent: store.priorities.urgent.length,
              consider: store.priorities.consider.length,
              good: store.priorities.good.length
            }}
          />
        ))}
      </div>
    </section>
  );
}
