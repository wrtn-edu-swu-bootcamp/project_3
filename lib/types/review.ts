// lib/types/review.ts

/** 엑셀에서 읽은 원본 리뷰 */
export interface RawReview {
  content: string;      // 리뷰 내용
  rating: number;       // 별점 1-5
  date: string;         // 작성 날짜
}

/** 카테고리 (5가지 고정) */
export type Category = 
  | 'food'        // 음식 품질
  | 'delivery'    // 배달·서비스
  | 'packaging'   // 포장
  | 'price'       // 가격
  | 'etc';        // 기타

/** 감성 분석 결과 */
export type Sentiment = 'positive' | 'negative' | 'neutral';

/** 분석 완료된 리뷰 */
export interface Review extends RawReview {
  category: Category;
  sentiment: Sentiment;
}
