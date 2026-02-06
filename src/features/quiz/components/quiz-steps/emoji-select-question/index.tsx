"use client";

import { z } from "zod";
import { QuizTitleDescription } from "@/features/quiz/components/quiz-title-description";
import { useQuizStore } from "@/features/quiz/store";
import type { SelectHandler } from "@/features/quiz/types-and-schemas";
import { Button } from "@/shared/ui/button";
import type { EmojiSelectDataSchema } from "./schema";

interface EmojiSelectQuestionProps {
  questionId: string;
  dataModel: z.infer<typeof EmojiSelectDataSchema>;
  order: number;
  valueSelectHandler: SelectHandler;
}

export function EmojiSelect({
  questionId,
  dataModel,
  order,
  valueSelectHandler,
}: EmojiSelectQuestionProps) {
  const t = useQuizStore((state) => state.t);

  const currentAnswer = useQuizStore((state) =>
    state.getQuestionAnswer(questionId),
  );

  return (
    <div className="space-y-10 animate-in animate-fade-in-up duration-500">
      <QuizTitleDescription
        title={t(dataModel.title)}
        description={t(dataModel.description)}
      />

      <div className="grid grid-cols-3 gap-3 w-full">
        {dataModel.options.map((option) => {
          const isSelected = currentAnswer === option.value;
          const optionLabel = t(option.label);

          return (
            <Button
              key={option.value}
              variant="quiz-emoji"
              isSelected={isSelected}
              onClick={() =>
                valueSelectHandler(questionId, {
                  answer: option.value,
                  order,
                  title: t(dataModel.title),
                  type: "single-select-question-emoji",
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
