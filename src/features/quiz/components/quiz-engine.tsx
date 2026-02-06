"use client";

import { QuestionRenderer } from "@/features/quiz/components/question-renderer";
import { QuizProgress } from "@/features/quiz/components/quiz-progress";
import { useQuizStore } from "@/features/quiz/store";
import { getIsStaticStep } from "@/features/quiz/utils/get-is-static-step";
import { cn } from "@/shared/utils/cn";

export default function QuizEngine() {
  const isStaticStep = useQuizStore((state) => {
    const dataMode = state.getCurrentStepData()?.dataModel;
    if (!dataMode) return false;
    return getIsStaticStep(dataMode.type);
  });

  return (
    <main className={cn("max-w-xl h-dvh flex flex-col mx-auto py-8 px-4")}>
      {!isStaticStep && <QuizProgress />}
      <QuestionRenderer />
    </main>
  );
}
