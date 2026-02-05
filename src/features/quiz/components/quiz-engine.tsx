"use client";

import { QuestionRenderer } from "@/features/quiz/components/question-renderer";
import { QuizProgress } from "@/features/quiz/components/quiz-progress";
import { useQuizStore } from "@/features/quiz/store";
import { staticStepTypes } from "@/features/quiz/types-and-schemas";

const STATIC_STEPS = new Set<string>(staticStepTypes);

export default function QuizEngine() {
  const isStaticStep = useQuizStore((state) =>
    STATIC_STEPS.has(state.activeQuizStep),
  );

  return (
    <main className="max-w-xl h-dvh flex flex-col mx-auto py-8 px-4">
      {!isStaticStep && <QuizProgress />}
      <QuestionRenderer />
    </main>
  );
}
