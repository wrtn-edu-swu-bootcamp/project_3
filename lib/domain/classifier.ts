// lib/domain/classifier.ts
import type { Category } from '@/lib/types/review';

/**
 * 리뷰 내용을 분석하여 카테고리 분류
 */
export function classifyCategory(content: string): Category {
  const keywords = {
    food: ['맛', '신선', '양', '재료', '소스', '튀김', '치킨', '국물', '맵', '짜', '달', '식'],
    delivery: ['배달', '시간', '늦', '빠르', '느리', '도착', '지연', '취소'],
    packaging: ['포장', '용기', '파손', '새', '국물', '찌그러', '엎어짐'],
    price: ['가격', '비싸', '저렴', '비용', '할인', '쿠폰', '양에 비해'],
    etc: []
  };

  // 우선순위: food > delivery > packaging > price > etc
  for (const [category, terms] of Object.entries(keywords)) {
    if (category === 'etc') continue;
    if (terms.some(term => content.includes(term))) {
      return category as Category;
    }
  }

  return 'etc';
}
