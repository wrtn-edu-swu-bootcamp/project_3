// lib/domain/summary.ts
import type { ActionCard } from '@/lib/types/report';

/**
 * 한 줄 요약 생성 (긴급 문제 기준)
 */
export function generateSummary(priorities: ActionCard[]): string {
  const urgent = priorities.find(p => p.priority === 'urgent');
  
  if (urgent) {
    return `${urgent.issue} 문제가 심각해요`;
  }

  const consider = priorities.find(p => p.priority === 'consider');
  if (consider) {
    return `${consider.issue}에 주의가 필요해요`;
  }

  return '전반적으로 좋은 평가를 받고 있어요';
}
