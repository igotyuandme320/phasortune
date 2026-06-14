import type { ReactNode } from "react";

interface ValueCardProps {
  label: string;
  subtitle?: string;
  value: ReactNode;
  unit?: string;
  accent?: "cyan" | "green" | "purple" | "yellow";
}

const accentClass = {
  cyan: "text-lab-cyan border-cyan-300/25 bg-cyan-300/10",
  green: "text-lab-green border-green-300/25 bg-green-300/10",
  purple: "text-violet-200 border-violet-300/25 bg-violet-300/10",
  yellow: "text-lab-yellow border-yellow-300/25 bg-yellow-300/10",
};

export function ValueCard({ label, subtitle, value, unit, accent = "cyan" }: ValueCardProps) {
  return (
    <div className={`rounded-lg border p-3 ${accentClass[accent]}`}>
      <div className="text-xs font-medium uppercase tracking-[0.14em] text-slate-400">{subtitle}</div>
      <div className="text-sm font-semibold text-slate-100">{label}</div>
      <div className="mt-2 flex items-baseline gap-1">
        <span className="text-2xl font-bold text-white">{value}</span>
        {unit ? <span className="text-sm text-slate-400">{unit}</span> : null}
      </div>
    </div>
  );
}
