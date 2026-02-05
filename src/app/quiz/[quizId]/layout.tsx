import { notFound } from "next/navigation";
import type { ReactNode } from "react";
import { QuizConfigLoader } from "@/features/quiz/components/quiz-config-loader";
import { getQuizConfig } from "@/features/quiz/services/get-quiz";

interface QuizLayoutProps {
  children: ReactNode;
  params: Promise<{ quizId: string }>;
}

export const revalidate = 600; // Revalidate every 10 minutes

export default async function QuizLayout({
  children,
  params,
}: QuizLayoutProps) {
  const { quizId } = await params;

  const config = await getQuizConfig(quizId);

  if (!config) {
    return notFound();
  }

  return (
    <>
      <QuizConfigLoader config={config} />
      {children}
    </>
  );
}
