import { QUIZ_IDS } from "@/features/quiz/constants";
import { tesTQuiz, aiGeneratedQuiz } from "@/features/quiz/services/quiz-data-items";
import type { TQuiz } from "@/features/quiz/types-and-schemas";

export const getQuizConfig = async (quizId: string): Promise<TQuiz | null> => {
  if (quizId === QUIZ_IDS.TEST) {
    return tesTQuiz;
  }
  if (quizId === QUIZ_IDS.TEST_AI) {
    return aiGeneratedQuiz;
  }
  return null;
};
