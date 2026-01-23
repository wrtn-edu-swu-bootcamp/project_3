// components/ui/UrgentAlertCard.tsx
import Link from 'next/link';

interface UrgentAlertCardProps {
  storeId: string;
  storeName: string;
  emoji: string;
  issue: string;
  urgentCount: number;
}

export function UrgentAlertCard({ storeId, storeName, emoji, issue, urgentCount }: UrgentAlertCardProps) {
  return (
    <article className="
      relative overflow-hidden
      bg-gradient-to-r from-red-50 via-orange-50 to-amber-50
      border-l-4 border-red-500
      rounded-2xl p-5
      shadow-md hover:shadow-lg
      transition-all duration-200
      animate-fadeIn
    ">
      {/* 배경 펄스 효과 */}
      <div className="absolute top-0 right-0 w-24 h-24 bg-red-200/20 rounded-full blur-2xl animate-pulse" />
      
      <div className="relative z-10">
        {/* 긴급 뱃지 */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5 bg-red-500 text-white px-3 py-1 rounded-full text-xs font-bold">
              <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              긴급 {urgentCount}건
            </div>
          </div>
          <span className="text-xs text-red-600 font-medium">지금 확인 필요</span>
        </div>

        {/* 가게 정보 */}
        <div className="flex items-center gap-3 mb-3">
          <span className="text-2xl">{emoji}</span>
          <div>
            <h3 className="text-lg font-bold text-gray-900">{storeName}</h3>
            <p className="text-sm text-red-600 font-medium mt-0.5">{issue}</p>
          </div>
        </div>

        {/* 확인 버튼 */}
        <Link
          href={`/report/${storeId}/`}
          className="
            block w-full py-3 px-4
            bg-gradient-to-r from-red-500 to-orange-500
            hover:from-red-600 hover:to-orange-600
            text-white text-center font-semibold
            rounded-xl
            shadow-sm hover:shadow-md
            transition-all duration-200
            active:scale-[0.98]
          "
        >
          리포트 확인하기
        </Link>
      </div>
    </article>
  );
}
