// components/ui/FeedbackButtons.tsx
'use client';

import { useState } from 'react';
import Link from 'next/link';

interface FeedbackButtonsProps {
  storeId: string;
}

export function FeedbackButtons({ storeId }: FeedbackButtonsProps) {
  const [selected, setSelected] = useState<'helpful' | 'disappointing' | null>(null);

  return (
    <section className="bg-gray-50 rounded-2xl p-6 space-y-4">
      <p className="text-center text-gray-700 font-medium">
        이 리포트가 도움이 됐나요?
      </p>

      <div className="flex gap-3 justify-center">
        <button
          aria-label="도움이 되었습니다"
          onClick={() => setSelected('helpful')}
          className={`
            flex-1 max-w-[140px] py-3.5
            flex items-center justify-center gap-2 
            rounded-xl font-medium
            transition-all duration-200
            ${selected === 'helpful' 
              ? 'bg-green-500 text-white shadow-md' 
              : 'bg-white text-gray-700 border border-gray-200 hover:border-green-300 hover:bg-green-50'
            }
          `}
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z" />
          </svg>
          도움돼요
        </button>

        <button
          aria-label="아쉬웠습니다"
          onClick={() => setSelected('disappointing')}
          className={`
            flex-1 max-w-[140px] py-3.5
            flex items-center justify-center gap-2 
            rounded-xl font-medium
            transition-all duration-200
            ${selected === 'disappointing' 
              ? 'bg-red-500 text-white shadow-md' 
              : 'bg-white text-gray-700 border border-gray-200 hover:border-red-300 hover:bg-red-50'
            }
          `}
        >
          <svg className="w-5 h-5 rotate-180" fill="currentColor" viewBox="0 0 20 20">
            <path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z" />
          </svg>
          아쉬워요
        </button>
      </div>

      {selected && (
        <div className="text-center text-sm text-gray-500 animate-fadeIn">
          피드백 감사합니다! 더 좋은 서비스를 만들게요.
        </div>
      )}

      <Link
        href={`/survey?from=${storeId}`}
        className="
          block w-full py-3 
          bg-white border border-gray-200 
          rounded-xl
          text-center text-gray-600 font-medium
          hover:bg-gray-50 hover:border-gray-300
          transition-all duration-200
          flex items-center justify-center gap-2
        "
      >
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
        의견 남기기
      </Link>
    </section>
  );
}
