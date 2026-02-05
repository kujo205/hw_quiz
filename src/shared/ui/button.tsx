import type * as React from "react";

interface ButtonProps extends React.ComponentProps<"button"> {
  variant?: "default" | "icon" | "quiz-item" | "quiz-emoji";
  isSelected?: boolean;
}

export function Button({
  className = "",
  variant = "default",
  isSelected = false,
  children,
  ...props
}: ButtonProps) {
  const baseStyles =
    "inline-flex items-center justify-center text-white font-semibold transition-all disabled:pointer-events-none disabled:opacity-50 outline-none cursor-pointer";

  const variantStyles = {
    default:
      "h-14 rounded-full bg-pink-main hover:opacity-90 active:scale-[0.98] px-8 text-lg w-full",

    icon: "size-10 rounded-lg bg-pink-main/10 text-pink-main hover:bg-pink-main/20 active:scale-95",

    "quiz-item": `w-full rounded-2xl px-6 py-4 items-start border-2 transition-all duration-300 justify-start ${
      isSelected
        ? "bg-pink-main/20 border-pink-main"
        : "bg-pink-dimmed border-transparent hover:bg-white/15"
    }`,

    "quiz-emoji": `flex flex-col aspect-[3/4] p-4 rounded-2xl border-2 transition-all duration-300 ${
      isSelected
        ? "bg-pink-main/20 border-pink-main scale-105 shadow-[0_0_15px_rgba(233,73,152,0.3)]"
        : "bg-pink-dimmed border-transparent hover:bg-white/15 active:scale-95"
    }`,
  };

  return (
    <button
      type="button"
      className={`${baseStyles} ${variantStyles[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
