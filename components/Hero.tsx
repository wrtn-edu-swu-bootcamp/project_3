/**
 * Hero (브랜드 영역)
 * Purpose: 서비스 가치 전달 (Screen 1만)
 * States: Static
 */
export default function Hero() {
  return (
    <header
      aria-label="리액션 서비스 소개"
      className="bg-bg-primary py-[40px] px-container-padding"
    >
      {/* Display Title - center */}
      <h1 className="text-display font-bold text-center mb-s">
        리액션
      </h1>

      {/* Subtitle - center, 작은 글씨 */}
      <p className="text-caption text-text-secondary text-center mb-m">
        사장님을 위한 리뷰 비서
      </p>

      {/* Support - left */}
      <p className="text-body text-text-secondary text-left mb-l">
        이번 주 리포트를 3분 요약으로 보여드려요
      </p>

      {/* Subtext - center */}
      <small className="text-caption text-text-tertiary text-center block" aria-label="영문명">
        RE:ACTION
      </small>
    </header>
  );
}
