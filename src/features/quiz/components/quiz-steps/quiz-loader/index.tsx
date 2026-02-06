"use client";

import { useEffect, useState } from "react";
import type { z } from "zod";
import { DEFAULT_LOADER_DURATION_MS } from "@/features/quiz/constants";
import { useQuizStore } from "@/features/quiz/store";
import type { QuizLoaderDataSchema } from "./schema";

interface LoaderProps {
  dataModel: z.infer<typeof QuizLoaderDataSchema>;
  onComplete: (nextStepId: string) => void;
  nextStepId: string;
}

export function QuizLoader({ dataModel, onComplete, nextStepId }: LoaderProps) {
  const [progress, setProgress] = useState(0);
  const t = useQuizStore((state) => state.t);

  useEffect(() => {
    const startTime = Date.now();

    const timer = setInterval(() => {
      const timePassed = Date.now() - startTime;
      const currentProgress = Math.min(
        (timePassed / DEFAULT_LOADER_DURATION_MS) * 100,
        100,
      );

      setProgress(currentProgress);

      if (currentProgress >= 100) {
        clearInterval(timer);
        setTimeout(() => onComplete(nextStepId), 200);
      }
    }, 16); // ~60 FPS

    return () => clearInterval(timer);
  }, [onComplete, nextStepId]);

  const radius = 120;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <div className="flex animate-fade-in-up flex-col items-center justify-center flex-1 space-y-12 animate-in fade-in duration-700">
      <div className="relative flex items-center justify-center">
        <svg className="transform -rotate-90 w-64 h-64">
          <title>progress</title>
          <circle
            cx="128"
            cy="128"
            r={radius}
            stroke="currentColor"
            strokeWidth="8"
            fill="transparent"
            className="bg-white/90"
          />
          <circle
            cx="128"
            cy="128"
            r={radius}
            stroke="#E91E63" // Pink-main
            strokeWidth="10"
            fill="transparent"
            strokeDasharray={circumference}
            style={{
              strokeDashoffset,
              transition: "stroke-dashoffset 0.1s linear",
            }}
            strokeLinecap="round"
          />
        </svg>

        <span className="absolute text-5xl font-black text-white">
          {Math.round(progress)}%
        </span>
      </div>

      <p className="text-white text-xl font-bold text-center max-w-[250px]">
        {t(dataModel.title)}
      </p>
    </div>
  );
}
