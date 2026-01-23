/**
 * Priority Chips (정적 정보)
 * Purpose: 우선순위 상태 표시 (클릭 불가)
 * States: Static (정적 정보, 상호작용 없음)
 */
export interface PriorityChipProps {
  type: "urgent" | "consider" | "good";
  count: number;
  "aria-label": string;
}

const CHIP_STYLES = {
  urgent: {
    bg: "bg-urgent",
    text: "text-text-inverse",
    emoji: "🚨",
    label: "긴급",
  },
  consider: {
    bg: "bg-consider",
    text: "text-text-inverse",
    emoji: "⚠️",
    label: "고려",
  },
  good: {
    bg: "bg-good",
    text: "text-text-inverse",
    emoji: "✅",
    label: "잘함",
  },
};

export default function PriorityChip({ type, count, "aria-label": ariaLabel }: PriorityChipProps) {
  const style = CHIP_STYLES[type];

  // 0건이면 미표시
  if (count === 0) return null;

  return (
    <span
      aria-label={ariaLabel}
      className={`inline-flex items-center h-[36px] px-m ${style.bg} ${style.text} text-caption rounded-chip`}
    >
      <span aria-hidden="true">{style.emoji}</span>
      <span className="ml-1">{style.label}</span>
      <span className="ml-1">{count}</span>
    </span>
  );
}
