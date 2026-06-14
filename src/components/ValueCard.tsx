import type { ReactNode } from "react";

interface ValueCardProps {
  label: string;
  subtitle?: string;
  value: ReactNode;
  unit?: string;
  accent?: "cyan" | "green" | "purple" | "yellow";
}

const accentClass = {
  cyan: "text-lab-cyan border-lab-cyan/25 bg-lab-cyan/10",
  green: "text-lab-green border-lab-green/25 bg-lab-green/10",
  purple: "text-lab-purple border-lab-purple/25 bg-lab-purple/10",
  yellow: "text-lab-yellow border-lab-yellow/25 bg-lab-yellow/10",
};

export function ValueCard({ label, subtitle, value, unit, accent = "cyan" }: ValueCardProps) {
  return (
    <div className={`rounded-lg border p-3 ${accentClass[accent]}`}>
      <div className="text-xs font-medium uppercase tracking-[0.14em] text-stone-400">{subtitle}</div>
      <div className="text-sm font-semibold text-stone-100">{label}</div>
      <div className="mt-2 flex items-baseline gap-1">
        <span className="text-2xl font-bold text-stone-50">{value}</span>
        {unit ? <span className="text-sm text-stone-400">{unit}</span> : null}
      </div>
    </div>
  );
}
