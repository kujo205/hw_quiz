import type { TQuiz } from "@/features/quiz/types-and-schemas";

export function getNextQuizStepData(config: TQuiz, stepId: string) {
  const question = config.questions.find((q) => q.id === stepId);
  const staticStep = config.staticSteps[stepId];

  return question || staticStep;
}
