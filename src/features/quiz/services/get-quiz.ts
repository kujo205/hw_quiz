import {
  aiGeneratedQuiz,
  tesTQuiz,
} from "@/features/quiz/services/quiz-data-items";
import type { TQuiz } from "@/features/quiz/types-and-schemas";

export const getQuizConfig = async (quizId: string): Promise<TQuiz | null> => {
  // NOTE: this is just for demo
  if (quizId === "test-quiz") {
    return tesTQuiz;
  }
  if (quizId === "test-quiz-created-by-ai") {
    return aiGeneratedQuiz;
  }
  return null;
};
