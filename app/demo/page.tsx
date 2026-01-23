// app/demo/page.tsx
// Server Component - Static Export용 메인 페이지

import Link from 'next/link';
import { MainHeader } from '@/components/ui/MainHeader';
import { TossSearchBar } from '@/components/ui/TossSearchBar';
import { TossUrgentAlert } from '@/components/ui/TossUrgentAlert';
import { TossQuickActions } from '@/components/ui/TossQuickActions';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { SavedStoresSection } from '@/components/sections/SavedStoresSection';
import { FeatureSection } from '@/components/ui/FeatureSection';
import { loadAllReports } from '@/lib/data/loader';

export default function DemoPage() {
  // Server Component에서 빌드 타임에 리포트 로드
  const reports = loadAllReports();

  // 긴급 알림이 있는 가게만 필터링
  const urgentReports = reports.filter(
    report => report.priorities.urgent.length > 0
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50/30 via-gray-50/50 to-white">
      {/* 헤더 */}
      <MainHeader />

      {/* 메인 컨텐츠 */}
      <main className="container mx-auto px-4 pt-24 pb-16 max-w-5xl">
        {/* 히어로 섹션 */}
        <section className="pt-8 mb-12 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            이번 주 리뷰,{' '}
            <span className="text-blue-600">3분</span>이면 끝나요
          </h1>
          <p className="text-lg text-gray-600">
            가게를 검색하거나 저장된 가게에서 바로 확인할 수 있어요
          </p>
        </section>

        {/* 검색 영역 */}
        <section className="mb-8">
          <TossSearchBar />
        </section>

        {/* 긴급 알림 카드 */}
        {urgentReports.length > 0 && (
          <section className="mb-8">
            <TossUrgentAlert urgentReports={urgentReports} />
          </section>
        )}

        {/* 빠른 액션 버튼 */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            빠르게 시작하기
          </h2>
          <TossQuickActions />
        </section>

        {/* 저장된 가게 프리뷰 */}
        <section id="saved-stores" className="mt-24 mb-12 scroll-mt-20">
          <SectionHeader
            title="저장된 가게"
            cta={
              <Link
                href="/stores/"
                className="flex items-center gap-1 text-blue-600 hover:text-blue-700 font-medium text-sm transition-colors"
                aria-label="저장된 가게 전체 보기"
              >
                <span>전체 보기</span>
                <svg
                  className="w-4 h-4"
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
              </Link>
            }
          />
          <SavedStoresSection
            firstStores={reports.slice(0, 3)}
            restStores={reports.slice(3)}
            totalCount={reports.length}
          />
        </section>

        {/* 서비스 소개 */}
        <section id="service-intro" className="mb-12 scroll-mt-20">
          <FeatureSection />
        </section>

        {/* 통계 섹션 (간단하게) */}
        <section className="mb-12">
          <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl p-8 text-white">
            <h2 className="text-3xl font-bold mb-6">
              RE:ACTION과 함께라면
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <div className="text-4xl font-bold mb-2">3분</div>
                <div className="text-blue-100">리뷰 분석 완료</div>
              </div>
              <div>
                <div className="text-4xl font-bold mb-2">100%</div>
                <div className="text-blue-100">자동 분류</div>
              </div>
              <div>
                <div className="text-4xl font-bold mb-2">즉시</div>
                <div className="text-blue-100">할 일 제안</div>
              </div>
            </div>
          </div>
        </section>
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
