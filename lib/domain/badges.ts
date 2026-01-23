// lib/domain/badges.ts
import type { Review } from '@/lib/types/review';
import type { BadgeType } from '@/lib/types/report';

/**
 * 배지 생성 (신뢰도 안내)
 */
export function generateBadges(reviews: Review[]): BadgeType[] {
  const badges: BadgeType[] = [];

  // 표본 부족: 총 리뷰 < 10개
  if (reviews.length < 10) {
    badges.push('sample_small');
  }

  // 확신 낮음: 총 리뷰 < 20개
  if (reviews.length < 20) {
    badges.push('low_confidence');
  }

  // 이벤트 가능성: TODO (날짜 분석 로직 필요)

  return badges;
}
