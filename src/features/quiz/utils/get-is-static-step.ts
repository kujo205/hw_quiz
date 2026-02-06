import { staticStepTypes } from "@/features/quiz/types-and-schemas";

const STATIC_STEPS = new Set<string>(staticStepTypes);

export function getIsStaticStep(stepType: string) {
  return STATIC_STEPS.has(stepType);
}
