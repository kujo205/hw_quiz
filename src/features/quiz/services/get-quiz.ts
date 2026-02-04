import type { TQuiz } from "@/features/quiz/types-and-schemas";
import { quizStaticSteps, testQuizDynamicQuestions } from "@/quiz-data-items";

export const getQuizConfig = async (quizId: string): Promise<TQuiz | null> => {
  if (quizId === "test-quiz") {
    return {
      schemaVersion: "1.0",
      questions: testQuizDynamicQuestions,
      staticSteps: quizStaticSteps,
    };
  }
  return null;
};
