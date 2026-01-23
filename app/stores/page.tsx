// app/stores/page.tsx
// Server Component - 저장된 가게 전체 목록 페이지

import { MainHeader } from '@/components/ui/MainHeader';
import { StorePreviewCard } from '@/components/ui/StorePreviewCard';
import { loadAllReports } from '@/lib/data/loader';

export default function StoresPage() {
  // Server Component에서 빌드 타임에 리포트 로드
  const reports = loadAllReports();

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50/30 via-gray-50/50 to-white">
      {/* 헤더 */}
      <MainHeader />

      {/* 메인 컨텐츠 */}
      <main className="container mx-auto px-4 pt-32 pb-16 max-w-5xl">
        {/* 페이지 타이틀 */}
        <div className="mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            저장된 가게
          </h1>
          <p className="text-lg text-gray-600">
            총 {reports.length}개
          </p>
        </div>

        {/* 가게 목록 */}
        {reports.length > 0 ? (
          <div className="space-y-3">
            {reports.map((store) => (
              <StorePreviewCard key={store.storeId} store={store} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-8 h-8 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                />
              </svg>
            </div>
            <p className="text-gray-600">저장된 가게가 없습니다</p>
          </div>
        )}
      </main>

      {/* 푸터 */}
      <footer className="bg-gray-50 border-t border-gray-200 py-12">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-600 mb-2">
            RE:ACTION은 사장님의 소중한 시간을 아껴드립니다
          </p>
          <p className="text-sm text-gray-500">
            © 2024 RE:ACTION. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
