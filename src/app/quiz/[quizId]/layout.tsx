export const revalidate = 3600; // ISR: Оновлювати кеш кожну годину

export async function generateStaticParams() {
  // here we can fetch a list of all valid quiz Ids from some api

  return [{ quizId: "test-quiz" }];
}

export default async function QuizLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ quizId: string }>;
}) {
  const { quizId } = await params;

  // Fetch конфігу з вашого API або файлової системи
  const config = await getQuizConfig(quizId);

  return <div>{children}</div>;
  // return <QuizProvider initialConfig={config}>{children}</QuizProvider>;
}

async function getQuizConfig(quizId: string) {
  return 1;
}
