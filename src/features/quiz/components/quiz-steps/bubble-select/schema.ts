import { z } from "zod";
import { EmojiOptionsSchema } from "@/features/quiz/types-and-schemas/common-question-schemas";
import { LocalizedStringSchema } from "@/features/quiz/types-and-schemas/localization";

export const BubbleSelectDataSchema = z.object({
  type: z.literal("bubble-select"),
  options: EmojiOptionsSchema,
  title: LocalizedStringSchema,
  description: LocalizedStringSchema.optional(),
});

export type TBubbleSelectData = z.infer<typeof BubbleSelectDataSchema>;
