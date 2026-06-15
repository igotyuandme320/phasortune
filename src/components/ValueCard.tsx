import type { ReactNode } from "react";

interface ValueCardProps {
  label: string;
  subtitle?: string;
  value: ReactNode;
  unit?: string;
  accent?: "cyan" | "green" | "purple" | "yellow";
}

const accentClass = {
  cyan: "text-lab-cyan border-lab-cyan/20 bg-lab-cyan/[0.055]",
  green: "text-lab-green border-lab-green/20 bg-lab-green/[0.055]",
  purple: "text-lab-purple border-lab-purple/20 bg-lab-purple/[0.055]",
  yellow: "text-lab-yellow border-lab-yellow/20 bg-lab-yellow/[0.055]",
};

export function ValueCard({ label, subtitle, value, unit, accent = "cyan" }: ValueCardProps) {
  return (
    <div className={`relative overflow-hidden rounded-lg border p-4 shadow-[inset_0_1px_0_rgba(255,252,247,0.055),0_10px_26px_rgba(0,0,0,0.14)] ${accentClass[accent]}`}>
      <div className="absolute inset-x-0 top-0 h-px bg-current opacity-30" />
      <div className="text-xs font-medium uppercase tracking-[0.12em] text-stone-400">{subtitle}</div>
      <div className="mt-1 text-sm font-semibold text-stone-100">{label}</div>
      <div className="mt-3 flex items-baseline gap-1">
        <span className="text-2xl font-semibold tracking-normal text-stone-50">{value}</span>
        {unit ? <span className="text-sm text-stone-400">{unit}</span> : null}
      </div>
    </div>
  );
}
