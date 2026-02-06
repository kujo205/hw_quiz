"use client";

import { CheckCircle2, Download } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useQuizStore } from "@/features/quiz/store";
import type { TLocalizedString } from "@/features/quiz/types-and-schemas";
import { downloadAnswersCSV } from "@/features/quiz/utils/download-csv";
import { Button } from "@/shared/ui/button";

interface ThankYouStepProps {
  title: TLocalizedString;
  description: TLocalizedString;
  downloadButtonText: TLocalizedString;
  retakeButtonText: TLocalizedString;
}

export function ThankYouStep({
  title,
  description,
  downloadButtonText,
  retakeButtonText,
}: ThankYouStepProps) {
  const router = useRouter();
  const t = useQuizStore((state) => state.t);

  const getAnswers = useQuizStore((state) => state.getCurrentQuizAnswers);
  const email = useQuizStore((state) => state.getEmail());
  const resetQuiz = useQuizStore((state) => state.resetQuiz);
  const quizId = useQuizStore((state) => state.activeQuizId);

  const handleRetake = () => {
    resetQuiz();
    router.push(`/quiz/${quizId}/preferred-language`);
  };

  return (
    <div className="flex flex-col items-center justify-between flex-1 py-12 animate-in fade-in zoom-in duration-700">
      <div className="flex flex-col items-center space-y-16 mt-10">
        <div className="space-y-2 text-center">
          <h1 className="text-4xl font-niconne italic text-white ">
            {t(title)}
          </h1>

          <p className="text-white text-lg font-bold">{t(description)}</p>
        </div>

        <Image alt="Check" width={140} height={140} src="/check.png" />
      </div>

      <div className="w-full space-y-4 px-4">
        <button
          onClick={() => downloadAnswersCSV(Object.values(getAnswers()), email)}
          className="flex items-center justify-center gap-3 w-full text-white font-bold py-4 hover:opacity-80 transition-opacity"
        >
          <Download size={24} />
          <span>{t(downloadButtonText)}</span>
        </button>

        <Button onClick={handleRetake}>{t(retakeButtonText)}</Button>
      </div>
    </div>
  );
}
