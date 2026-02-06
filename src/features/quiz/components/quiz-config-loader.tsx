"use client";

import { useEffect } from "react";
import { useQuizStore } from "@/features/quiz/store";
import type { TQuiz } from "@/features/quiz/types-and-schemas";

interface QuizConfigLoaderProps {
  config: TQuiz;
}

// needed to load the quiz config in layout, so it's available to all pages
export function QuizConfigLoader({ config }: QuizConfigLoaderProps) {
  const setConfig = useQuizStore((state) => state.setQuizConfig);

  useEffect(() => {
    setConfig(config);
  }, [config, setConfig]);

  return null;
}
