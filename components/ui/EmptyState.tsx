// components/ui/EmptyState.tsx
interface EmptyStateProps {
  type?: 'dynamic' | 'static';
}

export function EmptyState({ type = 'static' }: EmptyStateProps) {
  const dynamicProps = type === 'dynamic' ? {
    role: 'status' as const,
    'aria-live': 'polite' as const
  } : {};

  return (
    <div
      {...dynamicProps}
      aria-label="긴급 문제 없음"
      className="
        w-full py-10 
        flex flex-col items-center justify-center 
        bg-gradient-to-br from-green-50 to-emerald-50
        border border-green-100 
        rounded-2xl
      "
    >
      <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
        <svg className="w-8 h-8 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </div>
      <p className="text-lg font-semibold text-green-800 mb-1">
        긴급한 문제가 없어요
      </p>
      <p className="text-sm text-green-600">
        이번 주도 잘 운영하고 계시네요!
      </p>
    </div>
  );
}
