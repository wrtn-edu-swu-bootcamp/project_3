// lib/utils/formatters.ts

/**
 * 비용 레벨을 사용자 친화적인 텍스트로 변환
 */
export function formatCost(cost: '낮' | '중' | '높'): string {
  const map = {
    '낮': '💰 저렴',
    '중': '💰 보통',
    '높': '💰 비쌈'
  };
  return map[cost];
}

/**
 * 소요 시간을 사용자 친화적인 텍스트로 변환
 */
export function formatTime(time: '짧' | '중' | '김'): string {
  const map = {
    '짧': '⏱️ 빠름',
    '중': '⏱️ 보통',
    '김': '⏱️ 오래'
  };
  return map[time];
}

/**
 * 난이도를 사용자 친화적인 텍스트로 변환
 */
export function formatDifficulty(difficulty?: '하' | '중' | '상'): string {
  if (!difficulty) return '';
  const map = {
    '하': '🎯 쉬움',
    '중': '🎯 보통',
    '상': '🎯 어려움'
  };
  return map[difficulty];
}
