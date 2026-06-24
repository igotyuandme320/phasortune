import { useState } from "react";

interface QuizCardProps {
  question: string;
  answer: string;
}

export function QuizCard({ question, answer }: QuizCardProps) {
  const [revealed, setRevealed] = useState(false);

  return (
    <button
      type="button"
      aria-expanded={revealed}
      onClick={() => setRevealed((value) => !value)}
      className="group surface-panel block cursor-pointer p-3 text-left transition hover:border-lab-cyan/25"
    >
      <div className="flex items-start justify-between gap-2">
        <h3 className="font-semibold text-stone-50">{question}</h3>
        <span
          className={`shrink-0 rounded border border-stone-100/10 px-1.5 py-0.5 text-[10px] text-stone-500 transition group-hover:opacity-0 ${
            revealed ? "opacity-0" : "opacity-100"
          }`}
        >
          查看答案
        </span>
      </div>
      <p
        className={`mt-2 text-sm leading-6 text-stone-300 transition-opacity duration-300 ${
          revealed ? "opacity-100" : "opacity-0 group-hover:opacity-100"
        }`}
      >
        {answer}
      </p>
    </button>
  );
}
