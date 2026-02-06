import { create } from "zustand";
import { persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import type {
  TQuiz,
  TQuizAnswer,
  TQuizAnswerRaw,
  TQuizStep,
} from "@/features/quiz/types-and-schemas";
import {
  isLanguage,
  type TLanguage,
  type TLocalizedString,
} from "@/features/quiz/types-and-schemas/localization";
import { checkQuizStepPresent } from "@/features/quiz/utils/check-quiz-step-present";
import { evaluateNextQuizStep } from "@/features/quiz/utils/evaluate-next-quiz-step";
import { getIsStaticStep } from "@/features/quiz/utils/get-is-static-step";
import { getNextQuizStepData } from "@/features/quiz/utils/get-next-quiz-step-data";
import { assert } from "@/shared/utils/assert";

interface QuizResult {
  answers: Record<string, TQuizAnswer>;
  email: string;
  lang: TLanguage;
}

interface QuizStore {
  // hydration state
  hydrated: boolean;

  // current active quiz and step
  activeQuizId: string;
  activeQuizStep: string;

  //
  quizConfig: TQuiz;

  //
  setQuizConfig: (arg0: TQuiz) => void;

  getRedirectStepIfWrongStep: (stepId: string) => string | undefined;

  // data for results, quizId and Result object
  results: Record<string, QuizResult>;

  setQuizData: (quizId: string, stepId: string) => void;

  // methods used in quiz flow
  setAnswerGetNextStepId: (questionId: string, val: TQuizAnswer) => string;

  //
  getCurrentStepData: () => TQuizStep | undefined;

  //
  getCurrentStepOrderIndex: () => number;

  //
  setEmail: (email: string) => void;

  getEmail: () => string;

  // for i10n
  setLanguage: (lang: string) => void;

  // nullify quiz results
  resetQuiz: () => void;

  getCurrentQuizAnswers: () => Record<string, TQuizAnswer>;

  getQuestionAnswer: (qId: string) => TQuizAnswerRaw;

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
      hydrated: false,

      // These values are being set immediately after hydration in the quiz page
      activeQuizId: "none",
      activeQuizStep: "none",

      results: {},
      quizConfig: {
        schemaVersion: "1.0",
        questions: [],
        staticSteps: [],
      },

      setQuizConfig: (quizConfig) => {
        set((state) => {
          state.quizConfig = quizConfig;
        });
      },

      getEmail: () => {
        const state = get();
        const quizId = state.activeQuizId;

        return state.results[quizId]?.email;
      },

      getCurrentStepOrderIndex: () => {
        const state = get();
        const quizId = state.activeQuizId;
        const stepId = state.activeQuizStep;

        if (!quizId || !stepId) {
          return 1;
        }

        const answer = state.results[quizId]?.answers[stepId];

        return answer?.order ?? 1;
      },

      getQuestionAnswer: (questionId: string) => {
        const activeQuizId = get().activeQuizId;

        return get().results[activeQuizId]?.answers[questionId]?.answer;
      },

      getCurrentStepData: () => {
        const { stepData } = checkQuizStepPresent(
          get().quizConfig,
          get().activeQuizStep,
        );

        return stepData;
      },

      getRedirectStepIfWrongStep: (stepId) => {
        const quizConfig = get().quizConfig;

        if (!quizConfig) {
          return;
        }

        const { exists } = checkQuizStepPresent(quizConfig, stepId);

        if (!exists) {
          const firstQuestion = quizConfig.questions[0];
          return firstQuestion.id;
        }
      },

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

      setLanguage: (lang) => {
        const quizId = get().activeQuizId;
        if (!quizId) return;

        set((state) => {
          if (!state.results[quizId]) {
            state.results[quizId] = { ...DEFAULT_QUIZ_RESULT };
          }
          if (isLanguage(lang)) {
            state.results[quizId].lang = lang;
          }
        });
      },

      setAnswerGetNextStepId: (questionId, val) => {
        const quizId = get().activeQuizId;
        const currentStepData = get().getCurrentStepData();

        assert(
          currentStepData,
          "Current step data should be available when setting answer",
        );

        const oldAnswers = get().getCurrentQuizAnswers();

        const newAnswers = {
          ...oldAnswers,
          [questionId]: val,
        };

        const nextStepId = evaluateNextQuizStep(currentStepData, newAnswers);

        set((state) => {
          if (!state.results[quizId]) {
            state.results[quizId] = { ...DEFAULT_QUIZ_RESULT };
          }

          // Save current question's answer with its order (if it's a question type)
          const currentOrder =
            "dataModel" in currentStepData
              ? newAnswers[questionId]?.order || Object.keys(newAnswers).length
              : 0;
          state.results[quizId].answers[questionId] = {
            ...val,
            order: currentOrder,
          };

          // Get next step's order from existing answers or default to next index
          const answers = state.results[quizId].answers;
          const nextOrder = answers[nextStepId]?.order ?? currentOrder + 1;
          const nextQuestionData = getNextQuizStepData(
            state.quizConfig,
            nextStepId,
          );

          // Initialize next question's answer with its order
          // only if it is not a static step
          if (!answers[nextStepId] && !getIsStaticStep(nextStepId)) {
            answers[nextStepId] = {
              title: "",
              type: nextQuestionData?.dataModel.type || "",
              answer: "",
              order: nextOrder,
            };
          }
        });

        return nextStepId;
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

      t: (localizedString) => {
        if (!localizedString) return "";

        const state = get();
        const quizId = state.activeQuizId;

        const lang = (quizId && state.results[quizId]?.lang) || "en";

        return localizedString[lang] || localizedString.en || "";
      },
    })),
    {
      name: "quiz-storage",
      partialize: (state) => ({
        results: state.results,
        activeQuizId: state.activeQuizId,
        activeQuizStep: state.activeQuizStep,
      }),
      onRehydrateStorage: () => (state) => {
        if (state) {
          state.hydrated = true;
        }
      },
    },
  ),
);
