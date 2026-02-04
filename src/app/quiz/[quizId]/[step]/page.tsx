import { notFound, redirect } from "next/navigation";
import { QuestionRenderer } from "@/features/quiz/components/question-renderer";
import { getQuizConfig } from "@/features/quiz/services/get-quiz";
import { checkQuizStepPresent } from "@/features/quiz/utils/check-quiz-step-present";

export default async function StepPage({
  params,
}: {
  params: Promise<{ quizId: string; step: string }>;
}) {
  const { quizId, step } = await params;
  const config = await getQuizConfig(quizId);

  if (!config) return notFound();

  const { exists, stepData } = checkQuizStepPresent(config, step);

  if (!exists) {
    redirect(`/quiz/${quizId}/${config.questions[0].id}`);
  }

  return <QuestionRenderer step={stepData} />;
}
