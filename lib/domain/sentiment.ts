// lib/domain/sentiment.ts
import type { Sentiment } from '@/lib/types/review';

/**
 * 별점 + 키워드 기반 감성 분석
 */
export function analyzeSentiment(content: string, rating: number): Sentiment {
  // 1-2점: 부정, 4-5점: 긍정
  if (rating <= 2) return 'negative';
  if (rating >= 4) return 'positive';

  // 3점 리뷰는 내용으로 판단
  const positiveKeywords = ['맛있', '좋', '친절', '빠르', '신선', '만족', '추천'];
  const negativeKeywords = ['별로', '늦', '식', '파손', '짜', '맵', '비싸', '실망'];

  const positiveCount = positiveKeywords.filter(k => content.includes(k)).length;
  const negativeCount = negativeKeywords.filter(k => content.includes(k)).length;

  if (positiveCount > negativeCount) return 'positive';
  if (negativeCount > positiveCount) return 'negative';
  return 'neutral';
}
