"use client";

import { QuestionRenderer } from "@/features/quiz/components/question-renderer";
import { QuizProgress } from "@/features/quiz/components/quiz-progress";
import { useQuizStore } from "@/features/quiz/store";
import { staticStepTypes } from "@/features/quiz/types-and-schemas";
import { cn } from "@/shared/utils/cn";

const STATIC_STEPS = new Set<string>(staticStepTypes);

export default function QuizEngine() {
  const isStaticStep = useQuizStore((state) =>
    STATIC_STEPS.has(state.activeQuizStep),
  );

  const animationDirection = useQuizStore((state) => state.animationDirection);

  return (
    <main
      className={cn("max-w-xl h-dvh flex flex-col mx-auto py-8 px-4", {
        "animate-slide-in-left": animationDirection === "left",
        "animate-slide-in-right": animationDirection === "right",
      })}
    >
      {!isStaticStep && <QuizProgress />}
      <QuestionRenderer />
    </main>
  );
}
