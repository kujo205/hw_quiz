"use client";

import { ChevronLeft } from "lucide-react";
import { useQuizStore } from "@/features/quiz/store";
import { Button } from "@/shared/ui/button";

interface QuizProgressProps {
  totalSteps: number;
}

export function QuizProgress({ totalSteps }: QuizProgressProps) {
  const { activeQuizId, results } = useQuizStore();

  if (!activeQuizId) return null;

  const answeredCount = Object.keys(
    results[activeQuizId]?.answers || {},
  ).length;
  const currentStep = answeredCount + 1;
  const progress = (currentStep / totalSteps) * 100;

  return (
    <div className="w-full space-y-2">
      <div className="flex justify-between">
        {/* Go back button */}
        {currentStep === 1 ? (
          <span className="w-10"></span>
        ) : (
          <Button variant="icon">
            <ChevronLeft size={24} />
          </Button>
        )}

        {/* Step counter */}
        <div className="text-center text-xl space-x-1 font-bold">
          <span className="text-pink-main">{currentStep}</span>
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
