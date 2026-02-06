import { z } from "zod";
import { LocalizedStringSchema } from "@/features/quiz/types-and-schemas/localization";

export const QuizLoaderDataSchema = z.object({
  type: z.literal("loader"),
  title: LocalizedStringSchema,
});

export type TQuizLoaderData = z.infer<typeof QuizLoaderDataSchema>;
