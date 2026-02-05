"use client";

import { useQuizStore } from "@/features/quiz/store";
import type { TLocalizedString } from "@/features/quiz/types-and-schemas";

interface QuizTitleDescriptionProps {
  title: string;
  description?: string;
}

export function QuizTitleDescription(props: QuizTitleDescriptionProps) {
  const t = useQuizStore((state) => state.t);

  return (
    <div className="text-center space-y-4 my-4">
      <h1 className="text-white font-bold text-2xl">{props.title}</h1>
      <p className="text-grey-200">{props.description}</p>
    </div>
  );
}
