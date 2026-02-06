"use client";

import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { useQuizStore } from "@/features/quiz/store";
import { Button } from "@/shared/ui/button";

export function QuizProgress() {
  const config = useQuizStore((state) => state.quizConfig);
  const currentStepOrder = useQuizStore((state) =>
    state.getCurrentStepOrderIndex(),
  );
  const quizId = useQuizStore((state) => state.activeQuizId);

  const totalSteps = config.questions.length;

  const router = useRouter();

  // + 1 bcs we don't wanna show a full progress bar when steps are e.g 5/5
  const progress = (currentStepOrder / (totalSteps + 1)) * 100;

  const handleGoBack = () => {
    const previousQuestion = config.questions.find(
      (q) => q.order === currentStepOrder - 1,
    );

    if (previousQuestion) {
      router.push(`/quiz/${quizId}/${previousQuestion.id}`);
    }
  };

  return (
    <div className="w-full mb-10 space-y-2">
      <div className="flex h-10 items-center justify-between">
        {/* Go back button */}
        {currentStepOrder <= 1 ? (
          <span className="w-10"></span>
        ) : (
          <Button variant="icon" onClick={handleGoBack}>
            <ChevronLeft size={24} />
          </Button>
        )}

        {/* Step counter */}
        <div className="text-center text-xl space-x-1 font-extrabold">
          <span className="text-pink-main">{currentStepOrder}</span>

          <span>/</span>

          <span>{totalSteps}</span>
        </div>

        <span className="w-10"></span>
      </div>

      {/* Progress bar */}
      <div className="relative h-1 w-full overflow-hidden rounded-full bg-white/90">
        <div
          className="h-full bg-pink-main transition-all duration-300 ease-in-out"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}
