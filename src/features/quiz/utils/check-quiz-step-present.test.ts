import { describe, expect, it } from "vitest";
import type { TQuiz } from "../types-and-schemas";
import { checkQuizStepPresent } from "./check-quiz-step-present";

describe("checkQuizStepPresent", () => {
  const createQuiz = (): TQuiz => ({
    schemaVersion: "1.0.0",
    questions: [
      {
        id: "question-1",
        dataModel: {
          type: "single-select",
          title: { en: "Test Question" },
          options: [],
        },
        branches: [],
        defaultNextQuestionId: "next",
      },
    ],
    staticSteps: [
      {
        id: "loader-1",
        dataModel: {
          type: "loader",
          title: { en: "Loading" },
        },
        defaultNextQuestionId: "next",
      },
    ],
  });

  it("should find existing question", () => {
    const quiz = createQuiz();
    const result = checkQuizStepPresent(quiz, "question-1");

    expect(result.exists).toBe(true);
    expect(result.stepData?.id).toBe("question-1");
    expect(result.stepData?.dataModel.type).toBe("single-select");
  });

  it("should find existing static step", () => {
    const quiz = createQuiz();
    const result = checkQuizStepPresent(quiz, "loader-1");

    expect(result.exists).toBe(true);
    expect(result.stepData?.id).toBe("loader-1");
    expect(result.stepData?.dataModel.type).toBe("loader");
  });

  it("should return false for non-existent step", () => {
    const quiz = createQuiz();
    const result = checkQuizStepPresent(quiz, "non-existent");

    expect(result.exists).toBe(false);
    expect(result.stepData).toBeUndefined();
  });

  it("should prioritize question over static step with same id", () => {
    const quiz: TQuiz = {
      ...createQuiz(),
      staticSteps: [
        {
          id: "question-1",
          dataModel: {
            type: "loader",
            title: { en: "Loading" },
          },
          defaultNextQuestionId: null,
        },
      ],
    };

    const result = checkQuizStepPresent(quiz, "question-1");

    expect(result.stepData?.dataModel.type).toBe("single-select");
  });
});
