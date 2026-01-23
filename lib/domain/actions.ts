// lib/domain/actions.ts
import type { ActionBankItem } from '@/lib/types/action';

/**
 * 액션 뱅크 (이슈별 해결책 데이터베이스)
 */
const ACTION_BANK: Record<string, ActionBankItem> = {
  // === 부정적 이슈 (긴급/고려) ===
  '배달 시간 지연': {
    issue: '배달 시간 지연',
    recommended: {
      text: '피크타임 인력 추가',
      cost: '중',
      time: '짧'
    },
    alternatives: [
      { text: '배달 대행 추가', cost: '낮', time: '중', difficulty: '하' },
      { text: '피크타임 주문 중단', cost: '낮', time: '짧', difficulty: '하' }
    ]
  },
  '맛/신선도 불만': {
    issue: '맛/신선도 불만',
    recommended: {
      text: '재료 신선도 체크 강화',
      cost: '낮',
      time: '짧'
    },
    alternatives: [
      { text: '레시피 재검토', cost: '낮', time: '중', difficulty: '중' },
      { text: '소스/양념 조정', cost: '낮', time: '중', difficulty: '하' }
    ]
  },
  '포장 파손': {
    issue: '포장 파손',
    recommended: {
      text: '이중 포장 적용',
      cost: '낮',
      time: '짧'
    },
    alternatives: [
      { text: '완충재 추가', cost: '낮', time: '짧', difficulty: '하' },
      { text: '용기 업그레이드', cost: '중', time: '중', difficulty: '하' }
    ]
  },
  '가격 불만': {
    issue: '가격 불만',
    recommended: {
      text: '할인 쿠폰 제공',
      cost: '중',
      time: '짧'
    },
    alternatives: [
      { text: '세트 가격 조정', cost: '낮', time: '중', difficulty: '중' },
      { text: '리뷰 작성 사은품', cost: '낮', time: '짧', difficulty: '하' }
    ]
  },
  '기타 불만': {
    issue: '기타 불만',
    recommended: {
      text: '리뷰 분석 후 개선',
      cost: '낮',
      time: '중'
    },
    alternatives: [
      { text: '직접 응답 작성', cost: '낮', time: '짧', difficulty: '하' },
      { text: '고객 의견 수렴', cost: '낮', time: '중', difficulty: '하' }
    ]
  },

  // === 긍정적 이슈 (잘함) ===
  '음식 품질 우수': {
    issue: '음식 품질 우수',
    recommended: {
      text: '현재 품질 유지하기',
      cost: '낮',
      time: '짧'
    },
    alternatives: [
      { text: '시그니처 메뉴로 홍보', cost: '낮', time: '중', difficulty: '하' },
      { text: '리뷰 감사 이벤트', cost: '낮', time: '짧', difficulty: '하' }
    ]
  },
  '배달 만족도 높음': {
    issue: '배달 만족도 높음',
    recommended: {
      text: '현재 배달 시스템 유지',
      cost: '낮',
      time: '짧'
    },
    alternatives: [
      { text: '빠른배달 강점 홍보', cost: '낮', time: '중', difficulty: '하' },
      { text: '배달 기사 격려', cost: '낮', time: '짧', difficulty: '하' }
    ]
  },
  '포장 상태 양호': {
    issue: '포장 상태 양호',
    recommended: {
      text: '현재 포장 방식 유지',
      cost: '낮',
      time: '짧'
    },
    alternatives: [
      { text: '친환경 포장 검토', cost: '중', time: '중', difficulty: '중' },
      { text: '포장 사진 SNS 공유', cost: '낮', time: '짧', difficulty: '하' }
    ]
  },
  '가격 만족도 높음': {
    issue: '가격 만족도 높음',
    recommended: {
      text: '현재 가격 정책 유지',
      cost: '낮',
      time: '짧'
    },
    alternatives: [
      { text: '가성비 메뉴 강조', cost: '낮', time: '짧', difficulty: '하' },
      { text: '세트 메뉴 확대', cost: '낮', time: '중', difficulty: '하' }
    ]
  },
  '전반적으로 좋은 평가': {
    issue: '전반적으로 좋은 평가',
    recommended: {
      text: '현재 운영 방식 유지',
      cost: '낮',
      time: '짧'
    },
    alternatives: [
      { text: '단골 고객 감사 이벤트', cost: '낮', time: '중', difficulty: '하' },
      { text: '좋은 리뷰 SNS 공유', cost: '낮', time: '짧', difficulty: '하' }
    ]
  }
};

/**
 * 이슈에 맞는 액션 제안 반환
 */
export function matchActions(issue: string): ActionBankItem {
  return ACTION_BANK[issue] || ACTION_BANK['기타 불만'];
}
