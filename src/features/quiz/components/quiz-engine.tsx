"use client";

import { QuestionRenderer } from "@/features/quiz/components/question-renderer";
import { QuizProgress } from "@/features/quiz/components/quiz-progress";
import type {
  TQuiz,
  TQuizQuestion,
  TQuizStaticStep,
  TQuizStep,
} from "@/features/quiz/types-and-schemas";

export default function QuizEngine() {
  return (
    <main className="max-w-xl mx-auto py-8 px-4">
      <QuizProgress />
      <QuestionRenderer />
    </main>
  );
}
