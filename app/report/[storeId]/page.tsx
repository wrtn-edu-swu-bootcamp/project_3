// app/report/[storeId]/page.tsx
// ⚠️ Server Component - 'use client' 제거!

import { notFound } from 'next/navigation';
import { AppHeader } from '@/components/ui/AppHeader';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { ActionCard } from '@/components/ui/ActionCard';
import { EmptyState } from '@/components/ui/EmptyState';
import { BadgeChips } from '@/components/ui/BadgeChips';
import { FeedbackButtons } from '@/components/ui/FeedbackButtons';
import { CategoryDetailCard } from '@/components/ui/CategoryDetailCard';
import { DisclaimerAccordion } from '@/components/ui/DisclaimerAccordion';
import { loadReport } from '@/lib/data/loader';
import { STORE_IDS } from '@/lib/utils/constants';

// Static Export용 경로 생성
export async function generateStaticParams() {
  return STORE_IDS.map(storeId => ({ storeId }));
}

// ⚠️ Next.js 15: params가 Promise
interface ReportPageProps {
  params: Promise<{ storeId: string }>;
}

export default async function ReportPage({ params }: ReportPageProps) {
  const { storeId } = await params;  // ⚠️ await 필수
  
  if (!STORE_IDS.includes(storeId as any)) {
    notFound();
  }

  const report = loadReport(storeId);

  const formatDate = (date: string) => {
    const [, month, day] = date.split('-');
    return `${parseInt(month)}/${parseInt(day)}`;
  };

  return (
    <>
      <AppHeader showBack />
      
      <main className="space-y-6 pb-10">
        {/* 가게 헤더 - 따뜻한 그라데이션 배경 */}
        <section className="relative overflow-hidden bg-gradient-to-br from-orange-400 via-amber-500 to-orange-600 px-5 pt-6 pb-8 -mx-0 rounded-b-3xl shadow-lg">
          {/* 배경 장식 */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2" />
          
          <div className="relative z-10">
            {/* 가게 이모지 + 이름 */}
            <div className="flex items-center gap-3 mb-3">
              <div className="w-14 h-14 bg-white rounded-2xl shadow-md flex items-center justify-center text-3xl">
                {report.emoji}
              </div>
              <div>
                <h1 className="text-xl font-bold text-white">
                  {report.storeName}
                </h1>
                <p className="text-orange-50 text-sm">
                  {report.category}
                </p>
              </div>
            </div>
            
            {/* 기간 & 리뷰 수 */}
            <div className="flex items-center gap-4 mt-4">
              <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-3 py-1.5">
                <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span className="text-white text-sm font-medium">
                  {formatDate(report.period.start)} ~ {formatDate(report.period.end)}
                </span>
              </div>
              <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-3 py-1.5">
                <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                </svg>
                <span className="text-white text-sm font-medium">
                  리뷰 {report.totalReviews}개
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* 한 줄 요약 */}
        <div className="mx-5 p-4 bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-2xl shadow-sm">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 bg-amber-100 rounded-full flex items-center justify-center flex-shrink-0">
              <svg className="w-4 h-4 text-amber-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
            </div>
            <div>
              <p className="text-sm font-semibold text-amber-800 mb-0.5">이번 주 핵심</p>
              <p className="text-amber-700">{report.summary}</p>
            </div>
          </div>
        </div>

        {/* 먼저 고칠 일 */}
        <section className="px-5">
          <SectionHeader 
            title="먼저 고칠 일"
            support={
              report.priorities.urgent.length > 0 
                ? "가장 급한 1가지만 먼저 볼게요"
                : "급한 건 없어요. 개선 후보를 볼게요"
            }
          />

          <div className="space-y-4">
            {/* Urgent items */}
            {report.priorities.urgent.length > 0 ? (
              report.priorities.urgent.map((card, index) => (
                <ActionCard key={`urgent-${index}`} {...card} />
              ))
            ) : report.priorities.consider.length > 0 ? (
              report.priorities.consider.map((card, index) => (
                <ActionCard key={`consider-${index}`} {...card} />
              ))
            ) : (
              <EmptyState type="static" />
            )}

            {/* Consider items (only if urgent exists) */}
            {report.priorities.urgent.length > 0 && report.priorities.consider.map((card, index) => (
              <ActionCard key={`consider-${index}`} {...card} />
            ))}
          </div>
        </section>

        {/* 잘한 점 - 이미 언급된 카테고리 제외 */}
        {(() => {
          // Extract categories already shown in urgent and consider
          const urgentCategories = report.priorities.urgent.map(item => item.category);
          const considerCategories = report.priorities.consider.map(item => item.category);
          const usedCategories = [...urgentCategories, ...considerCategories];
          
          // Filter good items to exclude already mentioned categories
          const uniqueGoodItems = report.priorities.good.filter(
            goodItem => !usedCategories.includes(goodItem.category)
          );

          // Only render section if there are unique good items
          if (uniqueGoodItems.length === 0) return null;

          return (
            <section className="px-5">
              <SectionHeader 
                title="잘한 점"
                support="계속 유지하면 좋을 점들이에요"
              />
              <div className="space-y-4">
                {uniqueGoodItems.map((card, index) => (
                  <ActionCard key={`good-${index}`} {...card} />
                ))}
              </div>
            </section>
          );
        })()}

        {/* 상세 분석 */}
        <section className="px-5">
          <SectionHeader title="상세 분석" withBackground />
          <div className="space-y-4">
            {report.categoryDetails.map((detail, index) => (
              <CategoryDetailCard key={index} {...detail} />
            ))}
          </div>
        </section>

        {/* 참고하세요 */}
        <section className="px-5 space-y-3">
          <BadgeChips badges={report.badges} />
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            일부 리뷰 누락 가능
          </div>
          <DisclaimerAccordion />
        </section>

        {/* 피드백 */}
        <div className="px-5">
          <FeedbackButtons storeId={storeId} />
        </div>
      </main>
    </>
  );
}
