"use client";

import { QuizTitleDescription } from "@/features/quiz/components/quiz-title-description";
import { useQuizStore } from "@/features/quiz/store";
import type {
  SelectHandler,
  TLocalizedString,
} from "@/features/quiz/types-and-schemas";
import { Button } from "@/shared/ui/button";

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

  const currentAnswer = useQuizStore((state) =>
    state.getQuestionAnswer(questionId),
  );

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <QuizTitleDescription title={t(title)} description={t(description)} />

      <div className="space-y-3">
        {options.map((option) => {
          const optionLabel = t(option.label);

          const isSelected = currentAnswer === option.value;

          return (
            <Button
              key={option.value}
              variant="quiz-item"
              isSelected={isSelected}
              onClick={() =>
                handleSelect(questionId, {
                  answer: option.value,
                  order,
                  title: t(title), // Для CSV зазвичай краще текст самого питання
                  type: "single-select",
                })
              }
            >
              {optionLabel}
            </Button>
          );
        })}
      </div>
    </div>
  );
}
