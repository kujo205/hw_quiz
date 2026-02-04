import type * as React from "react";

interface ButtonProps extends React.ComponentProps<"button"> {
  variant?: "default" | "icon";
}

export function Button({
  className = "",
  variant = "default",
  children,
  ...props
}: ButtonProps) {
  const baseStyles =
    "inline-flex items-center justify-center font-semibold transition-all disabled:pointer-events-none disabled:opacity-50 outline-none cursor-pointer";

  const variantStyles = {
    default:
      "h-14 rounded-full bg-pink-main text-white hover:opacity-90 active:scale-[0.98] px-8 text-lg w-full",
    icon: "size-10 rounded-lg bg-pink-main/10 text-pink-main hover:bg-pink-main/20 active:scale-95",
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
