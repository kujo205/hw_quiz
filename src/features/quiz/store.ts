import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { TQuiz } from "@/features/quiz/types-and-schemas";

type TQuizAnswer = string | string[];

interface QuizResult {
  answers: Record<string, TQuizAnswer>;
  email: string;
}

interface QuizStore {
  results: Record<string, QuizResult>;

  setAnswer: (quizId: string, questionId: string, val: TQuizAnswer) => void;
  setEmail: (quizId: string, email: string) => void;
  resetQuiz: (quizId: string) => void;

  // This is to store different quiz configurations
  configs: Record<string, TQuiz>;
  setConfig: (quizId: string, config: TQuiz) => void;
}

export const useQuizStore = create<QuizStore>()(
  persist(
    (set) => ({
      results: {},
      configs: {},
      setConfig: (quizId, config) =>
        set((state) => ({
          configs: { ...state.configs, [quizId]: config },
        })),

      setAnswer: (quizId, questionId, val) =>
        set((state) => {
          const currentQuiz = state.results[quizId] || {
            answers: {},
            email: "",
          };
          return {
            results: {
              ...state.results,
              [quizId]: {
                ...currentQuiz,
                answers: { ...currentQuiz.answers, [questionId]: val },
              },
            },
          };
        }),

      setEmail: (quizId, email) =>
        set((state) => ({
          results: {
            ...state.results,
            [quizId]: {
              ...(state.results[quizId] || { answers: {}, email: "" }),
              email,
            },
          },
        })),

      resetQuiz: (quizId) =>
        set((state) => {
          const newResults = { ...state.results };
          delete newResults[quizId];
          return { results: newResults };
        }),
    }),
    {
      name: "quiz-storage",
    },
  ),
);
