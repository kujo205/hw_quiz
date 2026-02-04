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
 * Dynamic Quiz Question Schema
 */
const QuizQuestionSchema = z.object({
  id: z.string(),
  order: z.number(), // Відображається як $X/5$
  type: z.enum([
    "single-select",
    "multiple-select",
    "bubble-select",
    "single-select-image",
  ]),
  title: LocalizedStringSchema,
  options: z.array(
    z.object({
      label: LocalizedStringSchema,
      value: z.string(),
    }),
  ),
  branches: z.array(BranchSchema),
  defaultNextId: z.string(),
});

/**
 * Static Screens Schema
 */
const StaticScreensSchema = z.object({
  loader: z.object({
    title: LocalizedStringSchema, // "Finding collections for you..."
  }),
  email: z.object({
    title: LocalizedStringSchema,
    description: LocalizedStringSchema,
    placeholder: LocalizedStringSchema,
    buttonText: LocalizedStringSchema,
    errorText: LocalizedStringSchema,
  }),
  thankYou: z.object({
    title: LocalizedStringSchema,
    subtitle: LocalizedStringSchema,
    downloadButton: LocalizedStringSchema,
    retakeButton: LocalizedStringSchema,
  }),
});

const QuizSchema = z.object({
  questions: z.array(QuizQuestionSchema),
  staticScreens: StaticScreensSchema,
});

export {
  LanguageSchema,
  LocalizedStringSchema,
  OperatorSchema,
  ConditionSchema,
  BranchSchema,
  QuizQuestionSchema,
  StaticScreensSchema,
  QuizSchema,
};

type TLanguage = z.infer<typeof LanguageSchema>;
type TLocalizedString = z.infer<typeof LocalizedStringSchema>;

type TBranch = z.infer<typeof BranchSchema>;
type TOperator = z.infer<typeof OperatorSchema>;
type TCondition = z.infer<typeof ConditionSchema>;

type TQuizQuestion = z.infer<typeof QuizQuestionSchema>;
type TStaticScreens = z.infer<typeof StaticScreensSchema>;

export type {
  TLanguage,
  TLocalizedString,
  TOperator,
  TCondition,
  TBranch,
  TQuizQuestion,
  TStaticScreens,
};
