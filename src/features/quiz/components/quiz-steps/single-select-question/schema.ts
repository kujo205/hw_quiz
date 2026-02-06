import { z } from "zod";
import { OptionsSchema } from "@/features/quiz/types-and-schemas/common-question-schemas";
import { LocalizedStringSchema } from "@/features/quiz/types-and-schemas/localization";

export const SingleSelectDataSchema = z.object({
  type: z.literal("single-select"),
  options: OptionsSchema,
  title: LocalizedStringSchema,
  description: LocalizedStringSchema.optional(),
});
