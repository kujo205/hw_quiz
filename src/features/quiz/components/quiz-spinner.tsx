"use client";

export const QuizSpinner = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-pink-dimmed">
      <div className="relative w-12 h-12">
        {/* external ring*/}
        <div className="absolute inset-0 border-4 border-white/10 rounded-full"></div>

        <div className="absolute inset-0 border-4 border-transparent border-t-pink-main rounded-full animate-spin"></div>
      </div>
    </div>
  );
};
