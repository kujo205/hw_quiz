import { z } from "zod";

const languageCodes = ["en", "fr", "de", "es"] as const;

const LanguageSchema = z.enum(languageCodes);

const LocalizedStringSchema = z.record(LanguageSchema, z.string());

type TLanguage = z.infer<typeof LanguageSchema>;
type TLocalizedString = z.infer<typeof LocalizedStringSchema>;

export { languageCodes, LanguageSchema, LocalizedStringSchema };
export type { TLanguage, TLocalizedString };
