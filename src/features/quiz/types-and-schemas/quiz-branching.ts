import { z } from "zod";

/**
 * Logic Schemas for Quiz Branching
 */
const OperatorSchema = z.enum(["EQUALS", "CONTAINS", "NOT_EMPTY"]);

const ConditionSchema = z.object({
  questionId: z.string(),
  operator: OperatorSchema,
  value: z.any().optional(),
});

const BranchSchema = z.object({
  conditions: z.array(ConditionSchema),
  logic: z.enum(["AND", "OR"]),
  nextQuestionId: z.string(), // Може бути ID іншого питання або "loader"
});

type TBranch = z.infer<typeof BranchSchema>;
type TCondition = z.infer<typeof ConditionSchema>;
type TOperator = z.infer<typeof ConditionSchema>;

export { OperatorSchema, ConditionSchema, BranchSchema };
export type { TBranch, TOperator, TCondition };
