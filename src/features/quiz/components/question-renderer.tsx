"use client";

import { useRouter } from "next/navigation";
import { EmojiSelectQuestion } from "@/features/quiz/components/quiz-steps/emoji-select-question";
import { MultipleSelectQuestion } from "@/features/quiz/components/quiz-steps/multiple-select";
import { SingleSelectQuestion } from "@/features/quiz/components/quiz-steps/single-select-question";
import { useQuizStore } from "@/features/quiz/store";
import { languageCodes } from "@/features/quiz/types-and-schemas";
import type { SelectHandler, TQuizQuestion } from "../types-and-schemas";

export function QuestionRenderer() {
  const quizId = useQuizStore((state) => state.activeQuizId);
  const stepData = useQuizStore((state) => state.getCurrentStepData());

  const setAnswerGetNextStepId = useQuizStore(
    (state) => state.setAnswerGetNextStepId,
  );
  const setLanguage = useQuizStore((state) => state.setLanguage);
  const router = useRouter();

  const selectAnswerHandler: SelectHandler = (questionId, val) => {
    // Отримуємо наступний крок через стор (враховуючи розгалуження)
    const nextStepId = setAnswerGetNextStepId(questionId, val);

    // Зміна мови, якщо це перше запитання
    if (
      questionId === "preferred-language" &&
      languageCodes.includes(val.answer as any)
    ) {
      setLanguage(val.answer as any);
    }

    // Затримка для анімації перед переходом
    setTimeout(() => {
      router.push(`/quiz/${quizId}/${nextStepId}`);
    }, 300);
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
          title={questionData.texts.title}
          description={questionData.texts.description}
          options={questionData.options}
        />
      );
    }

    // Loader, Email та Thank-you будуть додані за таким же принципом
    case "bubble-select":
    case "loader":
    case "email":
    case "thank-you":
    default:
      return null;
  }
}
