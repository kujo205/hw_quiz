"use client";

import { useEffect, useRef } from "react";
import { useQuizStore } from "../store";
import type { TQuiz } from "../types-and-schemas";

export function StoreInitializer({
  quizId,
  config,
}: {
  quizId: string;
  config: TQuiz;
}) {
  const initialized = useRef(false);

  if (!initialized.current) {
    useQuizStore.getState().setActiveQuizId(quizId);
    useQuizStore.getState().setConfig(quizId, config);
    initialized.current = true;
  }

  // effect to update activeQuizId if quizId changes
  useEffect(() => {
    useQuizStore.getState().setActiveQuizId(quizId);
  }, [quizId]);

  return null;
}
