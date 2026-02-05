import { describe, expect, it } from "vitest";
import type {
  TQuizAnswer,
  TQuizQuestion,
  TQuizStaticStep,
} from "../types-and-schemas";
import { evaluateNextQuizStep } from "./evaluate-next-quiz-step";

describe("evaluateNextQuizStep", () => {
  const createStaticStep = (
    type: TQuizStaticStep["type"],
    defaultNextQuestionId: string | null = "next-step",
  ): TQuizStaticStep => ({
    id: `${type}-1`,
    type,
    texts: {},
    defaultNextQuestionId,
  });

  const createQuestion = (
    type: TQuizQuestion["type"] = "single-select",
    branches: TQuizQuestion["branches"] = [],
  ): TQuizQuestion => ({
    id: "question-1",
    order: 1,
    type,
    texts: {},
    options: [
      //@ts-expect-error-next-line: Ignore for test
      { label: { en: "Option A" }, value: "a" },
      //@ts-expect-error-next-line: Ignore for test
      { label: { en: "Option B" }, value: "b" },
    ],
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
  ) => ({ conditions, logic, nextQuestionId });

  const createAnswer = (
    value: string | string[],
    order: number = 0,
  ): TQuizAnswer => ({
    value,
    order,
  });

  describe("Static Steps", () => {
    it("should return defaultNextQuestionId for static steps", () => {
      const loaderStep = createStaticStep("loader", "question-1");
      const emailStep = createStaticStep("email", "thank-you");

      expect(evaluateNextQuizStep(loaderStep, {})).toBe("question-1");
      expect(evaluateNextQuizStep(emailStep, {})).toBe("thank-you");
    });

    it("should throw error when defaultNextQuestionId is null", () => {
      const step = createStaticStep("thank-you", null);

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
