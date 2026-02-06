import { z } from "zod";
import { EmojiOptionsSchema } from "@/features/quiz/types-and-schemas/common-question-schemas";
import { LocalizedStringSchema } from "@/features/quiz/types-and-schemas/localization";

export const EmojiSelectDataSchema = z.object({
  type: z.literal("single-select-question-emoji"),
  options: EmojiOptionsSchema,
  title: LocalizedStringSchema,
  description: LocalizedStringSchema.optional(),
});

export type TEmojiSelectQuestionSchema = z.infer<typeof EmojiSelectDataSchema>;
