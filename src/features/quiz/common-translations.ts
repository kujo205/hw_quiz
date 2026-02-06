import type { TLocalizedString } from "@/features/quiz/types-and-schemas/localization";

const nextButton = {
  en: "Next",
  es: "Siguiente",
  fr: "Suivant",
  de: "Siguiente",
} satisfies TLocalizedString;

const termsLink = "https://www.example.com/terms-of-use";
const privacyPolicy = "https://www.example.com/privacy-policy";

const agreeWithTerms = {
  en: `By continuing I agree with <a class="link" href="${privacyPolicy}">Privacy policy</a> and <a class="link" href="${termsLink}">Terms of use</a>`,
  es: `Al continuar, acepto la <a class="link" href="${privacyPolicy}">Política de privacidad</a> y los <a class="link" href="${termsLink}">Términos de uso</a>`,
  fr: `En continuant, j'accepte la <a class="link" href="${privacyPolicy}">Politique de confidentialité</a> et les <a class="link" href="${termsLink}">Conditions d'utilisation</a>`,
  de: `Indem ich fortfahre, akzeptiere ich die <a class="link" href="${privacyPolicy}">Datenschutzerklärung</a> und die <a class="link" href="${termsLink}">Nutzungsbedingungen</a>`,
} satisfies TLocalizedString;

export const commonTranslations = {
  nextButton,
  agreeWithTerms,
} as const;
