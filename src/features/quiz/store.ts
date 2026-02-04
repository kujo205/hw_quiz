import { create } from "zustand";
import { persist } from "zustand/middleware";
import type {
  TLanguage,
  TLocalizedString,
  TQuiz,
} from "@/features/quiz/types-and-schemas";

type TQuizAnswer = string | string[];

interface QuizResult {
  answers: Record<string, TQuizAnswer>;
  email: string;
  lang: TLanguage;
}

interface QuizStore {
  results: Record<string, QuizResult>;
  setAnswer: (quizId: string, questionId: string, val: TQuizAnswer) => void;
  setEmail: (quizId: string, email: string) => void;
  setLanguage: (quizId: string, lang: TLanguage) => void;
  resetQuiz: (quizId: string) => void;

  configs: Record<string, TQuiz>;
  setConfig: (quizId: string, config: TQuiz) => void;
}

const DEFAULT_QUIZ_RESULT: QuizResult = {
  answers: {},
  email: "",
  lang: "en", // English as default
};

export const useQuizStore = create<QuizStore>()(
  persist(
    (set) => ({
      results: {},
      configs: {},

      setConfig: (quizId, config) =>
        set((state) => ({
          configs: { ...state.configs, [quizId]: config },
        })),

      setLanguage: (quizId, lang) =>
        set((state) => ({
          results: {
            ...state.results,
            [quizId]: {
              // if no existing result, initialize with defaults
              ...(state.results[quizId] || DEFAULT_QUIZ_RESULT),
              lang,
            },
          },
        })),

      setAnswer: (quizId, questionId, val) =>
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
        }),

      setEmail: (quizId, email) =>
        set((state) => ({
          results: {
            ...state.results,
            [quizId]: {
              ...(state.results[quizId] || DEFAULT_QUIZ_RESULT),
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

export const useQuizTranslation = (quizId: string) => {
  const lang = useQuizStore((state) => state.results[quizId]?.lang || "en");

  /**
   * Func 't' (translate)
   * takes in object of type TLocalizedString (напр. { en: "Hello", fr: "Salut" }) and returns
   * the string in the current language, or falls back to English if the current language is not available.
   */
  const t = (localizedString?: TLocalizedString): string => {
    if (!localizedString) {
      console.error("Missing localized string for quiz:", quizId);
      return "";
    }

    return localizedString[lang] || localizedString["en"] || "";
  };

  return { t, lang };
};
