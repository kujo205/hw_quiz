"use client";

import { Check } from "lucide-react";
import { useState } from "react";
import { commonTranslations } from "@/features/quiz/common-translations";
import { QuizTitleDescription } from "@/features/quiz/components/quiz-title-description";
import { useQuizStore } from "@/features/quiz/store";
import type {
  SelectHandler,
  TLocalizedString,
} from "@/features/quiz/types-and-schemas";
import { Button } from "@/shared/ui/button";

import { splitStringOrReturnArray } from "@/shared/utils/split-string-or-return-array";

interface MultipleSelectOption {
  label: TLocalizedString;
  value: string;
}

interface MultipleSelectQuestionProps {
  questionId: string;
  title: TLocalizedString;
  description?: TLocalizedString;
  options: MultipleSelectOption[];
  order: number;
  handleSelect: SelectHandler;
}

export function MultipleSelectQuestion({
  questionId,
  title,
  description,
  options,
  order,
  handleSelect,
}: MultipleSelectQuestionProps) {
  const t = useQuizStore((state) => state.t);

  // Отримуємо початкове значення зі стору (якщо воно є)
  const savedAnswer = useQuizStore((state) =>
    state.getQuestionAnswer(questionId),
  );

  // Стейт для множинного вибору (масив значень)
  const [selectedValues, setSelectedValues] = useState<string[]>(
    splitStringOrReturnArray(questionId),
  );

  const toggleOption = (value: string) => {
    setSelectedValues((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value],
    );
  };

  const onNextClick = () => {
    if (selectedValues.length === 0) return;

    handleSelect(questionId, {
      answer: selectedValues,
      order,
      title: t(title),
      type: "multiple-select",
    });
  };

  return (
    <>
      <QuizTitleDescription title={t(title)} description={t(description)} />

      <div className="flex flex-col flex-1 animate-in fade-in duration-500">
        {/* Контент займає весь доступний простір */}

        <div className="flex-1 space-y-6">
          <div className="space-y-3">
            {options.map((option) => {
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

                  {/* Кастомний чекбокс [cite: 44, 86] */}
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

        {/* Кнопка "Next" зафіксована внизу контейнера [cite: 61, 83] */}
        <div className="pt-8 pb-4">
          <Button onClick={onNextClick} disabled={selectedValues.length === 0}>
            {t(commonTranslations.nextButton)}
          </Button>
        </div>
      </div>
    </>
  );
}
