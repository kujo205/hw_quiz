"use client";

import { useRouter } from "next/navigation";
import { BubbleSelect } from "@/features/quiz/components/quiz-steps/bubble-select";
import { EmailStep } from "@/features/quiz/components/quiz-steps/email-step";
import { EmojiSelect } from "@/features/quiz/components/quiz-steps/emoji-select-question";
import { MultipleSelectQuestion } from "@/features/quiz/components/quiz-steps/multiple-select/multiple-select";
import { QuizLoader } from "@/features/quiz/components/quiz-steps/quiz-loader";
import { SingleSelect } from "@/features/quiz/components/quiz-steps/single-select-question";
import { ThankYouStep } from "@/features/quiz/components/quiz-steps/thank-you-step";
import { useQuizStore } from "@/features/quiz/store";
import { languageCodes } from "@/features/quiz/types-and-schemas/localization";
import type { SelectHandler } from "../types-and-schemas";

export function QuestionRenderer() {
  const quizId = useQuizStore((state) => state.activeQuizId);
  const stepData = useQuizStore((state) => state.getCurrentStepData());
  const setEmail = useQuizStore((state) => state.setEmail);
  const answers = useQuizStore((state) => state.getCurrentQuizAnswers());

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
      languageCodes.includes(val.answer as string)
    ) {
      setLanguage(val.answer as string);
    }
  };

  const handleLoaderComplete = (nextStepId: string) => {
    router.push(`/quiz/${quizId}/${nextStepId}`);
  };

  const emailSubmit = (nextStepId: string, email: string) => {
    setEmail(email);
    router.push(`/quiz/${quizId}/${nextStepId}`);
  };

  if (!stepData) return null;

  const order = answers[stepData.id]?.order || 0;

  switch (stepData.dataModel.type) {
    case "single-select": {
      return (
        <SingleSelect
          valueSelectHandler={selectAnswerHandler}
          questionId={stepData.id}
          order={order}
          dataModel={stepData.dataModel}
        />
      );
    }

    case "single-select-question-emoji": {
      return (
        <EmojiSelect
          valueSelectHandler={selectAnswerHandler}
          questionId={stepData.id}
          order={order}
          dataModel={stepData.dataModel}
        />
      );
    }

    case "multiple-select": {
      return (
        <MultipleSelectQuestion
          valueSelectHandler={selectAnswerHandler}
          questionId={stepData.id}
          order={order}
          dataModel={stepData.dataModel}
        />
      );
    }

    case "bubble-select": {
      return (
        <BubbleSelect
          valueSelectHandler={selectAnswerHandler}
          questionId={stepData.id}
          order={order}
          dataModel={stepData.dataModel}
        />
      );
    }

    case "loader": {
      return (
        <QuizLoader
          dataModel={stepData.dataModel}
          nextStepId={stepData.defaultNextQuestionId || ""}
          onComplete={handleLoaderComplete}
        />
      );
    }

    case "email": {
      return (
        <EmailStep
          handleNext={(email) => {
            emailSubmit(stepData.defaultNextQuestionId || "", email);
          }}
          questionId={stepData.id}
          dataModel={stepData.dataModel}
        />
      );
    }

    case "thank-you": {
      return <ThankYouStep dataModel={stepData.dataModel} />;
    }
    default:
      return null;
  }
}
