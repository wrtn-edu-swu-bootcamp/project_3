"use client";

import { useState, useId, useEffect } from "react";

/**
 * Action Card
 * Purpose: 문제와 해결책 제시 (Screen 2)
 * States: Collapsed, Expanded
 */
export interface ActionCardProps {
  type: "urgent" | "consider" | "good";
  category: string;
  issue: string;
  metric: {
    sentiment: "부정" | "긍정";
    percentage: number;
    count: number;
  };
  action: {
    text: string;
    cost: "낮" | "중" | "높";
    time: "짧" | "중" | "김";
  };
  alternatives?: Array<{
    id: string;
    text: string;
    cost: "낮" | "중" | "높";
    time: "짧" | "중" | "김";
    difficulty: "하" | "중" | "상";
  }>;
  uniqueId: string;
}

const CARD_STYLES = {
  urgent: {
    border: "border-[3px] border-urgent",
    bg: "bg-urgent-bg",
    emoji: "🚨",
    label: "긴급",
    textColor: "text-urgent",
  },
  consider: {
    border: "border-[2px] border-consider",
    bg: "bg-consider-bg",
    emoji: "⚠️",
    label: "고려",
    textColor: "text-consider",
  },
  good: {
    border: "border border-good",
    bg: "bg-good-bg",
    emoji: "✅",
    label: "잘함",
    textColor: "text-good",
  },
};

export default function ActionCard({
  type,
  category,
  issue,
  metric,
  action,
  alternatives = [],
  uniqueId,
}: ActionCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const accordionId = `alternatives-${uniqueId}`;
  const headingId = `alternatives-heading-${uniqueId}`;
  const cardId = `action-${uniqueId}`;
  const style = CARD_STYLES[type];

  // Esc 키로 접기 (데스크톱 권장)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isExpanded) {
        setIsExpanded(false);
      }
    };

    if (isExpanded) {
      window.addEventListener("keydown", handleKeyDown);
      return () => window.removeEventListener("keydown", handleKeyDown);
    }
  }, [isExpanded]);

  return (
    <article
      aria-labelledby={cardId}
      className={`card ${style.border} ${style.bg} rounded-card p-card-padding`}
    >
      {/* Header: 상태 · 카테고리 */}
      <h3 id={cardId} className={`text-large-body ${style.textColor} mb-s`}>
        <span aria-hidden="true">{style.emoji}</span> {style.label} · {category}
      </h3>

      {/* Issue */}
      <p className="text-large-body mb-s">{issue}</p>

      {/* Metrics */}
      <p className="text-body text-text-secondary mb-m">
        {metric.sentiment} {metric.percentage}% • {metric.count}건
      </p>

      {/* Action */}
      <p className="text-body mb-s">
        <span aria-hidden="true">💡</span> {action.text}
      </p>

      {/* Action Tags */}
      <div className="flex gap-s mb-m flex-wrap">
        <span className="px-3 py-1 text-caption border border-border-default rounded-chip-small bg-surface-card">
          비용:{action.cost}
        </span>
        <span className="px-3 py-1 text-caption border border-border-default rounded-chip-small bg-surface-card">
          시간:{action.time}
        </span>
      </div>

      {/* Accordion Trigger */}
      {alternatives.length > 0 && (
        <>
          <button
            aria-expanded={isExpanded}
            aria-controls={accordionId}
            aria-label={isExpanded ? "대안 접기" : "대안 보기"}
            onClick={() => setIsExpanded(!isExpanded)}
            className="w-full h-[48px] text-body text-text-primary hover:bg-black/5 active:bg-black/10 rounded transition-colors"
          >
            {isExpanded ? "대안 접기 ▴" : "대안 보기 ▾"}
          </button>

          {/* Accordion Content */}
          <div className={`accordion-content ${isExpanded ? "open" : ""}`}>
            <div
              id={accordionId}
              role="region"
              aria-labelledby={headingId}
              className="pt-m"
            >
              <h4 id={headingId} className="text-body font-medium mb-s">
                대안 목록
              </h4>
              <ul className="space-y-s">
                {alternatives.map((alt) => (
                  <li key={alt.id} className="text-body">
                    <p className="mb-xs">{alt.text}</p>
                    <div className="flex gap-s flex-wrap">
                      <span className="px-2 py-1 text-caption border border-border-default rounded-chip-small bg-surface-card">
                        비용:{alt.cost}
                      </span>
                      <span className="px-2 py-1 text-caption border border-border-default rounded-chip-small bg-surface-card">
                        시간:{alt.time}
                      </span>
                      <span className="px-2 py-1 text-caption border border-border-default rounded-chip-small bg-surface-card">
                        난이도:{alt.difficulty}
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </>
      )}
    </article>
  );
}
