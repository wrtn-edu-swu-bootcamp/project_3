// components/ui/UrgentAlertSection.tsx
'use client';

import { useState } from 'react';
import type { WeeklyReport } from '@/lib/types/report';
import { UrgentAlertCard } from './UrgentAlertCard';

interface UrgentAlertSectionProps {
  reports: WeeklyReport[];
}

export function UrgentAlertSection({ reports }: UrgentAlertSectionProps) {
  const [isOpen, setIsOpen] = useState(true);

  // 긴급 사항이 있는 가게만 필터링
  const urgentReports = reports
    .filter(report => report.priorities.urgent.length > 0)
    .map(report => ({
      storeId: report.storeId,
      storeName: report.storeName,
      emoji: report.emoji,
      urgentCount: report.priorities.urgent.length,
      // 첫 번째 긴급 이슈만 표시
      issue: report.priorities.urgent[0]?.issue || '긴급 확인 필요'
    }))
    .slice(0, 3); // 최대 3개까지만 표시

  // 긴급 사항이 없거나 닫혀있으면 렌더링하지 않음
  if (urgentReports.length === 0 || !isOpen) {
    return null;
  }

  return (
    <>
      {/* 오버레이 */}
      <div 
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 animate-fadeIn"
        onClick={() => setIsOpen(false)}
      />

      {/* 모달 */}
      <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 pointer-events-none">
        <div 
          className="
            relative w-full max-w-4xl
            bg-white rounded-3xl shadow-2xl
            pointer-events-auto
            animate-slideUp
          "
          onClick={(e) => e.stopPropagation()}
        >
          {/* X 닫기 버튼 */}
          <button
            onClick={() => setIsOpen(false)}
            aria-label="닫기"
            className="
              absolute top-4 right-4
              w-10 h-10 rounded-full
              flex items-center justify-center
              text-gray-400 hover:text-gray-600
              hover:bg-gray-100
              transition-colors duration-200
              z-10
            "
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* 모달 내용 */}
          <div className="p-8">
            {/* 헤더 */}
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center animate-pulse">
                  <svg className="w-6 h-6 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">
                    긴급 확인 필요
                  </h2>
                  <p className="text-sm text-gray-600 mt-0.5">
                    지금 바로 대응이 필요한 이슈가 있어요
                  </p>
                </div>
              </div>
            </div>

            {/* 긴급 알림 카드들 */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 max-h-[60vh] overflow-y-auto pr-2">
              {urgentReports.map((report) => (
                <UrgentAlertCard key={report.storeId} {...report} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
