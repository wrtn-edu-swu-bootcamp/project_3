// components/ui/TossSavedStoresPreview.tsx
import Link from 'next/link';
import type { WeeklyReport } from '@/lib/types/report';

interface TossSavedStoresPreviewProps {
  reports: WeeklyReport[];
}

export function TossSavedStoresPreview({ reports }: TossSavedStoresPreviewProps) {
  const previewStores = reports.slice(0, 3);

  return (
    <div className="space-y-3">
      {previewStores.map((store) => (
        <Link
          key={store.storeId}
          href={`/report/${store.storeId}/`}
          className="block bg-white border border-gray-200 rounded-xl p-5 hover:border-blue-400 hover:shadow-md transition-all group"
        >
          <div className="flex items-start justify-between">
            <div className="flex items-start gap-3 flex-1">
              {/* 이모지 */}
              <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-2xl flex-shrink-0">
                {store.emoji}
              </div>

              {/* 정보 */}
              <div className="flex-1 min-w-0">
                <h3 className="font-bold text-gray-900 mb-1">
                  {store.storeName}
                </h3>
                <p className="text-sm text-gray-600 mb-3">
                  {store.category} · 리뷰 {store.totalReviews}개
                </p>

                {/* 태그들 */}
                <div className="flex flex-wrap gap-2">
                  {store.priorities.urgent.length > 0 && (
                    <span className="px-2 py-1 bg-red-100 text-red-700 text-xs font-medium rounded-lg">
                      긴급 {store.priorities.urgent.length}
                    </span>
                  )}
                  {store.priorities.consider.length > 0 && (
                    <span className="px-2 py-1 bg-yellow-100 text-yellow-700 text-xs font-medium rounded-lg">
                      고려 {store.priorities.consider.length}
                    </span>
                  )}
                  {store.priorities.good.length > 0 && (
                    <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-lg">
                      잘함 {store.priorities.good.length}
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* 화살표 */}
            <svg 
              className="w-6 h-6 text-gray-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all flex-shrink-0 ml-3" 
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
          </div>
        </Link>
      ))}
    </div>
  );
}
