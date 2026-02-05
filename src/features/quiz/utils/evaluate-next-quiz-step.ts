import { assert } from "@/shared/utils/assert";
import {
  staticStepTypes,
  type TBranch,
  type TCondition,
  type TQuizAnswer,
  type TQuizQuestion,
  type TQuizStaticStep,
} from "../types-and-schemas";

/**
 * Evaluates the next quiz step based on current step data and answers
 */
export function evaluateNextQuizStep(
  stepData: TQuizStaticStep | TQuizQuestion,
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
  const answer = answers[condition.questionId]?.value;

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
function isStaticStep(
  stepData: TQuizStaticStep | TQuizQuestion,
): stepData is TQuizStaticStep {
  return (staticStepTypes as readonly string[]).includes(stepData.type);
}
