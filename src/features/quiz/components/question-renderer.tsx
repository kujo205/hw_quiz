"use client";

import type { TQuizQuestion, TQuizStaticStep } from "../types-and-schemas";

interface Props {
  stepData: TQuizStaticStep | TQuizQuestion;
  quizId?: string;
  stepId?: string;
}

export function QuestionRenderer({ stepData }: Props) {
  console.log("Rendering step data:", stepData);

  switch (stepData.type) {
    case "single-select":
    case "bubble-select":
    case "multiple-select":
    case "loader":
    case "email":
    case "thank-you":
    default:
      return <p>{JSON.stringify(stepData)}</p>;
  }
}
