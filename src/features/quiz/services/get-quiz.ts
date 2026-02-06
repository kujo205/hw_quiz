import { testQuiz2 } from "@/features/quiz/services/quiz-data-items";
import type { TQuiz2 } from "@/features/quiz/types-and-schemas";

export const getQuizConfig = async (
  quizId: string,
): Promise<TQuiz2 | null> => {
  if (quizId === "test-quiz") {
    return testQuiz2;
  }
  return null;
};
