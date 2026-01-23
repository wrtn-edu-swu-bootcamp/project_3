// app/report/page.tsx
// 저장된 가게 목록 페이지

import { AppHeader } from '@/components/ui/AppHeader';
import { StoreCard } from '@/components/ui/StoreCard';
import { loadAllReports } from '@/lib/data/loader';

export default function SavedStoresPage() {
  const reports = loadAllReports();

  return (
    <main className="min-h-screen bg-white">
      <AppHeader showBack title="저장된 가게" />
      
      {/* 저장된 가게 섹션 */}
      <section className="container py-8">
        {/* 섹션 헤더 */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            내 가게 리포트
          </h1>
          <p className="text-gray-600">
            총 {reports.length}개의 가게가 저장되어 있어요
          </p>
        </div>

        {/* 가게 카드 그리드 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {reports.map((report) => (
            <StoreCard
              key={report.storeId}
              id={report.storeId}
              name={report.storeName}
              emoji={report.emoji}
              category={report.category}
              period={report.period}
              reviewCount={report.totalReviews}
              priorities={{
                urgent: report.priorities.urgent.length,
                consider: report.priorities.consider.length,
                good: report.priorities.good.length
              }}
            />
          ))}
        </div>
      </section>
    </main>
  );
}
