// components/ui/DisclaimerAccordion.tsx
'use client';

import { useState, useId } from 'react';

export function DisclaimerAccordion() {
  const [isExpanded, setIsExpanded] = useState(false);
  const contentId = useId();

  return (
    <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
      <button
        aria-expanded={isExpanded}
        aria-controls={contentId}
        aria-label="면책 보기"
        onClick={() => setIsExpanded(!isExpanded)}
        className="
          w-full py-4 px-5 
          flex items-center justify-between
          hover:bg-gray-50 
          transition-colors 
          text-gray-700
          focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue-400
        "
      >
        <div className="flex items-center gap-2">
          <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
          </svg>
          <span className="font-medium">면책 조항</span>
        </div>
        <svg 
          className={`w-5 h-5 text-gray-400 transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`}
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      <div
        id={contentId}
        role="region"
        className={`
          overflow-hidden transition-all duration-200
          ${isExpanded ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'}
        `}
      >
        <div className="px-5 pb-4 pt-0">
          <p className="text-sm text-gray-600 leading-relaxed">
            이 리포트는 AI가 리뷰 데이터를 분석한 결과예요. 
            최종 결정은 사장님께 있으며, 가게 상황에 맞게 조정해주세요.
          </p>
        </div>
      </div>
    </div>
  );
}
