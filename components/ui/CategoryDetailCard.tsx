// components/ui/CategoryDetailCard.tsx
import type { CategoryDetail } from '@/lib/types/report';

export function CategoryDetailCard({
  displayName,
  positivePercent,
  negativePercent,
  keywords,
  negativeExamples,
  hasDeliveryNote
}: CategoryDetail) {
  // 긍정 비율에 따른 색상
  const isPositive = positivePercent >= 70;
  const isNegative = negativePercent >= 30;

  return (
    <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm space-y-4">
      {/* 헤더 */}
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-bold text-gray-900">
          {displayName}
        </h3>
        {isPositive && (
          <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full">
            좋음
          </span>
        )}
        {isNegative && (
          <span className="px-2 py-1 bg-red-100 text-red-700 text-xs font-medium rounded-full">
            주의
          </span>
        )}
      </div>

      {/* 긍정/부정 바 */}
      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-green-600 font-medium">긍정 {positivePercent}%</span>
          <span className="text-red-500 font-medium">부정 {negativePercent}%</span>
        </div>
        <div className="h-2 bg-gray-100 rounded-full overflow-hidden flex">
          <div 
            className="bg-gradient-to-r from-green-400 to-green-500 transition-all duration-500"
            style={{ width: `${positivePercent}%` }}
          />
          <div 
            className="bg-gradient-to-r from-red-400 to-red-500 transition-all duration-500"
            style={{ width: `${negativePercent}%` }}
          />
        </div>
      </div>

      {/* 키워드 */}
      {keywords.length > 0 && (
        <div>
          <p className="text-sm text-gray-500 mb-2">자주 나온 말</p>
          <div className="flex flex-wrap gap-2">
            {keywords.map((kw, idx) => (
              <span 
                key={idx}
                className="px-3 py-1.5 bg-blue-50 text-blue-700 text-sm rounded-full"
              >
                {kw}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* 리뷰 예시 (긍정/부정 동적 표시) */}
      {negativeExamples.length > 0 && (
        <div className="pt-3 border-t border-gray-100">
          {(() => {
            const isPositiveDominant = positivePercent > negativePercent;
            const iconColor = isPositiveDominant ? 'text-green-400' : 'text-red-400';
            const label = isPositiveDominant ? '긍정 리뷰 예시' : '부정 리뷰 예시';
            const iconPath = isPositiveDominant 
              ? 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z' // 체크 아이콘
              : 'M8.485 2.495c.673-1.167 2.357-1.167 3.03 0l6.28 10.875c.673 1.167-.17 2.625-1.516 2.625H3.72c-1.347 0-2.189-1.458-1.515-2.625L8.485 2.495z'; // 경고 아이콘
            
            return (
              <p className="text-sm text-gray-500 mb-2 flex items-center gap-1">
                <svg className={`w-4 h-4 ${iconColor}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d={iconPath} />
                </svg>
                {label}
              </p>
            );
          })()}

          <div className="space-y-2">
            {negativeExamples.slice(0, 2).map((example, idx) => (
              <p 
                key={idx} 
                className="text-sm text-gray-600 bg-gray-50 p-3 rounded-xl line-clamp-2"
              >
                "{example}"
              </p>
            ))}
          </div>
        </div>
      )}

      {/* 배달 노트 */}
      {hasDeliveryNote && (
        <div className="flex items-center gap-2 p-3 bg-blue-50 rounded-xl">
          <svg className="w-5 h-5 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <p className="text-sm text-blue-700">
            알뜰배달/한집배달 관련 언급이 많아요
          </p>
        </div>
      )}
    </div>
  );
}
