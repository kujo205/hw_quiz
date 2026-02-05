"use client";

import { useRouter } from "next/navigation";
import { EmojiSelectQuestion } from "@/features/quiz/components/emoji-select-question";
import { SingleSelectQuestion } from "@/features/quiz/components/single-select-question";
import { useQuizStore } from "@/features/quiz/store";
import { languageCodes } from "@/features/quiz/types-and-schemas";
import type { SelectHandler, TQuizQuestion } from "../types-and-schemas";

// TODO: fix ts errors
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

    // Інші кейси (loader, email, thank-you) додаються аналогічно
    case "bubble-select":
    case "multiple-select":
    case "loader":
    case "email":
    case "thank-you":
    default:
      return null;
  }
}
