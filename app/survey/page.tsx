"use client";

import { useState, useId } from "react";
import { useRouter } from "next/navigation";
import AppHeader from "@/components/AppHeader";

/**
 * Screen 3: 설문
 * Purpose: MVP 검증 피드백 수집
 * Flow: 1화면 1질문 → [다음] → 다음 질문 → [제출] → 완료
 */
export default function SurveyPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const questionId = useId();

  const questions = [
    {
      id: 1,
      question: "3분 내 문제/할 일을 파악할 수 있었나요?",
      options: [
        { value: 5, label: "매우 쉬웠다" },
        { value: 4, label: "쉬웠다" },
        { value: 3, label: "보통" },
        { value: 2, label: "어려웠다" },
        { value: 1, label: "매우 어려웠다" },
      ],
    },
    {
      id: 2,
      question: "제안된 해결책이 실용적이었나요?",
      options: [
        { value: 5, label: "매우 실용적" },
        { value: 4, label: "실용적" },
        { value: 3, label: "보통" },
        { value: 2, label: "비실용적" },
        { value: 1, label: "매우 비실용적" },
      ],
    },
    {
      id: 3,
      question: "우선순위 표시가 명확했나요?",
      options: [
        { value: 5, label: "매우 명확" },
        { value: 4, label: "명확" },
        { value: 3, label: "보통" },
        { value: 2, label: "불명확" },
        { value: 1, label: "매우 불명확" },
      ],
    },
    {
      id: 4,
      question: "텍스트 크기와 간격이 편했나요?",
      options: [
        { value: 5, label: "매우 편했다" },
        { value: 4, label: "편했다" },
        { value: 3, label: "보통" },
        { value: 2, label: "불편했다" },
        { value: 1, label: "매우 불편했다" },
      ],
    },
    {
      id: 5,
      question: "버튼 클릭이 편했나요?",
      options: [
        { value: 5, label: "매우 편했다" },
        { value: 4, label: "편했다" },
        { value: 3, label: "보통" },
        { value: 2, label: "불편했다" },
        { value: 1, label: "매우 불편했다" },
      ],
    },
    {
      id: 6,
      question: "이 서비스를 사용하고 싶으신가요?",
      options: [
        { value: 5, label: "매우 그렇다" },
        { value: 4, label: "그렇다" },
        { value: 3, label: "보통" },
        { value: 2, label: "아니다" },
        { value: 1, label: "전혀 아니다" },
      ],
    },
  ];

  const currentQuestion = questions[currentStep - 1];
  const isLastQuestion = currentStep === questions.length;
  const currentAnswer = answers[currentStep];

  const handleAnswer = (value: number) => {
    setAnswers((prev) => ({ ...prev, [currentStep]: value }));
  };

  const handleNext = () => {
    if (currentAnswer === undefined) return;

    if (isLastQuestion) {
      // 제출
      alert("설문이 완료되었습니다! 소중한 의견 감사드려요.");
      router.push("/demo");
    } else {
      setCurrentStep((prev) => prev + 1);
    }
  };

  return (
    <main className="min-h-screen bg-bg-primary">
      <AppHeader showBack />

      <div className="container py-xl space-y-l">
        {/* 제목 */}
        <div>
          <h2 className="text-h2 mb-s">리포트가 도움이 됐나요?</h2>
          <p className="text-body text-text-secondary">짧게 1분만 알려주세요</p>
        </div>

        {/* 진행률 (동적) */}
        <p
          aria-live="polite"
          aria-atomic="true"
          className="text-caption text-text-tertiary"
        >
          진행 {currentStep}/{questions.length}
        </p>

        {/* 질문 카드 */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleNext();
          }}
          className="space-y-l"
        >
          <fieldset
            aria-labelledby={`question-${questionId}-${currentStep}`}
            className="bg-bg-secondary p-l rounded-card space-y-m"
          >
            <legend
              id={`question-${questionId}-${currentStep}`}
              className="text-large-body mb-m"
            >
              {currentQuestion.question}
            </legend>

            {/* 라디오 옵션 */}
            <div className="space-y-s">
              {currentQuestion.options.map((option) => (
                <label
                  key={option.value}
                  className={`flex items-center min-h-[44px] px-m py-s border rounded-card cursor-pointer transition-all ${
                    currentAnswer === option.value
                      ? "bg-info-bg border-[2px] border-info"
                      : "bg-surface-card border border-border-default hover:bg-bg-secondary"
                  }`}
                >
                  <input
                    type="radio"
                    name={`q${currentStep}`}
                    value={option.value}
                    checked={currentAnswer === option.value}
                    onChange={() => handleAnswer(option.value)}
                    required
                    className="mr-s"
                  />
                  <span className="text-body">{option.label}</span>
                </label>
              ))}
            </div>
          </fieldset>

          {/* [다음] / [제출] 버튼 */}
          <button
            type="submit"
            disabled={currentAnswer === undefined}
            aria-describedby={
              currentAnswer === undefined ? `helper-${questionId}-${currentStep}` : undefined
            }
            className="w-full h-[56px] bg-info text-text-inverse text-body font-medium rounded-button-large shadow-card hover:shadow-card-hover disabled:bg-border-disabled disabled:text-text-disabled transition-all"
          >
            {isLastQuestion ? "제출" : "다음"}
          </button>

          {currentAnswer === undefined && (
            <p
              id={`helper-${questionId}-${currentStep}`}
              className="text-caption text-text-secondary text-center"
            >
              옵션을 선택하면 {isLastQuestion ? "제출" : "다음 질문으로 이동"}합니다
            </p>
          )}
        </form>
      </div>
    </main>
  );
}
