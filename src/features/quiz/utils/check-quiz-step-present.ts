import type { TQuiz2 } from "@/features/quiz/types-and-schemas";

import { getNextQuizStepData } from "@/features/quiz/utils/get-next-quiz-step-data";

/**
 * Check whether a quiz step (question or static step) exists in the quiz configuration.
 */
export function checkQuizStepPresent(config: TQuiz2, stepId: string) {
  const stepData = getNextQuizStepData(config, stepId);

  return {
    exists: !!stepData,
    stepData: stepData,
  };
}
