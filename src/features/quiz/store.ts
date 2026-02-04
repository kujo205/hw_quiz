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
  // active quiz id
  activeQuizId: string | null;

  // active quiz step
  activeQuizStep: string | null;

  // data for results and configs
  results: Record<string, QuizResult>;

  // methods used in quiz flow
  setAnswer: (questionId: string, val: TQuizAnswer) => void;
  setEmail: (email: string) => void;
  setLanguage: (lang: TLanguage) => void;

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
      activeQuizStep: null,
      results: {},
      configs: {},

      // setQuizParamsOnPageLoad: ({ quizId, stepId }) => {
      //   const config = configs[quizId];
      //
      //   assert(config, `Quiz config for '${quizId}' not found.`);
      //
      //   const stepExists = config.questions.some((q) => q.id === stepId);
      //
      //   if (stepExists) {
      //     return set({ activeQuizId: quizId, activeQuizStep: stepId });
      //   }
      //
      //   // const lastAccessedUserStep = get().results[quizId]
      //   // here step doesnt exist in the quiz config,
      //   console.log(
      //     "Quiz params on page load - quizId:",
      //     quizId,
      //     "stepId:",
      //     stepId,
      //   );
      // },
      //
      // setConfig: (quizId, config) =>
      //   set((state) => ({
      //     configs: { ...state.configs, [quizId]: config },
      //   })),

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
