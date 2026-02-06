"use client";

import { Check } from "lucide-react";
import { useState } from "react";
import type { z } from "zod";
import { commonTranslations } from "@/features/quiz/common-translations";
import { QuizTitleDescription } from "@/features/quiz/components/quiz-title-description";
import { useQuizStore } from "@/features/quiz/store";
import type { SelectHandler } from "@/features/quiz/types-and-schemas";
import { Button } from "@/shared/ui/button";
import { splitStringOrReturnArray } from "@/shared/utils/split-string-or-return-array";
import type { MultipleSelectDataSchema } from "./schema";

interface MultipleSelectQuestionProps {
  questionId: string;
  dataModel: z.infer<typeof MultipleSelectDataSchema>;
  order: number;
  valueSelectHandler: SelectHandler;
}

export function MultipleSelectQuestion({
  questionId,
  dataModel,
  order,
  valueSelectHandler,
}: MultipleSelectQuestionProps) {
  const t = useQuizStore((state) => state.t);

  // Get initial value from store (if exists)
  const savedAnswer = useQuizStore((state) =>
    state.getQuestionAnswer(questionId),
  );

  // State for multiple selection (array of values)
  const [selectedValues, setSelectedValues] = useState<string[]>(
    splitStringOrReturnArray(savedAnswer),
  );

  const toggleOption = (value: string) => {
    setSelectedValues((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value],
    );
  };

  const onNextClick = () => {
    if (selectedValues.length === 0) return;

    valueSelectHandler(questionId, {
      answer: selectedValues,
      order,
      title: t(dataModel.title),
      type: "multiple-select",
    });
  };

  return (
    <>
      <div className="flex flex-col animate-fade-in-up flex-1 ">
        <QuizTitleDescription
          title={t(dataModel.title)}
          description={t(dataModel.description)}
        />

        <div className="flex-1 space-y-6">
          <div className="space-y-3">
            {dataModel.options.map((option) => {
              const optionLabel = t(option.label);
              const isSelected = selectedValues.includes(option.value);

              return (
                <div key={option.value} className="relative group">
                  <Button
                    variant="quiz-item"
                    isSelected={isSelected}
                    onClick={() => toggleOption(option.value)}
                    className="pr-14"
                  >
                    {optionLabel}
                  </Button>

                  {/* Custom checkbox */}
                  <div
                    className={`absolute right-4 top-1/2 -translate-y-1/2 w-6 h-6 rounded border-2 transition-all flex items-center justify-center pointer-events-none ${
                      isSelected
                        ? "bg-pink-main border-pink-main shadow-[0_0_10px_rgba(233,73,152,0.4)]"
                        : "border-white/20 bg-white/5"
                    }`}
                  >
                    {isSelected && (
                      <Check size={16} className="text-white stroke-[3px]" />
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <Button onClick={onNextClick} disabled={selectedValues.length === 0}>
        {t(commonTranslations.nextButton)}
      </Button>
    </>
  );
}
