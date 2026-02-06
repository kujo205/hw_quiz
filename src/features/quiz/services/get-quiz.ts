import { tesTQuiz, aiGeneratedQuiz } from "@/features/quiz/services/quiz-data-items";
import type { TQuiz } from "@/features/quiz/types-and-schemas";

export const getQuizConfig = async (quizId: string): Promise<TQuiz | null> => {
  if (quizId === "test-quiz") {
    return tesTQuiz;
  }
  if (quizId === "test-quiz-created-by-ai") {
    return aiGeneratedQuiz;
  }
  return null;
};
