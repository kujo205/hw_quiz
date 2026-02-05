"use client";

import { QuizTitleDescription } from "@/features/quiz/components/quiz-title-description";
import { useQuizStore } from "@/features/quiz/store";
import type {
  SelectHandler,
  TLocalizedString,
} from "@/features/quiz/types-and-schemas";
import { Button } from "@/shared/ui/button";

interface EmojiSelectOption {
  label: TLocalizedString;
  value: string;
  emoji: string;
}

interface EmojiSelectQuestionProps {
  questionId: string;
  title: TLocalizedString;
  description?: TLocalizedString;
  options: EmojiSelectOption[];
  order: number;
  handleSelect: SelectHandler;
}

export function EmojiSelectQuestion({
  questionId,
  title,
  description,
  options,
  order,
  handleSelect,
}: EmojiSelectQuestionProps) {
  const t = useQuizStore((state) => state.t);

  const currentAnswer = useQuizStore((state) =>
    state.getQuestionAnswer(questionId),
  );

  return (
    <div className="space-y-10 animate-in fade-in duration-500">
      <QuizTitleDescription title={t(title)} description={t(description)} />

      <div className="grid grid-cols-3 gap-3 w-full">
        {options.map((option) => {
          const isSelected = currentAnswer === option.value;
          const optionLabel = t(option.label);

          return (
            <Button
              key={option.value}
              variant="quiz-emoji"
              isSelected={isSelected}
              onClick={() =>
                handleSelect(questionId, {
                  answer: option.value,
                  order,
                  title: t(title),
                  type: "single-select-emoji",
                })
              }
            >
              <span className="text-5xl mb-3 block">{option.emoji}</span>
              <span className="text-white text-sm font-bold text-center leading-tight">
                {optionLabel}
              </span>
            </Button>
          );
        })}
      </div>
    </div>
  );
}
