import { create } from "zustand";
import { persist } from "zustand/middleware";
import type {
  TLanguage,
  TLocalizedString,
  TQuiz,
} from "@/features/quiz/types-and-schemas";

export type TQuizAnswer = string | string[];

interface QuizResult {
  answers: Record<string, TQuizAnswer>;
  email: string;
  lang: TLanguage;
}

interface QuizStore {
  // state of active quiz
  activeQuizId: string | null;
  setActiveQuizId: (id: string) => void;

  // data for results and configs
  results: Record<string, QuizResult>;
  configs: Record<string, TQuiz>;

  // methods used in quiz flow
  setAnswer: (questionId: string, val: TQuizAnswer) => void;
  setEmail: (email: string) => void;
  setLanguage: (lang: TLanguage) => void;
  setConfig: (quizId: string, config: TQuiz) => void;
  resetQuiz: () => void;

  // translation method
  t: (localizedString?: TLocalizedString) => string;
}

const DEFAULT_QUIZ_RESULT: QuizResult = {
  answers: {},
  email: "",
  lang: "en",
};

export const useQuizStore = create<QuizStore>()(
  persist(
    (set, get) => ({
      activeQuizId: null,
      results: {},
      configs: {},

      setActiveQuizId: (id) => set({ activeQuizId: id }),

      setConfig: (quizId, config) =>
        set((state) => ({
          configs: { ...state.configs, [quizId]: config },
        })),

      setLanguage: (lang) => {
        const quizId = get().activeQuizId;
        if (!quizId) return;
        set((state) => ({
          results: {
            ...state.results,
            [quizId]: {
              ...(state.results[quizId] || DEFAULT_QUIZ_RESULT),
              lang,
            },
          },
        }));
      },

      setAnswer: (questionId, val) => {
        const quizId = get().activeQuizId;
        if (!quizId) return;
        set((state) => {
          const currentQuiz = state.results[quizId] || DEFAULT_QUIZ_RESULT;
          return {
            results: {
              ...state.results,
              [quizId]: {
                ...currentQuiz,
                answers: { ...currentQuiz.answers, [questionId]: val },
              },
            },
          };
        });
      },

      setEmail: (email) => {
        const quizId = get().activeQuizId;
        if (!quizId) return;
        set((state) => ({
          results: {
            ...state.results,
            [quizId]: {
              ...(state.results[quizId] || DEFAULT_QUIZ_RESULT),
              email,
            },
          },
        }));
      },

      resetQuiz: () => {
        const quizId = get().activeQuizId;
        if (!quizId) return;
        set((state) => {
          const newResults = { ...state.results };
          delete newResults[quizId];
          return { results: newResults };
        });
      },

      t: (localizedString) => {
        const quizId = get().activeQuizId;
        if (!quizId || !localizedString) return "";

        const lang = get().results[quizId]?.lang || "en";
        return localizedString[lang] || localizedString["en"] || "";
      },
    }),
    {
      name: "quiz-storage",

      // this makes sure we persist only results and configs across sessions
      partialize: (state) => ({
        results: state.results,
        configs: state.configs,
      }),
    },
  ),
);
