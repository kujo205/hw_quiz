import { z } from "zod";
import { OptionsSchema } from "@/features/quiz/types-and-schemas/common-question-schemas";
import { LocalizedStringSchema } from "@/features/quiz/types-and-schemas/localization";

export const MultipleSelectDataSchema = z.object({
  type: z.literal("multiple-select"),
  options: OptionsSchema,
  title: LocalizedStringSchema,
  description: LocalizedStringSchema.optional(),
});

export type TMultipleSelectData = z.infer<typeof MultipleSelectDataSchema>;
