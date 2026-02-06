import { describe, expect, it } from "vitest";
import type {
  TQuizAnswer,
  TQuizDynamicQuestion,
  TStaticStep,
} from "../types-and-schemas";
import type { TBranch } from "../types-and-schemas/quiz-branching";
import { evaluateNextQuizStep } from "./evaluate-next-quiz-step";

describe("evaluateNextQuizStep", () => {
  const createLoaderStep = (
    defaultNextQuestionId: string | null = "next-step",
  ): TStaticStep => ({
    id: "loader-1",
    dataModel: {
      type: "loader",
      title: { en: "Title", fr: "Titre", de: "Titel", es: "Título" },
    },
    defaultNextQuestionId,
  });

  const createEmailStep = (
    defaultNextQuestionId: string | null = "next-step",
  ): TStaticStep => ({
    id: "email-1",
    dataModel: {
      type: "email",
      title: { en: "Title", fr: "Titre", de: "Titel", es: "Título" },
      description: { en: "Description", fr: "Description", de: "Beschreibung", es: "Descripción" },
      placeholder: { en: "Placeholder", fr: "Placeholder", de: "Platzhalter", es: "Marcador" },
      errorText: { en: "Error", fr: "Erreur", de: "Fehler", es: "Error" },
    },
    defaultNextQuestionId,
  });

  const createThankYouStep = (
    defaultNextQuestionId: string | null = "next-step",
  ): TStaticStep => ({
    id: "thank-you-1",
    dataModel: {
      type: "thank-you",
      title: { en: "Title", fr: "Titre", de: "Titel", es: "Título" },
      description: { en: "Description", fr: "Description", de: "Beschreibung", es: "Descripción" },
      downloadButtonText: { en: "Download", fr: "Télécharger", de: "Herunterladen", es: "Descargar" },
      retakeButtonText: { en: "Retake", fr: "Reprendre", de: "Wiederholen", es: "Repetir" },
    },
    defaultNextQuestionId,
  });

  const createQuestion = (
    type:
      | "single-select"
      | "multiple-select"
      | "bubble-select"
      | "single-select-question-emoji" = "single-select",
    branches: TBranch[] = [],
  ): TQuizDynamicQuestion => ({
    id: "question-1",
    dataModel: {
      type,
      title: { en: "Test Question", fr: "Question de test", de: "Testfrage", es: "Pregunta de prueba" },
      options: [
        { label: { en: "Option A", fr: "Option A", de: "Option A", es: "Opción A" }, value: "a", emoji: "🅰️" },
        { label: { en: "Option B", fr: "Option B", de: "Option B", es: "Opción B" }, value: "b", emoji: "🅱️" },
      ],
    },
    branches,
    defaultNextQuestionId: "default-next",
  });

  const createBranch = (
    conditions: Array<{
      questionId: string;
      operator: "EQUALS" | "CONTAINS" | "NOT_EMPTY";
      value?: string;
    }>,
    logic: "AND" | "OR" = "AND",
    nextQuestionId: string = "next-question",
  ): TBranch => ({ conditions, logic, nextQuestionId });

  const createAnswer = (
    answer: string | string[],
    order: number = 0,
    title: string = "Test Question",
    type: string = "single-select",
  ): TQuizAnswer => ({
    answer,
    order,
    title,
    type,
  });

  describe("Static Steps", () => {
    it("should return defaultNextQuestionId for static steps", () => {
      const loaderStep = createLoaderStep("question-1");
      const emailStep = createEmailStep("thank-you");

      expect(evaluateNextQuizStep(loaderStep, {})).toBe("question-1");
      expect(evaluateNextQuizStep(emailStep, {})).toBe("thank-you");
    });

    it("should throw error when defaultNextQuestionId is null", () => {
      const step = createThankYouStep(null);

      expect(() => evaluateNextQuizStep(step, {})).toThrow(
        'Static step "thank-you-1" has no defaultNextQuestionId defined.',
      );
    });
  });

  describe("Questions Without Branches", () => {
    it("should return defaultNextQuestionId when no branches exist", () => {
      const question = createQuestion();

      expect(evaluateNextQuizStep(question, {})).toBe("default-next");
    });
  });

  describe("EQUALS Operator", () => {
    it("should match single string value", () => {
      const question = createQuestion("single-select", [
        createBranch([{ questionId: "q1", operator: "EQUALS", value: "a" }]),
      ]);

      expect(evaluateNextQuizStep(question, { q1: createAnswer("a") })).toBe(
        "next-question",
      );
      expect(evaluateNextQuizStep(question, { q1: createAnswer("b") })).toBe(
        "default-next",
      );
    });

    it("should match single-item array", () => {
      const question = createQuestion("multiple-select", [
        createBranch([{ questionId: "q1", operator: "EQUALS", value: "a" }]),
      ]);

      expect(evaluateNextQuizStep(question, { q1: createAnswer(["a"]) })).toBe(
        "next-question",
      );
      expect(
        evaluateNextQuizStep(question, { q1: createAnswer(["a", "b"]) }),
      ).toBe("default-next");
    });
  });

  describe("CONTAINS Operator", () => {
    it("should check if array contains value", () => {
      const question = createQuestion("multiple-select", [
        createBranch([{ questionId: "q1", operator: "CONTAINS", value: "b" }]),
      ]);

      expect(
        evaluateNextQuizStep(question, { q1: createAnswer(["a", "b"]) }),
      ).toBe("next-question");
      expect(
        evaluateNextQuizStep(question, { q1: createAnswer(["a", "c"]) }),
      ).toBe("default-next");
    });
  });

  describe("NOT_EMPTY Operator", () => {
    it("should validate non-empty string", () => {
      const question = createQuestion("single-select", [
        createBranch([{ questionId: "q1", operator: "NOT_EMPTY" }]),
      ]);

      expect(evaluateNextQuizStep(question, { q1: createAnswer("a") })).toBe(
        "next-question",
      );
      expect(evaluateNextQuizStep(question, { q1: createAnswer("") })).toBe(
        "default-next",
      );
    });

    it("should validate non-empty array", () => {
      const question = createQuestion("multiple-select", [
        createBranch([{ questionId: "q1", operator: "NOT_EMPTY" }]),
      ]);

      expect(evaluateNextQuizStep(question, { q1: createAnswer(["a"]) })).toBe(
        "next-question",
      );
      expect(evaluateNextQuizStep(question, { q1: createAnswer([]) })).toBe(
        "default-next",
      );
    });
  });

  describe("Branch Logic", () => {
    it("should satisfy AND when all conditions are true", () => {
      const question = createQuestion("single-select", [
        createBranch([
          { questionId: "q1", operator: "EQUALS", value: "a" },
          { questionId: "q2", operator: "EQUALS", value: "b" },
        ]),
      ]);

      expect(
        evaluateNextQuizStep(question, {
          q1: createAnswer("a", 0),
          q2: createAnswer("b", 1),
        }),
      ).toBe("next-question");
      expect(
        evaluateNextQuizStep(question, {
          q1: createAnswer("a", 0),
          q2: createAnswer("c", 1),
        }),
      ).toBe("default-next");
    });

    it("should satisfy OR when at least one condition is true", () => {
      const question = createQuestion("single-select", [
        createBranch(
          [
            { questionId: "q1", operator: "EQUALS", value: "a" },
            { questionId: "q2", operator: "EQUALS", value: "b" },
          ],
          "OR",
        ),
      ]);

      expect(
        evaluateNextQuizStep(question, {
          q1: createAnswer("a", 0),
          q2: createAnswer("c", 1),
        }),
      ).toBe("next-question");
      expect(
        evaluateNextQuizStep(question, {
          q1: createAnswer("x", 0),
          q2: createAnswer("y", 1),
        }),
      ).toBe("default-next");
    });
  });

  describe("Multiple Branches", () => {
    it("should return first matching branch", () => {
      const question = createQuestion("single-select", [
        createBranch(
          [{ questionId: "q1", operator: "EQUALS", value: "a" }],
          "AND",
          "branch-1",
        ),
        createBranch(
          [{ questionId: "q1", operator: "EQUALS", value: "b" }],
          "AND",
          "branch-2",
        ),
      ]);

      expect(evaluateNextQuizStep(question, { q1: createAnswer("a") })).toBe(
        "branch-1",
      );
      expect(evaluateNextQuizStep(question, { q1: createAnswer("b") })).toBe(
        "branch-2",
      );
      expect(evaluateNextQuizStep(question, { q1: createAnswer("c") })).toBe(
        "default-next",
      );
    });
  });
});
