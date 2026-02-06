import type { TQuiz2 } from "@/features/quiz/types-and-schemas";

export function getNextQuizStepData(config: TQuiz2, stepId: string) {
  const question = config.questions.find((q) => q.id === stepId);
  const staticStep = config.staticSteps.find((s) => s.id === stepId);

  return question || staticStep;
}
