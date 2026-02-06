import { describe, expect, it } from "vitest";
import { aiGeneratedQuiz } from "./quiz-data-items";
import { QuizSchema } from "@/features/quiz/types-and-schemas";

describe("AI Generated Quiz", () => {
  it("should have a valid schema", () => {
    const result = QuizSchema.safeParse(aiGeneratedQuiz);
    expect(result.success).toBe(true);
  });

  it("should have exactly 10 steps (7 dynamic + 3 static)", () => {
    const totalSteps =
      aiGeneratedQuiz.questions.length + aiGeneratedQuiz.staticSteps.length;
    expect(totalSteps).toBe(10);
    expect(aiGeneratedQuiz.questions.length).toBe(7);
    expect(aiGeneratedQuiz.staticSteps.length).toBe(3);
  });

  it("should have branching logic in at least one question", () => {
    const questionsWithBranches = aiGeneratedQuiz.questions.filter(
      (q) => q.branches.length > 0,
    );
    expect(questionsWithBranches.length).toBeGreaterThan(0);
  });

  it("should have correct question IDs", () => {
    const expectedDynamicIds = [
      "experience-level",
      "learning-style",
      "work-focus",
      "ui-preferences",
      "interests",
      "ai-experience",
      "time-commitment",
    ];

    const actualIds = aiGeneratedQuiz.questions.map((q) => q.id);
    expect(actualIds).toEqual(expectedDynamicIds);
  });

  it("should have correct static step IDs", () => {
    const expectedStaticIds = ["ai-loader", "ai-email", "ai-thank-you"];

    const actualIds = aiGeneratedQuiz.staticSteps.map((s) => s.id);
    expect(actualIds).toEqual(expectedStaticIds);
  });

  it("should have branching logic for experience-level question", () => {
    const experienceLevelQuestion = aiGeneratedQuiz.questions.find(
      (q) => q.id === "experience-level",
    );

    expect(experienceLevelQuestion).toBeDefined();
    expect(experienceLevelQuestion?.branches.length).toBeGreaterThan(0);
    expect(experienceLevelQuestion?.branches[0].nextQuestionId).toBe(
      "learning-style",
    );
    expect(experienceLevelQuestion?.branches[0].conditions[0].value).toBe(
      "beginner",
    );
  });

  it("should have branching logic for work-focus question", () => {
    const workFocusQuestion = aiGeneratedQuiz.questions.find(
      (q) => q.id === "work-focus",
    );

    expect(workFocusQuestion).toBeDefined();
    expect(workFocusQuestion?.branches.length).toBeGreaterThan(0);
    expect(workFocusQuestion?.branches[0].nextQuestionId).toBe(
      "ui-preferences",
    );
    expect(workFocusQuestion?.branches[0].logic).toBe("OR");
  });

  it("should have branching logic for interests question", () => {
    const interestsQuestion = aiGeneratedQuiz.questions.find(
      (q) => q.id === "interests",
    );

    expect(interestsQuestion).toBeDefined();
    expect(interestsQuestion?.branches.length).toBeGreaterThan(0);
    expect(interestsQuestion?.branches[0].nextQuestionId).toBe("ai-experience");
    expect(interestsQuestion?.branches[0].conditions[0].value).toBe("ai-ml");
  });

  it("should have all questions with multilingual support", () => {
    aiGeneratedQuiz.questions.forEach((question) => {
      expect(question.dataModel.title.en).toBeDefined();
      expect(question.dataModel.title.fr).toBeDefined();
      expect(question.dataModel.title.de).toBeDefined();
      expect(question.dataModel.title.es).toBeDefined();
    });
  });

  it("should have all static steps with multilingual support", () => {
    aiGeneratedQuiz.staticSteps.forEach((step) => {
      expect(step.dataModel.title.en).toBeDefined();
      expect(step.dataModel.title.fr).toBeDefined();
      expect(step.dataModel.title.de).toBeDefined();
      expect(step.dataModel.title.es).toBeDefined();
    });
  });

  it("should have the last static step with null defaultNextQuestionId", () => {
    const lastStep =
      aiGeneratedQuiz.staticSteps[aiGeneratedQuiz.staticSteps.length - 1];
    expect(lastStep.defaultNextQuestionId).toBeNull();
  });

  it("should have correct schema version", () => {
    expect(aiGeneratedQuiz.schemaVersion).toBe("1.0");
  });
});
