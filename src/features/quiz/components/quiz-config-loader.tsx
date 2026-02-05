"use client";

import { useEffect } from "react";
import { useQuizStore } from "@/features/quiz/store";
import type { TQuiz } from "@/features/quiz/types-and-schemas";

interface QuizConfigLoaderProps {
  config: TQuiz;
}

export function QuizConfigLoader({ config }: QuizConfigLoaderProps) {
  const setConfig = useQuizStore((state) => state.setQuizConfig);

  useEffect(() => {
    console.log("loading quiz config", config);

    setConfig(config);
  }, [config, setConfig]);

  return null;
}
