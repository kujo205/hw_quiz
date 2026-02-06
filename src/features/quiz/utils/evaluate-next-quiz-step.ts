import { assert } from "@/shared/utils/assert";
import type { TQuizAnswer, TQuizStep, TStaticStep } from "../types-and-schemas";
import type { TBranch, TCondition } from "../types-and-schemas/quiz-branching";

/**
 * Evaluates the next quiz step based on current step data and answers
 */
export function evaluateNextQuizStep(
  stepData: TQuizStep,
  answers: Record<string, TQuizAnswer>,
): string {
  if (isStaticStep(stepData)) {
    assert(
      stepData.defaultNextQuestionId !== null,
      `Static step "${stepData.id}" has no defaultNextQuestionId defined.`,
    );

    return stepData.defaultNextQuestionId;
  }

  for (const branch of stepData.branches) {
    if (evaluateBranch(branch, answers)) {
      return branch.nextQuestionId;
    }
  }

  return stepData.defaultNextQuestionId;
}

function evaluateBranch(
  branch: TBranch,
  answers: Record<string, TQuizAnswer>,
): boolean {
  const results = branch.conditions.map((condition) =>
    evaluateCondition(condition, answers),
  );

  return branch.logic === "AND"
    ? results.every((result) => result)
    : results.some((result) => result);
}

function evaluateCondition(
  condition: TCondition,
  answers: Record<string, TQuizAnswer>,
): boolean {
  const answer = answers[condition.questionId]?.answer;

  switch (condition.operator) {
    case "NOT_EMPTY":
      if (Array.isArray(answer)) {
        return answer.length > 0;
      }
      return answer !== undefined && answer !== null && answer !== "";

    case "EQUALS":
      if (Array.isArray(answer)) {
        return answer.length === 1 && answer[0] === condition.value;
      }
      return answer === condition.value;

    case "CONTAINS":
      if (Array.isArray(answer)) {
        return answer.includes(condition.value);
      }
      if (typeof answer === "string" && typeof condition.value === "string") {
        return answer.includes(condition.value);
      }
      return false;

    default:
      console.warn(`Unknown operator: ${condition.operator}`);
      return false;
  }
}

/**
 * Type guard to check if stepData is a static step
 */
const STATIC_STEP_TYPES = ["loader", "email", "thank-you"] as const;

function isStaticStep(stepData: TQuizStep): stepData is TStaticStep {
  return STATIC_STEP_TYPES.includes(
    stepData.dataModel.type as (typeof STATIC_STEP_TYPES)[number],
  );
}
