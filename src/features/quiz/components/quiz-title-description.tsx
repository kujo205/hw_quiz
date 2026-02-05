import { useQuizStore } from "@/features/quiz/store";
import type { TLocalizedString } from "@/features/quiz/types-and-schemas";

interface QuizTitleDescriptionProps {
  title: TLocalizedString;
  description: TLocalizedString;
}

export function QuizTitleDescription(props: QuizTitleDescriptionProps) {
  const t = useQuizStore((state) => state.t);

  return (
    <div className="text-center space-y-4">
      <h1 className="text-white">{t(props.title)}</h1>
      <p className="text-grey-40">{t(props.description)}</p>
    </div>
  );
}
