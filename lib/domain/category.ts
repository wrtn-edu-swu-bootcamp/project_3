// lib/domain/category.ts
import type { Review, Category } from '@/lib/types/review';
import type { CategoryDetail } from '@/lib/types/report';
import { CATEGORY_DISPLAY } from '@/lib/utils/constants';

/**
 * 카테고리별 시드 키워드 딕셔너리
 */
const CATEGORY_SEED_KEYWORDS: Record<Category, string[]> = {
  packaging: ['포장', '용기', '뚜껑', '국물', '샜', '새요', '흘렀', '파손', '찌그러', '테이프', '비닐', '눌렸', '엎어', '봉지', '새'],
  delivery: ['배달', '늦', '지연', '빠르', '느리', '기사', '알뜰배달', '한집배달', '배송', '도착', '시간'],
  food: ['맛', '맵', '짜', '달', '신선', '양', '식었', '눅눅', '바삭', '맛있', '맛없', '신맛', '쓴맛'],
  price: ['가격', '비싸', '저렴', '쿠폰', '할인', '가성비', '비싼', '싼', '비용'],
  etc: ['친절', '불친절', '서비스', '응대']
};

/**
 * 스톱워드 (카테고리 맥락 무시하는 범용 표현)
 */
const STOPWORDS = ['맛있어요', '좋아요', '감사합니다', '합니다', '해요', '되요', '같아요', '이에요', '네요'];

/**
 * 키워드 추출 (카테고리별 맥락 고려)
 */
function extractKeywords(reviews: Review[], category: Category): string[] {
  // 1. 긍/부정 비율 계산
  const positive = reviews.filter(r => r.sentiment === 'positive').length;
  const negative = reviews.filter(r => r.sentiment === 'negative').length;
  const isNegativeDominant = negative >= positive;

  // 2. 해당 sentiment 리뷰만 필터
  const targetReviews = reviews.filter(r => 
    r.sentiment === (isNegativeDominant ? 'negative' : 'positive')
  );

  // 3. 단어 빈도 집계 (스톱워드 제외)
  const wordCount: Record<string, number> = {};
  const seedKeywords = CATEGORY_SEED_KEYWORDS[category] || [];

  targetReviews.forEach(review => {
    const words = review.content.match(/[가-힣]{2,6}/g) || [];
    words.forEach(word => {
      // 스톱워드 필터링
      if (STOPWORDS.some(sw => word.includes(sw))) return;
      wordCount[word] = (wordCount[word] || 0) + 1;
    });
  });

  // 4. 시드 키워드 포함 단어 우선 정렬
  const sorted = Object.entries(wordCount)
    .sort((a, b) => {
      // 시드 키워드 포함 여부로 1차 정렬
      const aHasSeed = seedKeywords.some(s => a[0].includes(s)) ? 1 : 0;
      const bHasSeed = seedKeywords.some(s => b[0].includes(s)) ? 1 : 0;
      if (bHasSeed !== aHasSeed) return bHasSeed - aHasSeed;
      // 빈도로 2차 정렬
      return b[1] - a[1];
    })
    .slice(0, 4)
    .map(([word]) => word);

  // 5. 최소 2개 보장 (시드 키워드 fallback)
  if (sorted.length < 2 && seedKeywords.length >= 2) {
    return seedKeywords.slice(0, 2);
  }
  
  return sorted.length >= 2 ? sorted : ['키워드', '분석중'];
}

/**
 * 카테고리 상세 생성
 */
export function generateCategoryDetails(reviews: Review[]): CategoryDetail[] {
  // 카테고리별 그룹화
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

  // 각 카테고리 처리
  return Object.entries(grouped)
    .filter(([_, items]) => items.length > 0)
    .map(([cat, items]) => {
      const category = cat as Category;
      const total = items.length;
      const positive = items.filter(r => r.sentiment === 'positive').length;
      const negative = items.filter(r => r.sentiment === 'negative').length;

      // 키워드 추출 (카테고리별, 감성 기반)
      const keywords = extractKeywords(items, category);

      // 부정 예시 (긴 리뷰 우선, 최대 3개)
      let negativeExamples = items
        .filter(r => r.sentiment === 'negative')
        .sort((a, b) => b.content.length - a.content.length)
        .slice(0, 3)
        .map(r => r.content);

      // fallback: 부정 리뷰 없으면 가장 구체적인 리뷰 사용
      if (negativeExamples.length === 0 && items.length > 0) {
        const longestReview = items.sort((a, b) => b.content.length - a.content.length)[0];
        negativeExamples = [longestReview.content];
      }

      // 배달 경험 언급 체크
      const hasDeliveryNote = category === 'delivery' && 
        items.some(r => r.content.includes('알뜰배달') || r.content.includes('한집배달'));

      return {
        category,
        displayName: CATEGORY_DISPLAY[category],
        positivePercent: Math.round((positive / total) * 100),
        negativePercent: Math.round((negative / total) * 100),
        keywords,
        negativeExamples,
        hasDeliveryNote
      };
    });
}
