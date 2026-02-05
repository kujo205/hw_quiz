"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { SingleSelectQuestion } from "@/features/quiz/components/single-select-question";
import { useQuizStore } from "@/features/quiz/store";
import { evaluateNextQuizStep } from "@/features/quiz/utils/evaluate-next-quiz-step";
import type {
  SelectHandler,
  TQuizQuestion,
  TQuizStaticStep,
} from "../types-and-schemas";

interface Props {
  stepData: TQuizStaticStep | TQuizQuestion;
  quizId: string;
  stepId: string;
}

export function QuestionRenderer({ stepData, stepId, quizId }: Props) {
  const setQuizData = useQuizStore((state) => state.setQuizData);
  const getCurrentStepOrder = useQuizStore((state) => state.getCurrenStepOrder);
  const setAnswer = useQuizStore((state) => state.setAnswer);
  const router = useRouter();
  const qOrder = getCurrentStepOrder();

  useEffect(() => {
    setQuizData(quizId, stepId);
  }, [quizId, stepId, setQuizData]);

  const selectAnswerHandler: SelectHandler = (questionId, val) => {
    setAnswer(questionId, val);

    const nextStepId = evaluateNextQuizStep(
      stepData,
      useQuizStore.getState().getCurrentQuizAnswers(),
    );

    router.push(`/quiz/${quizId}/${nextStepId}`);
  };

  switch (stepData.type) {
    case "single-select": {
      const questionData = stepData as TQuizQuestion;
      return (
        <SingleSelectQuestion
          handleSelect={selectAnswerHandler}
          questionId={questionData.id}
          order={qOrder}
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
