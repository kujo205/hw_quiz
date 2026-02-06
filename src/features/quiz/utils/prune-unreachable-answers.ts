import type { TQuiz, TQuizAnswer } from "@/features/quiz/types-and-schemas";
import { evaluateNextQuizStep } from "@/features/quiz/utils/evaluate-next-quiz-step";

/**
 * Removes answers for quiz steps that are no longer reachable based on the current answers.
 * */
export function pruneUnreachableAnswers(
  quizConfig: TQuiz,
  answers: Record<string, TQuizAnswer>,
): Record<string, TQuizAnswer> {
  const reachable = new Set<string>();
  let stepId = quizConfig.questions[0]?.id;

  while (stepId) {
    reachable.add(stepId);
    const step = quizConfig.questions.find((q) => q.id === stepId);
    if (!step) break;

    stepId = evaluateNextQuizStep(step, answers);
  }

  const pruned: Record<string, TQuizAnswer> = {};
  for (const id of Object.keys(answers)) {
    if (reachable.has(id)) pruned[id] = answers[id];
  }

  return pruned;
}
