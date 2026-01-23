// components/ui/TossUrgentAlert.tsx
'use client';

import Link from 'next/link';
import type { WeeklyReport } from '@/lib/types/report';

interface TossUrgentAlertProps {
  urgentReports: WeeklyReport[];
}

export function TossUrgentAlert({ urgentReports }: TossUrgentAlertProps) {
  if (urgentReports.length === 0) return null;

  const firstReport = urgentReports[0];
  const firstIssue = firstReport.priorities.urgent[0];
  const storeName = firstReport.storeName;
  const storeId = firstReport.storeId;
  const otherCount = urgentReports.length - 1;

  return (
    <Link
      href={`/report/${storeId}/`}
      className="block bg-red-50 border-2 border-red-200 rounded-2xl p-5 hover:bg-red-100 hover:border-red-300 transition-all group"
    >
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <span className="px-2 py-0.5 bg-red-500 text-white text-xs font-bold rounded">
              긴급
            </span>
            <h3 className="text-lg font-bold text-red-900">
              {firstIssue?.issue || '긴급 확인 필요'}
            </h3>
          </div>
          <p className="text-sm text-red-700">
            {storeName}{otherCount > 0 ? ` 외 ${otherCount}곳` : ''}
          </p>
        </div>
        <div className="flex items-center gap-1 text-red-600 font-bold group-hover:gap-2 transition-all">
          <span>확인하기</span>
          <svg 
            className="w-5 h-5" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
            strokeWidth={3}
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              d="M9 5l7 7-7 7" 
            />
          </svg>
        </div>
      </div>
    </Link>
  );
}
