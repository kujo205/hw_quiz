import type { TQuiz } from "@/features/quiz/types-and-schemas";

/**
 * Check whether a quiz step (question or static step) exists in the quiz configuration.
 */
export function checkQuizStepPresent(config: TQuiz, stepId: string) {
  const question = config.questions.find((q) => q.id === stepId);
  const staticStep = config.staticSteps[stepId];

  return {
    exists: !!(question || staticStep),
    stepData: question || staticStep,
  };
}
