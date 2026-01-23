// components/ui/ActionCard.tsx
'use client';

import { useState, useId } from 'react';
import type { ActionCard as ActionCardType } from '@/lib/types/report';
import { formatCost, formatTime, formatDifficulty } from '@/lib/utils/formatters';

export function ActionCard({ 
  priority, category, issue, metric, action, alternatives 
}: ActionCardType) {
  const [isExpanded, setIsExpanded] = useState(false);
  const accordionId = useId();

  const config = {
    urgent: {
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M8.485 2.495c.673-1.167 2.357-1.167 3.03 0l6.28 10.875c.673 1.167-.17 2.625-1.516 2.625H3.72c-1.347 0-2.189-1.458-1.515-2.625L8.485 2.495zM10 5a.75.75 0 01.75.75v3.5a.75.75 0 01-1.5 0v-3.5A.75.75 0 0110 5zm0 9a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
        </svg>
      ),
      label: '긴급',
      labelBg: 'bg-red-500',
      borderColor: 'border-l-red-500',
      bgGradient: 'bg-gradient-to-r from-red-50 to-white',
      textColor: 'text-red-600'
    },
    consider: {
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
          <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
        </svg>
      ),
      label: '고려',
      labelBg: 'bg-orange-500',
      borderColor: 'border-l-orange-500',
      bgGradient: 'bg-gradient-to-r from-orange-50 to-white',
      textColor: 'text-orange-600'
    },
    good: {
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" />
        </svg>
      ),
      label: '잘함',
      labelBg: 'bg-green-500',
      borderColor: 'border-l-green-500',
      bgGradient: 'bg-gradient-to-r from-green-50 to-white',
      textColor: 'text-green-600'
    }
  };

  const { icon, label, labelBg, borderColor, bgGradient, textColor } = config[priority];

  return (
    <article
      className={`
        rounded-2xl border-l-4 ${borderColor} ${bgGradient}
        p-5 shadow-sm hover:shadow-md
        transition-all duration-200
        animate-fadeIn
      `}
    >
      {/* 헤더 */}
      <div className="flex items-center gap-3 mb-4">
        <span className={`
          inline-flex items-center gap-1.5 
          px-3 py-1 rounded-full 
          ${labelBg} text-white text-sm font-medium
        `}>
          {icon}
          {label}
        </span>
        <span className="text-sm text-gray-500">{category}</span>
      </div>

      {/* 이슈 타이틀 */}
      <h3 className="text-lg font-bold text-gray-900 mb-2">
        {issue}
      </h3>

      {/* 메트릭 */}
      <div className="flex items-center gap-2 mb-4">
        <span className={`text-2xl font-bold ${textColor}`}>
          {metric.percentage}%
        </span>
        <span className="text-gray-500 text-sm">
          {metric.sentiment} · {metric.count}건
        </span>
      </div>

      {/* 추천 액션 */}
      <div className="bg-white rounded-xl p-4 border border-gray-100 mb-3">
        <div className="flex items-start gap-3">
          <span className="text-xl">💡</span>
          <div className="flex-1">
            <p className="font-medium text-gray-900 mb-2">{action.text}</p>
            <div className="flex gap-2">
              <span className="px-2.5 py-1 bg-gray-100 rounded-lg text-xs text-gray-600">
                {formatCost(action.cost)}
              </span>
              <span className="px-2.5 py-1 bg-gray-100 rounded-lg text-xs text-gray-600">
                {formatTime(action.time)}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 대안 아코디언 */}
      {alternatives && alternatives.length > 0 && (
        <div className="mt-3">
          <button
            aria-expanded={isExpanded}
            aria-controls={`alternatives-${accordionId}`}
            onClick={() => setIsExpanded(!isExpanded)}
            className="
              w-full py-2.5 px-4 
              bg-gray-50 hover:bg-gray-100 
              rounded-xl
              text-sm text-gray-600 font-medium
              flex items-center justify-center gap-2
              transition-colors duration-200
            "
          >
            다른 방법 {alternatives.length}개
            <svg 
              className={`w-4 h-4 transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`} 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          {isExpanded && (
            <div
              id={`alternatives-${accordionId}`}
              className="mt-3 space-y-2 animate-fadeIn"
            >
              {alternatives.map((alt, index) => (
                <div
                  key={index}
                  className="p-3 bg-white rounded-xl border border-gray-100"
                >
                  <p className="text-sm font-medium text-gray-800 mb-2">{alt.text}</p>
                  <div className="flex gap-2">
                    <span className="px-2 py-0.5 bg-gray-50 rounded text-xs text-gray-500">
                      {formatCost(alt.cost)}
                    </span>
                    <span className="px-2 py-0.5 bg-gray-50 rounded text-xs text-gray-500">
                      {formatTime(alt.time)}
                    </span>
                    {alt.difficulty && (
                      <span className="px-2 py-0.5 bg-gray-50 rounded text-xs text-gray-500">
                        {formatDifficulty(alt.difficulty)}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </article>
  );
}
