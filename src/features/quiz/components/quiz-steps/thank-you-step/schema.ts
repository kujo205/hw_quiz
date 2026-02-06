import { z } from "zod";
import { LocalizedStringSchema } from "@/features/quiz/types-and-schemas/localization";

export const ThankUStepDataSchema = z.object({
  type: z.literal("thank-you"),
  title: LocalizedStringSchema,
  description: LocalizedStringSchema,
  downloadButtonText: LocalizedStringSchema,
  retakeButtonText: LocalizedStringSchema,
});

export type TThankUStepData = z.infer<typeof ThankUStepDataSchema>;
