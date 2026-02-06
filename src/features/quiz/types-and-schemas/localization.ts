import { z } from "zod";

const languageCodes = ["en", "fr", "de", "es"] as const;

const LanguageSchema = z.enum(languageCodes);

const LocalizedStringSchema = z.record(LanguageSchema, z.string());

export function isLanguage(value: string): value is TLanguage {
  return languageCodes.includes(value as TLanguage);
}

type TLanguage = z.infer<typeof LanguageSchema>;
type TLocalizedString = z.infer<typeof LocalizedStringSchema>;

export { languageCodes, LanguageSchema, LocalizedStringSchema };
export type { TLanguage, TLocalizedString };
