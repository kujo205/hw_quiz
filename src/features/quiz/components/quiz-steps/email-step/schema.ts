import { z } from "zod";
import { LocalizedStringSchema } from "@/features/quiz/types-and-schemas/localization";

export const EmailStepDataSchema = z.object({
  type: z.literal("email"),
  title: LocalizedStringSchema,
  description: LocalizedStringSchema,
  placeholder: LocalizedStringSchema,
  errorText: LocalizedStringSchema,
});

export type TEmailStepData = z.infer<typeof EmailStepDataSchema>;
