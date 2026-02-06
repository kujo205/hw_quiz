"use client";

import { useState } from "react";
import type { z } from "zod";
import { commonTranslations } from "@/features/quiz/common-translations";
import { QuizTitleDescription } from "@/features/quiz/components/quiz-title-description";
import { useQuizStore } from "@/features/quiz/store";
import type { SelectHandler } from "@/features/quiz/types-and-schemas";
import { Button } from "@/shared/ui/button";
import { splitStringOrReturnArray } from "@/shared/utils/split-string-or-return-array";
import type { BubbleSelectDataSchema } from "./schema";

interface BubbleSelectProps {
  questionId: string;
  dataModel: z.infer<typeof BubbleSelectDataSchema>;
  order: number;
  valueSelectHandler: SelectHandler;
}

export function BubbleSelect({
  questionId,
  dataModel,
  order,
  valueSelectHandler,
}: BubbleSelectProps) {
  const t = useQuizStore((state) => state.t);
  const savedAnswer = useQuizStore((state) =>
    state.getQuestionAnswer(questionId),
  );

  const [selectedValues, setSelectedValues] = useState<string[]>(
    splitStringOrReturnArray(savedAnswer),
  );

  const toggleOption = (value: string) => {
    setSelectedValues((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value],
    );
  };

  // 1. ЛОГІКА РОЗПОДІЛУ: 1 рядок якщо <= 4, інакше 2 рядки
  const isSingleRow = dataModel.options.length <= 4;
  const maxPerRow = isSingleRow
    ? dataModel.options.length
    : Math.ceil(dataModel.options.length / 2);

  const row1 = dataModel.options.slice(0, maxPerRow);
  const row2 = isSingleRow ? [] : dataModel.options.slice(maxPerRow);

  const renderRow = (
    rowOptions: z.infer<typeof BubbleSelectDataSchema>["options"],
  ) => (
    <div className="flex gap-4 px-4 min-w-max justify-center">
      {rowOptions.map((option, idx) => {
        const isSelected = selectedValues.includes(option.value);
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

  const disabled = selectedValues.length === 0;

  return (
    <>
      <div className="flex animate-fade-in-up flex-col flex-1">
        <QuizTitleDescription
          title={t(dataModel.title)}
          description={t(dataModel.description)}
        />

        <div className="flex-1 animate-fade-in-up flex flex-col justify-start pt-[15%] gap-8 overflow-x-auto no-scrollbar">
          {renderRow(row1)}
          {!isSingleRow && renderRow(row2)}
        </div>
      </div>
      <Button
        onClick={() =>
          valueSelectHandler(questionId, {
            answer: selectedValues,
            order,
            title: t(dataModel.title),
            type: "bubble-select",
          })
        }
        disabled={disabled}
        className={disabled ? "opacity-50" : "opacity-100"}
      >
        {t(commonTranslations.nextButton)}
      </Button>
    </>
  );
}
