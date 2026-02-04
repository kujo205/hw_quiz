import { z } from "zod";

/**
 * Localization Schemas
 */
const LanguageSchema = z.enum(["en", "fr", "de", "es"]);

const LocalizedStringSchema = z.record(LanguageSchema, z.string());

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

/**
 * Schemas for Quiz Steps
 */
const BaseStepSchema = z.object({
  id: z.string(),
  texts: z.record(z.string(), LocalizedStringSchema.optional()),
});

const dynamicQuestionTypes = [
  "single-select",
  "multiple-select",
  "bubble-select",
  "single-select-image",
] as const;

const QuestionSchema = BaseStepSchema.extend({
  order: z.number(),
  type: z.enum(dynamicQuestionTypes),
  options: z.array(
    z.object({
      label: LocalizedStringSchema,
      value: z.string(),
    }),
  ),
  branches: z.array(BranchSchema),
  defaultNextQuestionId: z.string(),
});

const staticStepTypes = ["loader", "email", "thank-you"] as const;

const StaticStepSchema = BaseStepSchema.extend({
  type: z.enum(staticStepTypes),
  defaultNextQuestionId: z.string().nullable(),
});

const QuizSchema = z.object({
  schemaVersion: z.string(),
  questions: z.array(QuestionSchema),
  staticSteps: z.record(z.string(), StaticStepSchema), // Екрани за ID
});

export {
  LanguageSchema,
  LocalizedStringSchema,
  OperatorSchema,
  ConditionSchema,
  BranchSchema,
  QuizSchema,
  dynamicQuestionTypes,
  staticStepTypes,
};

type TLanguage = z.infer<typeof LanguageSchema>;
type TLocalizedString = z.infer<typeof LocalizedStringSchema>;
type TBranch = z.infer<typeof BranchSchema>;
type TOperator = z.infer<typeof OperatorSchema>;
type TCondition = z.infer<typeof ConditionSchema>;
type TQuizQuestion = z.infer<typeof QuestionSchema>;
type TQuizStaticStep = z.infer<typeof StaticStepSchema>;
type TQuiz = z.infer<typeof QuizSchema>;

export type {
  TLanguage,
  TLocalizedString,
  TOperator,
  TCondition,
  TBranch,
  TQuizQuestion,
  TQuiz,
  TQuizStaticStep,
};
