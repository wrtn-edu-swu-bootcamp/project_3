// components/sections/SavedStoresSection.tsx
'use client';

import { useState } from 'react';
import { StorePreviewCard } from '@/components/ui/StorePreviewCard';
import type { WeeklyReport } from '@/lib/types/report';

interface SavedStoresSectionProps {
  firstStores: WeeklyReport[];
  restStores: WeeklyReport[];
  totalCount: number;
}

export function SavedStoresSection({ firstStores, restStores, totalCount }: SavedStoresSectionProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const hasMore = restStores.length > 0;

  return (
    <div>
      {/* First 3 stores - always visible */}
      <div className="space-y-3">
        {firstStores.map((store) => (
          <StorePreviewCard key={store.storeId} store={store} />
        ))}
      </div>

      {/* Remaining stores - collapsible */}
      {hasMore && (
        <>
          <div
            className={`
              overflow-hidden transition-all duration-300 ease-in-out
              ${isExpanded ? 'max-h-[2000px] opacity-100 mt-3' : 'max-h-0 opacity-0'}
            `}
          >
            <div className="space-y-3">
              {restStores.map((store) => (
                <StorePreviewCard key={store.storeId} store={store} />
              ))}
            </div>
          </div>

          {/* Toggle button */}
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="w-full mt-4 py-3 px-4 bg-gray-50 hover:bg-gray-100 rounded-xl transition-colors flex items-center justify-center gap-2 text-gray-700 font-medium"
            aria-expanded={isExpanded}
            aria-label={isExpanded ? '접기' : '더보기'}
          >
            <span>{isExpanded ? '접기' : `더보기 (${restStores.length})`}</span>
            <svg
              className={`w-4 h-4 transition-transform ${isExpanded ? 'rotate-180' : ''}`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>
        </>
      )}
    </div>
  );
}
