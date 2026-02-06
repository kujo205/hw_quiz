"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect } from "react";
import QuizEngine from "@/features/quiz/components/quiz-engine";
import { QuizSpinner } from "@/features/quiz/components/quiz-spinner";
import { useQuizStore } from "@/features/quiz/store";

export default function Page() {
  const params = useParams<{
    quizId: string;
    step: string;
  }>();

  const hydrated = useQuizStore((state) => state.hydrated);
  const setQuizConfig = useQuizStore((state) => state.setQuizData);
  const currentStepData = useQuizStore((state) => state.getCurrentStepData());
  const getRedirectStepIfWrongStep = useQuizStore(
    (state) => state.getRedirectStepIfWrongStep,
  );
  const router = useRouter();

  useEffect(() => {
    if (hydrated) {
      const redirectStep = getRedirectStepIfWrongStep(params.step);

      if (redirectStep) {
        router.push(`/quiz/${params.quizId}/${redirectStep}`);
      }
      setQuizConfig(params.quizId, params.step);
    }
  }, [hydrated, params.step, params.quizId, setQuizConfig]);

  if (!hydrated || !currentStepData) {
    return <QuizSpinner />;
  }

  return <QuizEngine />;
}
