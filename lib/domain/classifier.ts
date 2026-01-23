// lib/domain/classifier.ts
import type { Category } from '@/lib/types/review';

/**
 * 리뷰 내용을 분석하여 카테고리 분류
 * 우선순위: hygiene > packaging > delivery > price > food > etc (구체적인 것 우선)
 */
export function classifyCategory(content: string): Category {
  const lower = content.toLowerCase();

  // 1. 위생 문제 (최우선: 이물질/오염)
  const hygienePatterns = [
    '털', '이물질', '벌레', '머리카락', '곰팡이', '비닐', '비닐껍질',
    '플라스틱', '위생', '불결', '더러', '오염', '청결', '깨끗하지'
  ];
  
  if (hygienePatterns.some(term => lower.includes(term))) {
    return 'hygiene';
  }

  // 2. 포장 문제 (우선순위 2번째: 누수/파손 패턴)
  const packagingPatterns = [
    '포장', '용기', '뚜껑', '파손', '찢어', '터졌', '엎어', '눌렸', 
    '테이프', '밀봉', '누수', '샜', '새요', '흘렀', '흘러',
    '찌그러', '봉지'
  ];
  
  // 국물 누수 패턴 (포장 문제)
  if (lower.includes('국물') && 
      (lower.includes('샜') || lower.includes('새') || lower.includes('흘') || 
       lower.includes('엎어') || lower.includes('터') || lower.includes('누수'))) {
    return 'packaging';
  }
  
  if (packagingPatterns.some(term => lower.includes(term))) {
    return 'packaging';
  }

  // 3. 배달 문제
  const deliveryKeywords = ['배달', '늦', '지연', '빠르', '느리', '도착', '취소', '기사'];
  if (deliveryKeywords.some(term => lower.includes(term))) {
    return 'delivery';
  }

  // 4. 가격 문제
  const priceKeywords = ['가격', '비싸', '저렴', '비용', '할인', '쿠폰', '가성비'];
  if (priceKeywords.some(term => lower.includes(term))) {
    return 'price';
  }

  // 5. 음식 품질 (마지막: 일반적인 평가)
  const foodKeywords = ['맛', '신선', '양', '재료', '소스', '튀김', '치킨', '맵', '짜', '달', '떡', '치즈', '순대', '냉면', '파스타'];
  // '식'은 제외 (너무 포괄적)
  // '국물'은 단독으로는 food 판정 안 함 (포장 문제와 구분)
  if (foodKeywords.some(term => lower.includes(term))) {
    return 'food';
  }

  // 6. 기타 (서비스, 친절도 등)
  return 'etc';
}
