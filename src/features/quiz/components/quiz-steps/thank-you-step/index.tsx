"use client";

import { Download } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import type { z } from "zod";
import type { ThankUStepDataSchema } from "@/features/quiz/components/quiz-steps/thank-you-step/schema";
import { useQuizStore } from "@/features/quiz/store";
import { downloadAnswersCSV } from "@/features/quiz/utils/download-csv";
import { Button } from "@/shared/ui/button";

interface ThankYouStepProps {
  dataModel: z.infer<typeof ThankUStepDataSchema>;
}

export function ThankYouStep({ dataModel }: ThankYouStepProps) {
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
      <div className="flex animate-fade-in-up flex-col items-center space-y-16 mt-10">
        <div className="space-y-2 text-center">
          <h1 className="text-4xl font-niconne italic text-white ">
            {t(dataModel.title)}
          </h1>

          <p className="text-white text-lg font-bold">
            {t(dataModel.description)}
          </p>
        </div>

        <Image alt="Check" width={140} height={140} src="/check.png" />
      </div>

      <div className="w-full space-y-4 px-4">
        <button
          onClick={() => downloadAnswersCSV(Object.values(getAnswers()), email)}
          className="flex items-center justify-center gap-3 w-full text-white font-bold py-4 hover:opacity-80 transition-opacity"
        >
          <Download size={24} />
          <span>{t(dataModel.downloadButtonText)}</span>
        </button>

        <Button onClick={handleRetake}>{t(dataModel.retakeButtonText)}</Button>
      </div>
    </div>
  );
}
