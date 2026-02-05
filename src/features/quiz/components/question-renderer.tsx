"use client";

import { useRouter } from "next/navigation";
import { BubbleSelect } from "@/features/quiz/components/quiz-steps/bubble-select";
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
    const nextStepId = setAnswerGetNextStepId(questionId, val);

    if (
      questionId === "preferred-language" &&
      languageCodes.includes(val.answer as any)
    ) {
      setLanguage(val.answer as any);
    }

    // Затримка для візуального фідбеку анімації перед зміною роута
    setTimeout(() => {
      router.push(`/quiz/${quizId}/${nextStepId}`);
    }, 200);
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

    // Статичні кроки обробляються окремо або через аналогічні компоненти
    case "loader":
    case "email":
    case "thank-you":
    default:
      return null;
  }
}
