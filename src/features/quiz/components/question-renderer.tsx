"use client";

import { useRouter } from "next/navigation";
import { BubbleSelect } from "@/features/quiz/components/quiz-steps/bubble-select";
import { EmailStep } from "@/features/quiz/components/quiz-steps/email-step"; // Імпортуємо новий компонент
import { EmojiSelectQuestion } from "@/features/quiz/components/quiz-steps/emoji-select-question";
import { MultipleSelectQuestion } from "@/features/quiz/components/quiz-steps/multiple-select";
import { QuizLoader } from "@/features/quiz/components/quiz-steps/quiz-loader";
import { SingleSelectQuestion } from "@/features/quiz/components/quiz-steps/single-select-question";
import { ThankYouStep } from "@/features/quiz/components/quiz-steps/thank-you-step";
import { useQuizStore } from "@/features/quiz/store";
import { languageCodes } from "@/features/quiz/types-and-schemas";
import type { SelectHandler, TQuizQuestion } from "../types-and-schemas";

export function QuestionRenderer() {
  const quizId = useQuizStore((state) => state.activeQuizId);
  const stepData = useQuizStore((state) => state.getCurrentStepData());
  const setEmail = useQuizStore((state) => state.setEmail);

  const setAnswerGetNextStepId = useQuizStore(
    (state) => state.setAnswerGetNextStepId,
  );
  const setLanguage = useQuizStore((state) => state.setLanguage);
  const router = useRouter();

  const selectAnswerHandler: SelectHandler = (questionId, val) => {
    const nextStepId = setAnswerGetNextStepId(questionId, val);

    // TODO: put in some constant && fix anys with @ts-expect-error code
    router.push(`/quiz/${quizId}/${nextStepId}`);

    if (
      questionId === "preferred-language" &&
      languageCodes.includes(val.answer as any)
    ) {
      setLanguage(val.answer as any);
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

  switch (stepData.type) {
    case "single-select": {
      const questionData = stepData as TQuizQuestion;
      return (
        <SingleSelectQuestion
          handleSelect={selectAnswerHandler}
          questionId={questionData.id}
          order={questionData.order}
          // @ts-expect-error-next-line
          title={questionData.texts.title}
          description={questionData.texts.description}
          options={questionData.options}
        />
      );
    }

    case "single-select-emoji": {
      const questionData = stepData as TQuizQuestion;
      return (
        <EmojiSelectQuestion
          handleSelect={selectAnswerHandler}
          questionId={questionData.id}
          order={questionData.order}
          // @ts-expect-error-next-line
          title={questionData.texts.title}
          description={questionData.texts.description}
          // @ts-expect-error-next-line
          options={questionData.options}
        />
      );
    }

    case "multiple-select": {
      const questionData = stepData as TQuizQuestion;
      return (
        <MultipleSelectQuestion
          handleSelect={selectAnswerHandler}
          questionId={questionData.id}
          order={questionData.order}
          // @ts-expect-error-next-line
          title={questionData.texts.title}
          description={questionData.texts.description}
          options={questionData.options}
        />
      );
    }

    case "bubble-select": {
      const questionData = stepData as TQuizQuestion;
      return (
        <BubbleSelect
          handleSelect={selectAnswerHandler}
          questionId={questionData.id}
          order={questionData.order}
          // @ts-expect-error-next-line
          title={questionData.texts.title}
          description={questionData.texts.description}
          options={questionData.options}
        />
      );
    }

    case "loader": {
      const staticStep = stepData;
      return (
        <QuizLoader
          // @ts-expect-error-next-line
          title={staticStep.texts.title}
          // @ts-expect-error-next-line
          nextStepId={staticStep.defaultNextQuestionId}
          onComplete={handleLoaderComplete}
        />
      );
    }

    case "email": {
      // TODO: ADD VALIDATION HERE WITH ZOD
      const staticStep = stepData;
      return (
        <EmailStep
          handleNext={(email) => {
            // @ts-expect-error-next-line
            emailSubmit(staticStep.defaultNextQuestionId, email);
          }}
          questionId={staticStep.id}
          // @ts-expect-error-next-line
          title={staticStep.texts.title}
          // @ts-expect-error-next-line
          description={staticStep.texts.description}
          // @ts-expect-error-next-line
          placeholder={staticStep.texts.placeholder}
          // @ts-expect-error-next-line
          errorText={staticStep.texts.errorText}
          nextStepId={staticStep.defaultNextQuestionId}
          handleSubmit={selectAnswerHandler}
        />
      );
    }

    case "thank-you": {
      const staticStep = stepData;
      return (
        <ThankYouStep
          // @ts-expect-error-next-line
          title={staticStep.texts.title}
          // @ts-expect-error-next-line
          description={staticStep.texts.description}
          // @ts-expect-error-next-line
          downloadButtonText={staticStep.texts.downloadButton}
          // @ts-expect-error-next-line
          retakeButtonText={staticStep.texts.retakeButton}
        />
      );
    }
    default:
      return null;
  }
}
