"use client";

interface QuizTitleDescriptionProps {
  title: string;
  description?: string;
}

export function QuizTitleDescription(props: QuizTitleDescriptionProps) {
  return (
    <div className="text-center space-y-4 my-4">
      <h1 className="text-white font-bold text-xl md:text-2xl">
        {props.title}
      </h1>
      <p className="text-grey-200">{props.description}</p>
    </div>
  );
}
