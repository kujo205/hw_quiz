"use client";

import { QuestionRenderer } from "@/features/quiz/components/question-renderer";
import { QuizProgress } from "@/features/quiz/components/quiz-progress";

export default function QuizEngine() {
  return (
    <main className="max-w-xl h-dvh flex flex-col mx-auto py-8 px-4">
      <QuizProgress />
      <QuestionRenderer />
    </main>
  );
}
