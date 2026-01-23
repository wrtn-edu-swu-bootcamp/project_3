// lib/utils/constants.ts
import type { Category } from '@/lib/types/review';

/** 가게 ID 목록 (단일 소스) */
export const STORE_IDS = ['store-1', 'store-2', 'store-3', 'store-4', 'store-5'] as const;
export type StoreId = typeof STORE_IDS[number];

/** 가게 설정 */
export const STORE_CONFIG = [
  { 
    id: 'store-1', 
    name: '달떡볶이 공릉점', 
    file: '배달의민족_리뷰_수집_달떡볶이 공릉점.xlsx',
    emoji: '🍜',
    category: '분식'
  },
  { 
    id: 'store-2', 
    name: '처갓집양념치킨 공릉점', 
    file: '배달의민족_리뷰_수집_처갓집양념치킨 공릉점.xlsx',
    emoji: '🍗',
    category: '치킨/튀김'
  },
  { 
    id: 'store-3', 
    name: '춘리마라탕 묵동점', 
    file: '배달의민족_리뷰_수집_춘리마라탕 묵동점.xlsx',
    emoji: '🌶️',
    category: '중식'
  },
  { 
    id: 'store-4', 
    name: '구구족 별내점', 
    file: '배달의민족_리뷰_수집_구구족 별내점.xlsx',
    emoji: '🦶',
    category: '족발/보쌈'
  },
  { 
    id: 'store-5', 
    name: '파스타입니다 공릉점', 
    file: '배달의민족_리뷰_수집_파스타입니다 공릉점.xlsx',
    emoji: '🍝',
    category: '양식'
  }
] as const;

/** 카테고리 표시명 매핑 */
export const CATEGORY_DISPLAY: Record<Category, string> = {
  food: '🍴 음식 품질',
  delivery: '🚗 배달·서비스',
  packaging: '📦 포장',
  hygiene: '🧼 위생',
  price: '💰 가격',
  etc: '📝 기타'
};
