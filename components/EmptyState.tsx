/**
 * Empty State
 * Purpose: 긴급 문제 없음 안내
 * Type: Dynamic (role="status") vs Static (role 없음)
 */
interface EmptyStateProps {
  isDynamic?: boolean;
  message?: string;
}

export default function EmptyState({
  isDynamic = false,
  message = "이번 주는 긴급한 문제가 없어요",
}: EmptyStateProps) {
  const content = (
    <>
      <span aria-hidden="true" className="text-4xl mb-m block">
        🎉
      </span>
      <p className="text-large-body">{message}</p>
    </>
  );

  if (isDynamic) {
    // Dynamic: 로딩 결과
    return (
      <div
        role="status"
        aria-live="polite"
        aria-label="긴급 문제 없음"
        className="card h-[160px] bg-bg-secondary border border-border-default rounded-card py-[40px] px-card-padding flex flex-col items-center justify-center text-center"
      >
        {content}
      </div>
    );
  }

  // Static: 초기 화면
  return (
    <div
      aria-label="긴급 문제 없음"
      className="card h-[160px] bg-bg-secondary border border-border-default rounded-card py-[40px] px-card-padding flex flex-col items-center justify-center text-center"
    >
      {content}
    </div>
  );
}
