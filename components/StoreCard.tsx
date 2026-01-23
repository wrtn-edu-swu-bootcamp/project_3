"use client";

import { useId } from "react";
import PriorityChip from "./PriorityChip";

/**
 * Store Card
 * Purpose: 샘플 가게 정보와 우선순위 표시 (Screen 1)
 * States: Default, Hover, Pressed, Focus
 * Interaction: CTA 버튼만 클릭 가능 (패턴 B)
 */
interface StoreCardProps {
  emoji: string;
  name: string;
  category: string;
  period: string;
  reviewCount: number;
  urgent: number;
  consider: number;
  good: number;
  onViewReport: () => void;
}

export default function StoreCard({
  emoji,
  name,
  category,
  period,
  reviewCount,
  urgent,
  consider,
  good,
  onViewReport,
}: StoreCardProps) {
  const uniqueId = useId();

  return (
    <article
      aria-labelledby={`store-${uniqueId}`}
      className="card bg-surface-card p-card-padding border border-border-default rounded-card shadow-card hover:shadow-card-hover transition-shadow"
    >
      {/* Header: 가게명 */}
      <h3 id={`store-${uniqueId}`} className="text-large-body mb-xs">
        <span aria-hidden="true">{emoji}</span> {name}
      </h3>

      {/* Subheader: 업종 */}
      <p className="text-body text-text-secondary mb-s">
        <span aria-hidden="true">🏪</span> {category}
      </p>

      {/* Meta: 기간 • 리뷰 수 */}
      <p className="text-body text-text-secondary mb-m">
        {period} • 리뷰 {reviewCount}
      </p>

      {/* Priority Chips */}
      <div aria-label="우선순위 요약" className="flex gap-s mb-m flex-wrap">
        <PriorityChip type="urgent" count={urgent} aria-label={`긴급 ${urgent}건`} />
        <PriorityChip type="consider" count={consider} aria-label={`고려 ${consider}건`} />
        <PriorityChip type="good" count={good} aria-label={`잘함 ${good}건`} />
      </div>

      {/* CTA 버튼만 클릭 가능 */}
      <button
        onClick={onViewReport}
        className="w-full h-[56px] bg-info text-text-inverse text-body font-medium rounded-button-large shadow-card hover:shadow-card-hover active:shadow-card-pressed transition-all"
      >
        샘플 리포트 보기
      </button>
    </article>
  );
}
