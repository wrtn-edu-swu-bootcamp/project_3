"use client";

import { useState } from "react";

/**
 * Feedback Buttons
 * Purpose: 리포트 피드백 수집
 * States: Default, Hover, Pressed, Selected, Focus
 */
export default function FeedbackButtons() {
  const [selected, setSelected] = useState<"helpful" | "not-helpful" | null>(null);

  return (
    <section aria-label="리포트 피드백" className="space-y-m">
      <p className="text-body">도움이 됐나요?</p>

      {/* 피드백 버튼 */}
      <div className="flex gap-s">
        <button
          onClick={() => setSelected("helpful")}
          aria-label="도움이 되었습니다"
          className={`w-[140px] h-[56px] text-body font-medium rounded-button border transition-all ${
            selected === "helpful"
              ? "bg-good-bg border-[2px] border-good"
              : "bg-good-bg border border-good hover:bg-good/10"
          }`}
        >
          <span aria-hidden="true">👍</span> 도움돼요
        </button>

        <button
          onClick={() => setSelected("not-helpful")}
          aria-label="아쉬웠습니다"
          className={`w-[140px] h-[56px] text-body font-medium rounded-button border transition-all ${
            selected === "not-helpful"
              ? "bg-urgent-bg border-[2px] border-urgent"
              : "bg-urgent-bg border border-urgent hover:bg-urgent/10"
          }`}
        >
          <span aria-hidden="true">👎</span> 아쉬워요
        </button>
      </div>

      {/* 의견 남기기 */}
      <button className="w-full h-[48px] bg-surface-card text-text-primary text-body font-medium border border-border-default rounded-button hover:bg-bg-secondary transition-all">
        <span aria-hidden="true">💬</span> 의견 남기기
      </button>
    </section>
  );
}
