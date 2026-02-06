import { QUIZ_RESULTS_CSV_FILENAME } from "@/features/quiz/constants";
import type { TQuizAnswer } from "@/features/quiz/types-and-schemas";

export function downloadAnswersCSV(answers: TQuizAnswer[], email: string) {
  const headers = ["order", "title", "type", "answer"];

  const rows = Object.values(answers)
    .sort((a, b) => a.order - b.order)
    .map((item) =>
      [
        item.order,
        item.title,
        item.type,
        Array.isArray(item.answer) ? item.answer.join(", ") : item.answer,
      ].join(","),
    );

  const emailRow = [answers.length + 1, "Email", "email", email].join(",");

  const csvContent = [headers.join(","), ...rows, emailRow].join("\n");

  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.setAttribute("href", url);
  link.setAttribute("download", QUIZ_RESULTS_CSV_FILENAME);
  link.click();

  URL.revokeObjectURL(url);
}
