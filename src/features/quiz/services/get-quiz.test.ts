import { describe, expect, it } from "vitest";
import { getQuizConfig } from "./get-quiz";

describe("getQuizConfig", () => {
  it("should return the AI-generated quiz for test-quiz-created-by-ai", async () => {
    const quiz = await getQuizConfig("test-quiz-created-by-ai");
    
    expect(quiz).not.toBeNull();
    expect(quiz?.schemaVersion).toBe("1.0");
    expect(quiz?.questions.length).toBe(7);
    expect(quiz?.staticSteps.length).toBe(3);
  });

  it("should return the test quiz for test-quiz", async () => {
    const quiz = await getQuizConfig("test-quiz");
    
    expect(quiz).not.toBeNull();
    expect(quiz?.schemaVersion).toBe("1.0");
  });

  it("should return null for unknown quiz ID", async () => {
    const quiz = await getQuizConfig("non-existent-quiz");
    
    expect(quiz).toBeNull();
  });
});
