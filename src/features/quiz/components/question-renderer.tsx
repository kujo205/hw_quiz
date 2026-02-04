"use client";

import type { TQuizQuestion, TQuizStaticStep } from "../types-and-schemas";

interface Props {
  step: TQuizStaticStep | TQuizQuestion;
}

export function QuestionRenderer({ step }: Props) {
  switch (step.type) {
    case "single-select":
    case "bubble-select":
    case "multiple-select":
    case "loader":
    case "email":
    case "thank-you":
    default:
      return <p>{JSON.stringify(step)}</p>;
  }
}
