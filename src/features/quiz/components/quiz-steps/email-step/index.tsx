"use client";

import { useState } from "react";
import { z } from "zod";
import { commonTranslations } from "@/features/quiz/common-translations";
import type { EmailStepDataSchema } from "@/features/quiz/components/quiz-steps/email-step/schema";
import { QuizTitleDescription } from "@/features/quiz/components/quiz-title-description";
import { useQuizStore } from "@/features/quiz/store";
import { Button } from "@/shared/ui/button";
import { Input } from "@/shared/ui/input";

const emailSchema = z.string().email();

interface EmailStepProps {
  questionId: string;
  dataModel: z.infer<typeof EmailStepDataSchema>;
  handleNext: (email: string) => void;
}

export function EmailStep({
  dataModel,
  handleNext,
}: EmailStepProps) {
  const t = useQuizStore((state) => state.t);
  const setEmail = useQuizStore((state) => state.setEmail);
  const email = useQuizStore((state) => state.getEmail());

  // const [email, setEmail] = useState("");
  const [isDirty, setIsDirty] = useState(false);

  const validation = emailSchema.safeParse(email);
  const isValid = validation.success;

  const showError = isDirty && email.length > 0 && !isValid;

  const onNext = () => {
    setIsDirty(true);

    if (isValid) {
      handleNext(email);
    }
  };

  return (
    <div className="flex flex-col flex-1 duration-500">
      <div className="flex-1 mt-20 animate-fade-in-up space-y-10">
        <QuizTitleDescription
          title={t(dataModel.title)}
          description={t(dataModel.description)}
        />

        <div className="space-y-6">
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onBlur={() => setIsDirty(true)}
            placeholder={t(dataModel.placeholder)}
            error={showError ? t(dataModel.errorText) : undefined}
          />

          <p
            // biome-ignore lint/security/noDangerouslySetInnerHtml: it's fine, we control the content
            dangerouslySetInnerHTML={{
              __html: t(commonTranslations.agreeWithTerms),
            }}
            className="text-white/60 text-center text-sm px-6"
          ></p>
        </div>
      </div>

      <div className="pt-8 pb-4">
        <Button
          onClick={onNext}
          disabled={!email || (isDirty && !isValid)}
          className={
            !email || (isDirty && !isValid) ? "opacity-50" : "opacity-100"
          }
        >
          {t(commonTranslations.nextButton)}
        </Button>
      </div>
    </div>
  );
}
