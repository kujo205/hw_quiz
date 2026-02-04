import { cache } from "react";
import type { TQuiz } from "@/features/quiz/types-and-schemas";
import { quizStaticSteps, testQuizDynamicQuestions } from "@/quiz-data-items";

export const getQuizConfig = cache(
  async (quizId: string): Promise<TQuiz | null> => {
    // NOTE: this is a placeholder for dynamic fetching logic, in a real app this would be a fetch to an external API or database
    if (quizId === "test-quiz") {
      return {
        questions: testQuizDynamicQuestions,
        staticSteps: quizStaticSteps,
      };
    }
    return null;
  },
);
