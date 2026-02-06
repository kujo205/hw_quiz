import { z } from "zod";
import { BubbleSelectDataSchema } from "@/features/quiz/components/quiz-steps/bubble-select/schema";
import { EmailStepDataSchema } from "@/features/quiz/components/quiz-steps/email-step/schema";
import { EmojiSelectDataSchema } from "@/features/quiz/components/quiz-steps/emoji-select-question/schema";
import { MultipleSelectDataSchema } from "@/features/quiz/components/quiz-steps/multiple-select/schema";
import { QuizLoaderDataSchema } from "@/features/quiz/components/quiz-steps/quiz-loader/schema";
import { SingleSelectDataSchema } from "@/features/quiz/components/quiz-steps/single-select-question/schema";
import { ThankUStepDataSchema } from "@/features/quiz/components/quiz-steps/thank-you-step/schema";

import { LocalizedStringSchema } from "@/features/quiz/types-and-schemas/localization";
import { BranchSchema } from "@/features/quiz/types-and-schemas/quiz-branching";

/**
 * This must be present in both Dynamic and Static Questions
 */
const BaseStepSchema = z.object({
  id: z.string(),
  defaultNextQuestionId: z.string().nullable(),
});

const dynamicQuestionTypes = [
  "single-select-question",
  "multiple-select",
  "bubble-select",
  "single-select-question-emoji",
] as const;

const dynamicDataSchemas = [
  SingleSelectDataSchema,
  MultipleSelectDataSchema,
  BubbleSelectDataSchema,
  EmojiSelectDataSchema,
] as const;

const DynamicQuestionSchema = BaseStepSchema.extend({
  dataModel: z.discriminatedUnion("type", dynamicDataSchemas),
  branches: z.array(BranchSchema),
  defaultNextQuestionId: z.string(),
});

const QuestionSchema = BaseStepSchema.extend({
  order: z.number(),
  type: z.enum(dynamicQuestionTypes),
  options: z.array(
    z
      .object({
        label: LocalizedStringSchema,
        value: z.string(),
      })
      .loose(),
  ),
  branches: z.array(BranchSchema),
  defaultNextQuestionId: z.string(),
});

const staticStepTypes = ["loader", "email", "thank-you"] as const;

const StaticStepSchema = BaseStepSchema.extend({
  type: z.enum(staticStepTypes),
  defaultNextQuestionId: z.string().nullable(),
});

const staticDataSchemas = [
  QuizLoaderDataSchema,
  EmailStepDataSchema,
  ThankUStepDataSchema,
] as const;

const StaticStepSchema2 = BaseStepSchema.extend({
  dataModel: z.discriminatedUnion("type", staticDataSchemas),
});

const QuizSchema = z.object({
  schemaVersion: z.string(),
  questions: z.array(QuestionSchema),
  staticSteps: z.record(z.string(), StaticStepSchema), // Екрани за ID
});

const QuizSchema2 = z.object({
  schemaVersion: z.string(),
  questions: z.array(DynamicQuestionSchema),
  staticSteps: z.array(StaticStepSchema2),
});

export {
  DynamicQuestionSchema,
  StaticStepSchema2,
  QuizSchema2,
  type BranchSchema,
  QuizSchema,
  dynamicQuestionTypes,
  staticStepTypes,
};

type TQuizDynamicQuestion = z.infer<typeof DynamicQuestionSchema>;
type TStaticStep = z.infer<typeof StaticStepSchema2>;

type TQuizQuestion = z.infer<typeof QuestionSchema>;
type TQuizStaticStep = z.infer<typeof StaticStepSchema>;
type TQuiz = z.infer<typeof QuizSchema>;
type TQuiz2 = z.infer<typeof QuizSchema2>;

type TQuizStep = TQuizQuestion | TQuizStaticStep;
type TQuizStep2 = TQuizDynamicQuestion | TStaticStep;

export type SelectHandler = (questionId: string, val: TQuizAnswer) => void;

export type TQuizAnswerRaw = string | string[];

export type TQuizAnswer = {
  order: number;
  title: string;
  type: string;
  answer: string | string[];
};

export type {
  TQuizQuestion,
  TQuiz,
  TQuiz2,
  TQuizStaticStep,
  TQuizStep,
  TQuizStep2,
  TQuizDynamicQuestion,
  TStaticStep,
};
