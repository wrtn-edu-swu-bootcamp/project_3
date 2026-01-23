// components/ui/InlineUrgentAlert.tsx
'use client';

import Link from 'next/link';

export interface UrgentAlert {
  storeId: string;
  storeName: string;
  issue: string;
}

interface InlineUrgentAlertProps {
  alert: UrgentAlert;
}

export function InlineUrgentAlert({ alert }: InlineUrgentAlertProps) {
  return (
    <Link
      href={`/report/${alert.storeId}/`}
      className="
        block container my-8
        bg-red-50 border-2 border-red-300
        rounded-2xl px-5 py-8
        hover:bg-red-100
        hover:border-red-400
        transition-all duration-200
        group
        shadow-sm hover:shadow-md
      "
    >
      <div className="flex items-center gap-4">
        {/* Warning Icon - More Prominent */}
        <div className="flex-shrink-0 w-12 h-12 rounded-full bg-red-500 flex items-center justify-center shadow-sm">
          <svg 
            className="w-6 h-6 text-white" 
            fill="currentColor" 
            viewBox="0 0 20 20"
          >
            <path 
              fillRule="evenodd" 
              d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" 
              clipRule="evenodd" 
            />
          </svg>
        </div>

        {/* Content - Larger and Bolder */}
        <div className="flex-1 min-w-0">
          <p className="text-base font-bold text-red-900">
            긴급: {alert.issue}
          </p>
        </div>

        {/* Arrow Link - More Prominent */}
        <div className="flex-shrink-0 flex items-center gap-1 text-red-600 font-bold text-base group-hover:gap-2 transition-all duration-200">
          <span>확인하기</span>
          <svg 
            className="w-5 h-5" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
            strokeWidth={2.5}
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
