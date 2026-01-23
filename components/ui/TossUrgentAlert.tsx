// components/ui/TossUrgentAlert.tsx
'use client';

import Link from 'next/link';

interface TossUrgentAlertProps {
  storeCount?: number;
}

export function TossUrgentAlert({ storeCount = 3 }: TossUrgentAlertProps) {
  return (
    <Link
      href="/report/store-1/"
      className="block bg-red-50 border-2 border-red-200 rounded-2xl p-5 hover:bg-red-100 hover:border-red-300 transition-all group"
    >
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <span className="px-2 py-0.5 bg-red-500 text-white text-xs font-bold rounded">
              긴급
            </span>
            <h3 className="text-lg font-bold text-red-900">
              포장 파손 불만이 늘었어요
            </h3>
          </div>
          <p className="text-sm text-red-700">
            달떡볶이 공릉점 외 {storeCount - 1}곳
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
