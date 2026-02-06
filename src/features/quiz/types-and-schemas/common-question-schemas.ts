import { z } from "zod";
import { LocalizedStringSchema } from "@/features/quiz/types-and-schemas/localization";

export const OptionsSchema = z.array(
  z
    .object({
      label: LocalizedStringSchema,
      value: z.string(),
    })
    .loose(),
);

export const EmojiOptionsSchema = z.array(
  z
    .object({
      emoji: z.string(),
      label: LocalizedStringSchema,
      value: z.string(),
    })
    .loose(),
);
