"use client";

import { constructRequest } from "next/dist/experimental/testing/server/utils";
import { useEffect } from "react";
import { useQuizStore } from "@/features/quiz/store";
import type { TQuizQuestion, TQuizStaticStep } from "../types-and-schemas";

interface Props {
  stepData: TQuizStaticStep | TQuizQuestion;
  quizId: string;
  stepId: string;
}

export function QuestionRenderer({ stepData, stepId, quizId }: Props) {
  const setQuizData = useQuizStore((state) => state.setQuizData);

  useEffect(() => {
    setQuizData(quizId, stepId);
  }, [quizId, stepId, setQuizData]);

  switch (stepData.type) {
    case "single-select":
    case "bubble-select":
    case "multiple-select":
    case "loader":
    case "email":
    case "thank-you":
    default:
      return null;
    // return <p>{JSON.stringify(stepData)}</p>;
  }
}
