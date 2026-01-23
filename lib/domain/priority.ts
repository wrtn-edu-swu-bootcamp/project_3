// lib/domain/priority.ts
import type { Review, Category } from '@/lib/types/review';
import type { Priority, ActionCard } from '@/lib/types/report';
import { CATEGORY_DISPLAY } from '@/lib/utils/constants';

/**
 * 카테고리별로 리뷰 그룹화
 */
function groupByCategory(reviews: Review[]): Record<Category, Review[]> {
  const grouped: Record<Category, Review[]> = {
    food: [],
    delivery: [],
    packaging: [],
    price: [],
    etc: []
  };

  reviews.forEach(review => {
    grouped[review.category].push(review);
  });

  return grouped;
}

/**
 * 이슈명 생성 (긍정/부정에 따라 다른 이슈명 반환)
 */
function generateIssueName(category: Category, priority: Priority): string {
  // 긍정적인 경우 (잘함)
  if (priority === 'good') {
    const positiveMap: Record<Category, string> = {
      food: '음식 품질 우수',
      delivery: '배달 만족도 높음',
      packaging: '포장 상태 양호',
      price: '가격 만족도 높음',
      etc: '전반적으로 좋은 평가'
    };
    return positiveMap[category];
  }

  // 부정적인 경우 (긴급/고려)
  const negativeMap: Record<Category, string> = {
    food: '맛/신선도 불만',
    delivery: '배달 시간 지연',
    packaging: '포장 파손',
    price: '가격 불만',
    etc: '기타 불만'
  };
  return negativeMap[category];
}

/**
 * 우선순위 점수 계산
 * @param reviews - 분석 완료된 리뷰 배열
 * @returns ActionCard[] (action, alternatives 제외) - 정렬됨
 */
export function scorePriority(reviews: Review[]): Omit<ActionCard, 'action' | 'alternatives'>[] {
  const grouped = groupByCategory(reviews);

  const result: Omit<ActionCard, 'action' | 'alternatives'>[] = [];

  Object.entries(grouped).forEach(([cat, items]) => {
    const category = cat as Category;
    if (items.length === 0) return;

    const total = items.length;
    const negative = items.filter(r => r.sentiment === 'negative').length;
    const positive = items.filter(r => r.sentiment === 'positive').length;
    const percentage = Math.round((negative / total) * 100);
    const positivePercentage = Math.round((positive / total) * 100);

    // 우선순위 판단
    let priority: Priority;
    let sentiment: '부정' | '긍정';
    let finalPercentage: number;
    let count: number;

    if (percentage >= 30) {
      priority = 'urgent';
      sentiment = '부정';
      finalPercentage = percentage;
      count = negative;
    } else if (percentage >= 15) {
      priority = 'consider';
      sentiment = '부정';
      finalPercentage = percentage;
      count = negative;
    } else if (positivePercentage >= 70) {
      priority = 'good';
      sentiment = '긍정';
      finalPercentage = positivePercentage;
      count = positive;
    } else {
      return;  // 기준 미달: 제외
    }

    result.push({
      priority,
      category: CATEGORY_DISPLAY[category],
      issue: generateIssueName(category, priority),
      metric: {
        sentiment,
        percentage: finalPercentage,
        count
      }
    });
  });

  // 정렬 규칙: 우선순위 > 비율 내림차순
  // 1. urgent 카드: 부정 비율 높은 순
  // 2. consider 카드: 부정 비율 높은 순
  // 3. good 카드: 긍정 비율 높은 순
  result.sort((a, b) => {
    // 1차: 우선순위 (urgent > consider > good)
    const priorityOrder = { urgent: 0, consider: 1, good: 2 };
    if (priorityOrder[a.priority] !== priorityOrder[b.priority]) {
      return priorityOrder[a.priority] - priorityOrder[b.priority];
    }
    
    // 2차: 비율 내림차순 (같은 우선순위 내에서)
    return b.metric.percentage - a.metric.percentage;
  });

  return result;
}
