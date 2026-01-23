// lib/types/report.ts
import { Review, Category } from './review';

/** 우선순위 레벨 */
export type Priority = 'urgent' | 'consider' | 'good';

/** 액션 제안 아이템 */
export interface ActionItem {
  text: string;
  cost: '낮' | '중' | '높';
  time: '짧' | '중' | '김';
  difficulty?: '하' | '중' | '상';
}

/** 액션 카드 */
export interface ActionCard {
  priority: Priority;
  category: string;                       // 카테고리 표시명
  issue: string;                          // 이슈명
  metric: {
    sentiment: '부정' | '긍정';
    percentage: number;
    count: number;
  };
  action: ActionItem;
  alternatives?: ActionItem[];
}

/** 카테고리 상세 */
export interface CategoryDetail {
  category: Category;
  displayName: string;
  positivePercent: number;
  negativePercent: number;
  keywords: string[];
  negativeExamples: string[];
  hasDeliveryNote?: boolean;
}

/** 배지 타입 */
export type BadgeType = 
  | 'sample_small'
  | 'low_confidence'
  | 'event_possible';

/** 주간 리포트 */
export interface WeeklyReport {
  storeId: string;                        // store-1, store-2, store-3
  storeName: string;                      // 달떡볶이 공릉점
  emoji: string;                          // 🍜 (타입 불일치 해결: 추가)
  category: string;                       // 분식 (타입 불일치 해결: 추가)
  period: {
    start: string;                        // 2026-01-12
    end: string;                          // 2026-01-18
  };
  totalReviews: number;
  summary: string;
  priorities: {
    urgent: ActionCard[];
    consider: ActionCard[];
    good: ActionCard[];
  };
  categoryDetails: CategoryDetail[];
  badges: BadgeType[];
}
