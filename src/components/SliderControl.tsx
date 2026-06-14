interface SliderControlProps {
  label: string;
  subtitle?: string;
  value: number;
  min: number;
  max: number;
  step: number;
  unit?: string;
  accent?: "cyan" | "green" | "purple" | "yellow";
  onChange: (value: number) => void;
  formatValue?: (value: number) => string;
}

const accentMap = {
  cyan: "#00D4FF",
  green: "#22C55E",
  purple: "#7C3AED",
  yellow: "#FACC15",
};

export function SliderControl({
  label,
  subtitle,
  value,
  min,
  max,
  step,
  unit,
  accent = "cyan",
  onChange,
  formatValue,
}: SliderControlProps) {
  const percent = ((value - min) / (max - min)) * 100;
  const color = accentMap[accent];

  return (
    <label className="block rounded-lg border border-slate-700/70 bg-slate-950/35 p-3">
      <span className="mb-2 flex items-start justify-between gap-3">
        <span>
          <span className="block text-sm font-semibold text-slate-100">{label}</span>
          {subtitle ? <span className="text-xs text-slate-400">{subtitle}</span> : null}
        </span>
        <span className="rounded-md border border-white/10 bg-white/5 px-2 py-1 text-sm font-semibold text-white">
          {formatValue ? formatValue(value) : value}
          {unit ? <span className="ml-1 text-xs text-slate-400">{unit}</span> : null}
        </span>
      </span>
      <input
        className="range-thumb h-2 w-full cursor-pointer appearance-none rounded-full outline-none"
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(event) => onChange(Number(event.currentTarget.value))}
        style={{
          background: `linear-gradient(90deg, ${color} 0%, ${color} ${percent}%, rgba(71,85,105,0.72) ${percent}%, rgba(71,85,105,0.72) 100%)`,
        }}
      />
    </label>
  );
}
