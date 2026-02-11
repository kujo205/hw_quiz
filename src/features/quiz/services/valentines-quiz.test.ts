import { describe, expect, it } from "vitest";
import { getQuizConfig } from "./get-quiz";
import { valentinesDayQuiz } from "./quiz-data-items";

describe("Valentine's Day Quiz", () => {
  it("should return valentinesDayQuiz when quizId is 'valentines-day'", async () => {
    const quiz = await getQuizConfig("valentines-day");
    expect(quiz).toBe(valentinesDayQuiz);
  });

  it("should have correct schema version", () => {
    expect(valentinesDayQuiz.schemaVersion).toBe("1.0");
  });

  it("should have at least 6 dynamic questions", () => {
    expect(valentinesDayQuiz.questions.length).toBeGreaterThanOrEqual(6);
  });

  it("should have 3 static steps (loader, email, thank-you)", () => {
    expect(valentinesDayQuiz.staticSteps.length).toBe(3);
    expect(valentinesDayQuiz.staticSteps[0].dataModel.type).toBe("loader");
    expect(valentinesDayQuiz.staticSteps[1].dataModel.type).toBe("email");
    expect(valentinesDayQuiz.staticSteps[2].dataModel.type).toBe("thank-you");
  });

  it("should have language preference as first question", () => {
    const firstQuestion = valentinesDayQuiz.questions[0];
    expect(firstQuestion.id).toBe("preferred-language");
  });

  it("should have relationship-status question with correct options", () => {
    const relationshipQuestion = valentinesDayQuiz.questions.find(
      (q) => q.id === "relationship-status",
    );
    expect(relationshipQuestion).toBeDefined();
    expect(relationshipQuestion?.dataModel.type).toBe(
      "single-select-question-emoji",
    );
    
    if (relationshipQuestion?.dataModel.type === "single-select-question-emoji") {
      expect(relationshipQuestion.dataModel.options.length).toBe(3);
      expect(relationshipQuestion.dataModel.options.map((o) => o.value)).toEqual([
        "single",
        "relationship",
        "complicated",
      ]);
    }
  });

  it("should have branching logic on relationship-status", () => {
    const relationshipQuestion = valentinesDayQuiz.questions.find(
      (q) => q.id === "relationship-status",
    );
    expect(relationshipQuestion).toBeDefined();
    expect(relationshipQuestion?.branches.length).toBeGreaterThan(0);
    expect(relationshipQuestion?.branches[0].conditions[0].questionId).toBe(
      "relationship-status",
    );
  });

  it("should have love-language as a bubble-select question", () => {
    const loveLanguageQuestion = valentinesDayQuiz.questions.find(
      (q) => q.id === "love-language",
    );
    expect(loveLanguageQuestion).toBeDefined();
    expect(loveLanguageQuestion?.dataModel.type).toBe("bubble-select");
    
    if (loveLanguageQuestion?.dataModel.type === "bubble-select") {
      expect(loveLanguageQuestion.dataModel.options.length).toBe(5);
    }
  });

  it("should have valentine-plans as final dynamic question", () => {
    const lastQuestion =
      valentinesDayQuiz.questions[valentinesDayQuiz.questions.length - 1];
    expect(lastQuestion.id).toBe("valentine-plans");
    expect(lastQuestion.defaultNextQuestionId).toBe("loader");
  });

  it("should have all questions with multilingual titles", () => {
    for (const question of valentinesDayQuiz.questions) {
      expect(question.dataModel.title).toHaveProperty("en");
      expect(question.dataModel.title).toHaveProperty("fr");
      expect(question.dataModel.title).toHaveProperty("de");
      expect(question.dataModel.title).toHaveProperty("es");
    }
  });

  it("should have valid branching logic flow", () => {
    const relationshipQuestion = valentinesDayQuiz.questions.find(
      (q) => q.id === "relationship-status",
    );
    
    if (relationshipQuestion && relationshipQuestion.branches.length > 0) {
      const branch = relationshipQuestion.branches[0];
      expect(branch.logic).toBe("AND");
      expect(branch.nextQuestionId).toBe("ideal-date");
      expect(branch.conditions[0].operator).toBe("EQUALS");
      expect(branch.conditions[0].value).toBe("single");
    }
  });
});
