// app/demo/quick-summary/page.tsx
// Server Component - 3분 요약 페이지

import Link from 'next/link';
import { MainHeader } from '@/components/ui/MainHeader';
import { ActionCard } from '@/components/ui/ActionCard';
import { CategoryDetailCard } from '@/components/ui/CategoryDetailCard';
import { EmptyState } from '@/components/ui/EmptyState';
import { loadReport } from '@/lib/data/loader';

export default function QuickSummaryPage() {
  // store-1 리포트 로드 (에러 시 catch)
  let report;
  try {
    report = loadReport('store-1');
  } catch (error) {
    // 파일 없으면 fallback
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-50/30 via-gray-50/50 to-white">
        <MainHeader />
        <main className="container mx-auto px-4 pt-24 pb-8 max-w-4xl">
          <EmptyState type="static" />
          <div className="text-center mt-8">
            <Link 
              href="/demo/"
              className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white font-medium rounded-xl hover:bg-blue-700 transition-colors"
            >
              <span>메인으로 돌아가기</span>
            </Link>
          </div>
        </main>
      </div>
    );
  }

  const firstUrgent = report.priorities.urgent[0] || report.priorities.consider[0];
  const firstCategory = report.categoryDetails[0];

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50/30 via-gray-50/50 to-white">
      <MainHeader />

      <main className="container mx-auto px-4 pt-24 pb-12 max-w-4xl">
        {/* 타이틀 */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            ⏱️ 3분 요약 보기
          </h1>
          <p className="text-lg text-gray-600">
            리포트가 어떻게 생성되는지 빠르게 확인해보세요
          </p>
        </div>

        {/* 리포트 생성 흐름 */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            리포트 생성 흐름
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* 단계 1 */}
            <div className="bg-white border-2 border-blue-200 rounded-xl p-5">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
                  1
                </div>
                <h3 className="font-bold text-gray-900">업로드/수집</h3>
              </div>
              <p className="text-sm text-gray-600">
                배달앱에서 리뷰 데이터를 가져옵니다
              </p>
            </div>

            {/* 단계 2 */}
            <div className="bg-white border-2 border-blue-200 rounded-xl p-5">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
                  2
                </div>
                <h3 className="font-bold text-gray-900">분류/감성 분석</h3>
              </div>
              <p className="text-sm text-gray-600">
                AI가 리뷰를 카테고리별로 분류하고 긍정/부정을 판단합니다
              </p>
            </div>

            {/* 단계 3 */}
            <div className="bg-white border-2 border-blue-200 rounded-xl p-5">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
                  3
                </div>
                <h3 className="font-bold text-gray-900">우선순위 카드 생성</h3>
              </div>
              <p className="text-sm text-gray-600">
                긴급/고려/잘함으로 분류하고 할 일을 제안합니다
              </p>
            </div>

            {/* 단계 4 */}
            <div className="bg-white border-2 border-blue-200 rounded-xl p-5">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
                  4
                </div>
                <h3 className="font-bold text-gray-900">상세 분석 생성</h3>
              </div>
              <p className="text-sm text-gray-600">
                카테고리별 통계, 키워드, 예시를 정리합니다
              </p>
            </div>
          </div>
        </section>

        {/* 샘플 데이터 - 한 줄 요약 */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            샘플: 한 줄 요약
          </h2>
          <div className="bg-gradient-to-r from-amber-50 to-orange-50 border-2 border-amber-200 rounded-xl p-5">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center flex-shrink-0">
                <svg className="w-5 h-5 text-amber-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="flex-1">
                <p className="text-sm font-semibold text-amber-800 mb-1">이번 주 핵심</p>
                <p className="text-amber-700">{report.summary}</p>
              </div>
            </div>
          </div>
        </section>

        {/* 샘플 데이터 - 먼저 고칠 일 */}
        {firstUrgent && (
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              샘플: 먼저 고칠 일
            </h2>
            <ActionCard {...firstUrgent} />
          </section>
        )}

        {/* 샘플 데이터 - 상세 분석 */}
        {firstCategory && (
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              샘플: 상세 분석
            </h2>
            <CategoryDetailCard {...firstCategory} />
          </section>
        )}

        {/* CTA - 샘플 리포트 열기 */}
        <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl p-8 text-center text-white">
          <h2 className="text-2xl font-bold mb-3">
            전체 리포트를 확인해보세요
          </h2>
          <p className="text-blue-100 mb-6">
            {report.storeName}의 전체 분석 결과를 확인할 수 있습니다
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link 
              href="/report/store-1/"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-blue-600 font-bold rounded-xl hover:bg-blue-50 transition-colors shadow-lg"
            >
              <span>샘플 리포트 열기</span>
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </Link>
            <Link 
              href="/demo/"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-blue-500 text-white font-medium rounded-xl hover:bg-blue-400 transition-colors"
            >
              <span>메인으로 돌아가기</span>
            </Link>
          </div>
        </div>
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
