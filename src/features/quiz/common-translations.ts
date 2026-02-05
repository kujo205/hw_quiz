import type { TLocalizedString } from "@/features/quiz/types-and-schemas";

const nextButton = {
  en: "Next",
  es: "Siguiente",
  fr: "Suivant",
  de: "Siguiente",
} satisfies TLocalizedString;

export const commonTranslations = {
  nextButton,
} as const;
