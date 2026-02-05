"use client";

import { QuizTitleDescription } from "@/features/quiz/components/quiz-title-description";
import { useQuizStore } from "@/features/quiz/store";
import type {
  SelectHandler,
  TLocalizedString,
} from "@/features/quiz/types-and-schemas";

interface SingleSelectOption {
  label: TLocalizedString;
  value: string;
}

interface SingleSelectQuestionProps {
  questionId: string;
  title: TLocalizedString;
  description?: TLocalizedString;
  options: SingleSelectOption[];
  order: number;
  handleSelect: SelectHandler;
}

export function SingleSelectQuestion({
  questionId,
  title,
  description,
  options,
  order,
  handleSelect,
}: SingleSelectQuestionProps) {
  const t = useQuizStore((state) => state.t);
  const activeQuizId = useQuizStore((state) => state.activeQuizId);
  const currentAnswer = useQuizStore(
    (state) =>
      activeQuizId && state.results[activeQuizId]?.answers[questionId]?.answer,
  );

  return (
    <div className="space-y-6">
      <QuizTitleDescription title={t(title)} description={t(description)} />

      {/* Options */}
      <div className="space-y-3">
        {options.map((option) => {
          const optionLabel = t(option.label);
          const isSelected = currentAnswer === optionLabel;

          return (
            <button
              key={option.value}
              type="button"
              onClick={() =>
                handleSelect(questionId, {
                  answer: option.value,
                  order: order,
                  title: optionLabel,
                  type: "single-select",
                })
              }
              className={`w-full rounded-2xl px-6 py-4 cursor-pointer text-left font-semibold transition-all ${
                isSelected
                  ? "bg-pink-main text-white"
                  : "bg-white/10 text-white hover:bg-white/15"
              }`}
            >
              {optionLabel}
            </button>
          );
        })}
      </div>
    </div>
  );
}
