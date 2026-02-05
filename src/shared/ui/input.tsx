"use client";

import type { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: string;
}

export function Input({ error, className = "", ...props }: InputProps) {
  return (
    <div className="w-full space-y-2">
      <input
        {...props}
        className={`w-full h-16 px-6 rounded-2xl bg-white/10 text-white text-lg outline-none transition-all border-2 ${
          error
            ? "border-red-500 focus:border-red-500"
            : "border-transparent focus:border-pink-main"
        } ${className}`}
      />
      {error && (
        <p className="text-red-500 text-sm pl-4 animate-in fade-in slide-in-from-top-1">
          {error}
        </p>
      )}
    </div>
  );
}
