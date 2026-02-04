import { notFound, redirect } from "next/navigation";
import { QuestionRenderer } from "@/features/quiz/components/question-renderer";
import { QuizProgress } from "@/features/quiz/components/quiz-progress";
import { getQuizConfig } from "@/features/quiz/services/get-quiz";
import { checkQuizStepPresent } from "@/features/quiz/utils/check-quiz-step-present";

export const revalidate = 600; // revalidates the page every 10 minutes

export default async function ({
  params,
}: {
  params: Promise<{ quizId: string; step: string }>;
}) {
  const { quizId, step } = await params;

  const config = await getQuizConfig(quizId);

  if (!config) {
    return notFound();
  }

  const { stepData, exists } = checkQuizStepPresent(config, step);

  if (!exists) {
    const firstQuestion = config.questions[0];
    return redirect(`/quiz/${quizId}/${firstQuestion.id}`);
  }

  return (
    <main className="max-w-xl mx-auto py-8 px-4">
      <QuizProgress totalSteps={config.questions.length} />
      <QuestionRenderer quizId={quizId} stepId={step} stepData={stepData} />
    </main>
  );
}
