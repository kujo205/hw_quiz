"use client";

import type { z } from "zod";
import { QuizTitleDescription } from "@/features/quiz/components/quiz-title-description";
import { useQuizStore } from "@/features/quiz/store";
import type { SelectHandler } from "@/features/quiz/types-and-schemas";
import { Button } from "@/shared/ui/button";
import type { SingleSelectDataSchema } from "./schema";

interface SingleSelectQuestionProps {
  questionId: string;
  dataModel: z.infer<typeof SingleSelectDataSchema>;
  order: number;
  valueSelectHandler: SelectHandler;
}

export function SingleSelect({
  questionId,
  dataModel,
  order,
  valueSelectHandler,
}: SingleSelectQuestionProps) {
  const t = useQuizStore((state) => state.t);

  const currentAnswer = useQuizStore((state) =>
    state.getQuestionAnswer(questionId),
  );

  return (
    <div className="space-y-6 animate-fade-in-up">
      <QuizTitleDescription
        title={t(dataModel.title)}
        description={t(dataModel.description)}
      />

      <div className="space-y-3">
        {dataModel.options.map((option) => {
          const optionLabel = t(option.label);

          const isSelected = currentAnswer === option.value;

          return (
            <Button
              key={option.value}
              variant="quiz-item"
              isSelected={isSelected}
              onClick={() =>
                valueSelectHandler(questionId, {
                  answer: option.value,
                  order,
                  title: t(dataModel.title),
                  type: "single-select-question",
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
