import { notFound } from "next/navigation";
import { StoreInitializer } from "@/features/quiz/components/store-initalizer";
import { getQuizConfig } from "@/features/quiz/services/get-quiz";

export default async function QuizLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ quizId: string }>;
}) {
  const { quizId } = await params;
  const config = await getQuizConfig(quizId);

  if (!config) notFound();

  return (
    <section>
      <StoreInitializer quizId={quizId} config={config} />
      {children}
    </section>
  );
}
