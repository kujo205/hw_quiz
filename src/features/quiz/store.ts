import { create } from "zustand";
import { persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import type {
  TLanguage,
  TLocalizedString,
  TQuizAnswer,
} from "@/features/quiz/types-and-schemas";

interface QuizResult {
  answers: Record<string, TQuizAnswer>;
  email: string;
  lang: TLanguage;
}

interface QuizStore {
  // current active quiz and step
  activeQuizId: string | null;
  activeQuizStep: string | null;

  // data for results, quizId and Result object
  results: Record<string, QuizResult>;

  setQuizData: (quizId: string, stepId: string) => void;

  // methods used in quiz flow
  setAnswer: (questionId: string, val: TQuizAnswer) => void;

  //
  setEmail: (email: string) => void;

  // for i10n
  setLanguage: (lang: TLanguage) => void;

  // nullify quiz results
  resetQuiz: () => void;

  // go back one step in the quiz
  goOneStepBack: () => void;

  getCurrenStepOrder: () => number;

  getCurrentQuizAnswers: () => Record<string, TQuizAnswer>;

  // translation method
  t: (localizedString?: TLocalizedString) => string;
}

const DEFAULT_QUIZ_RESULT = {
  answers: {},
  email: "",
  lang: "en",
} satisfies QuizResult;

export const useQuizStore = create<QuizStore>()(
  persist(
    immer((set, get) => ({
      activeQuizId: null,
      activeQuizStep: null,
      results: {},

      setQuizData: (quizId, stepId) => {
        set((state) => {
          state.activeQuizId = quizId;
          state.activeQuizStep = stepId;
          if (!state.results[quizId]) {
            state.results[quizId] = { ...DEFAULT_QUIZ_RESULT };
          }
        });
      },

      getCurrentQuizAnswers: () => {
        const quizId = get().activeQuizId;
        if (!quizId) return {};

        return get().results[quizId]?.answers || {};
      },

      getCurrenStepOrder: () => {
        const quizId = get().activeQuizId;
        const stepId = get().activeQuizStep;

        if (!quizId || !stepId) return 0;

        const answers = get().results[quizId]?.answers;
        const answer = answers[stepId];

        console.log("answers", answers);

        console.log("answer for stepId", stepId, answer);
        return answer?.order ?? Object.values(answers)?.length + 1;
      },

      setLanguage: (lang) => {
        const quizId = get().activeQuizId;
        if (!quizId) return;

        set((state) => {
          if (!state.results[quizId]) {
            state.results[quizId] = { ...DEFAULT_QUIZ_RESULT };
          }
          state.results[quizId].lang = lang;
        });
      },

      setAnswer: (questionId, val) => {
        const quizId = get().activeQuizId;
        if (!quizId) return;

        set((state) => {
          if (!state.results[quizId]) {
            state.results[quizId] = { ...DEFAULT_QUIZ_RESULT };
          }
          state.results[quizId].answers[questionId] = val;
        });
      },

      setEmail: (email) => {
        const quizId = get().activeQuizId;
        if (!quizId) return;

        set((state) => {
          if (!state.results[quizId]) {
            state.results[quizId] = { ...DEFAULT_QUIZ_RESULT };
          }
          state.results[quizId].email = email;
        });
      },

      resetQuiz: () => {
        const quizId = get().activeQuizId;
        if (!quizId) return;

        set((state) => {
          delete state.results[quizId];
        });
      },

      goOneStepBack: () => {},

      t: (localizedString) => {
        const quizId = get().activeQuizId;
        if (!quizId || !localizedString) return "";

        const lang = get().results[quizId]?.lang || "en";
        return localizedString[lang] || localizedString["en"] || "";
      },
    })),
    {
      name: "quiz-storage",
      partialize: (state) => ({ results: state.results }),
    },
  ),
);
