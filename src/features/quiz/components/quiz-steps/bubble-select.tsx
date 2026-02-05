"use client";

import { useState } from "react";
import { QuizTitleDescription } from "@/features/quiz/components/quiz-title-description";
import { useQuizStore } from "@/features/quiz/store";
import type {
  SelectHandler,
  TLocalizedString,
} from "@/features/quiz/types-and-schemas";
import { Button } from "@/shared/ui/button";

interface BubbleOption {
  label: TLocalizedString;
  value: string;
  emoji?: string;
}

interface BubbleSelectProps {
  questionId: string;
  title: TLocalizedString;
  description?: TLocalizedString;
  options: BubbleOption[];
  order: number;
  handleSelect: SelectHandler;
}

export function BubbleSelect({
  questionId,
  title,
  description,
  options,
  order,
  handleSelect,
}: BubbleSelectProps) {
  const t = useQuizStore((state) => state.t);
  const savedAnswer = useQuizStore((state) =>
    state.getQuestionAnswer(questionId),
  );

  const [selectedValues, setSelectedValues] = useState<string[]>(
    typeof savedAnswer === "string" ? savedAnswer.split(", ") : [],
  );

  const toggleOption = (value: string) => {
    setSelectedValues((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value],
    );
  };

  // 1. ЛОГІКА РОЗПОДІЛУ: 1 рядок якщо <= 4, інакше 2 рядки
  const isSingleRow = options.length <= 4;
  const maxPerRow = isSingleRow
    ? options.length
    : Math.ceil(options.length / 2);

  const row1 = options.slice(0, maxPerRow);
  const row2 = isSingleRow ? [] : options.slice(maxPerRow);

  const renderRow = (rowOptions: BubbleOption[]) => (
    <div className="flex gap-4 px-4 min-w-max justify-center">
      {rowOptions.map((option, idx) => {
        const isSelected = selectedValues.includes(option.value);
        // Ефект зміщення
        const offset = idx % 2 === 0 ? "-translate-y-4" : "translate-y-4";

        return (
          <div key={option.value} className={`${offset} transition-transform`}>
            <Button
              variant="bubble"
              isSelected={isSelected}
              onClick={() => toggleOption(option.value)}
            >
              {option.emoji && (
                <span className="text-2xl mb-1">{option.emoji}</span>
              )}
              <span className="text-sm font-bold text-center leading-tight">
                {t(option.label)}
              </span>
            </Button>
          </div>
        );
      })}
    </div>
  );

  return (
    <div className="flex flex-col flex-1 animate-in fade-in duration-500">
      <QuizTitleDescription title={t(title)} description={t(description)} />

      {/* Контейнер для баблів */}
      <div className="flex-1 flex flex-col justify-center gap-8 overflow-x-auto no-scrollbar pt-0 pb-20">
        {renderRow(row1)}
        {!isSingleRow && renderRow(row2)}
      </div>

      <div className="pt-8 pb-4">
        <Button
          onClick={() =>
            handleSelect(questionId, {
              answer: selectedValues,
              order,
              title: t(title),
              type: "bubble-select",
            })
          }
          disabled={selectedValues.length === 0}
          className={selectedValues.length === 0 ? "opacity-50" : "opacity-100"}
        >
          Next
        </Button>
      </div>
    </div>
  );
}
