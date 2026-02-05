"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { SingleSelectQuestion } from "@/features/quiz/components/single-select-question";
import { useQuizStore } from "@/features/quiz/store";
import { languageCodes } from "@/features/quiz/types-and-schemas";
import { evaluateNextQuizStep } from "@/features/quiz/utils/evaluate-next-quiz-step";
import type {
  SelectHandler,
  TQuizQuestion,
  TQuizStaticStep,
} from "../types-and-schemas";

export function QuestionRenderer() {
  const quizId = useQuizStore((state) => state.activeQuizId);
  const stepData = useQuizStore((state) => state.getCurrentStepData());

  const setQuizData = useQuizStore((state) => state.setQuizData);
  const setAnswerGetNextStepId = useQuizStore(
    (state) => state.setAnswerGetNextStepId,
  );
  const setLanguage = useQuizStore((state) => state.setLanguage);
  const router = useRouter();

  const selectAnswerHandler: SelectHandler = (questionId, val) => {
    const nextStepId = setAnswerGetNextStepId(questionId, val);

    router.push(`/quiz/${quizId}/${nextStepId}`);

    if (
      questionId === "preferred-language" &&
      languageCodes.includes(val.answer)
    ) {
      // @ts-expect-error-next-line: types too wide for ts
      setLanguage(val.answer);
    }
  };

  switch (stepData.type) {
    case "single-select": {
      const questionData = stepData as TQuizQuestion;

      return (
        <SingleSelectQuestion
          handleSelect={selectAnswerHandler}
          questionId={questionData.id}
          order={questionData.order}
          title={questionData.texts.title}
          description={questionData.texts.description}
          options={questionData.options}
        />
      );
    }
    case "bubble-select":
    case "multiple-select":
    case "loader":
    case "email":
    case "thank-you":
    default:
      return null;
  }
}
