// "use client";
//
// import { useState } from "react";
// import { commonTranslations } from "@/features/quiz/common-translations";
// import { QuizTitleDescription } from "@/features/quiz/components/quiz-title-description";
// import { useQuizStore } from "@/features/quiz/store";
// import type { TLocalizedString } from "@/features/quiz/types-and-schemas";
// import { Button } from "@/shared/ui/button";
// import { Input } from "@/shared/ui/input";
//
// interface EmailStepProps {
//   questionId: string;
//   title: TLocalizedString;
//   placeholder: TLocalizedString;
//   errorText: TLocalizedString;
//   nextStepId: string;
//   handleSubmit: (questionId: string, val: any) => void;
// }
//
// export function EmailStep({
//   questionId,
//   title,
//   placeholder,
//   errorText,
//   nextStepId,
//   order,
//   handleSubmit,
// }: EmailStepProps) {
//   const t = useQuizStore((state) => state.t);
//   const [email, setEmail] = useState("");
//   const [error, setError] = useState<string | undefined>();
//
//   // Проста валідація згідно з ТЗ
//   const validateEmail = (val: string) => {
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     return emailRegex.test(val);
//   };
//
//   const onSubmit = () => {
//     if (!validateEmail(email)) {
//       setError(t(errorText));
//       return;
//     }
//
//     handleSubmit(questionId, {
//       answer: email,
//       order,
//       title: t(title),
//       type: "email",
//     });
//   };
//
//   const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const value = e.target.value;
//     setEmail(value);
//     if (error) setError(undefined); // Скидаємо помилку при зміні тексту
//   };
//
//   return (
//     <div className="flex flex-col flex-1 animate-in fade-in duration-500">
//       <div className="flex-1 space-y-10">
//         <QuizTitleDescription title={t(title)} />
//
//         <div className="space-y-6">
//           <Input
//             type="email"
//             value={email}
//             onChange={onInputChange}
//             placeholder={t(placeholder)}
//             error={error}
//           />
//
//           {/* Текст згоди з політикою  */}
//           <p className="text-white/60 text-center text-xs leading-relaxed px-4">
//             By continuing I agree with{" "}
//             <span className="text-pink-main underline cursor-pointer">
//               Privacy policy
//             </span>{" "}
//             and{" "}
//             <span className="text-pink-main underline cursor-pointer">
//               Terms of use
//             </span>
//             .
//           </p>
//         </div>
//       </div>
//
//       <div className="pt-8 pb-4">
//         <Button
//           onClick={onSubmit}
//           disabled={!email || !!error}
//           className={!email ? "opacity-50" : "opacity-100"}
//         >
//           {t(commonTranslations.nextButton)}
//         </Button>
//       </div>
//     </div>
//   );
// }
