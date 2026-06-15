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
  cyan: "#D97757",
  green: "#6FA58A",
  purple: "#8B78C2",
  yellow: "#D6A75D",
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
    <label className="block rounded-lg border border-stone-200/10 bg-[#211f1b]/55 p-3">
      <span className="mb-2 flex items-start justify-between gap-3">
        <span>
          <span className="block text-sm font-semibold text-stone-100">{label}</span>
          {subtitle ? <span className="text-xs text-stone-400">{subtitle}</span> : null}
        </span>
        <span className="rounded-md border border-stone-100/10 bg-stone-100/5 px-2 py-1 text-sm font-semibold text-stone-50">
          {formatValue ? formatValue(value) : value}
          {unit ? <span className="ml-1 text-xs text-stone-400"> {unit}</span> : null}
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
          background: `linear-gradient(90deg, ${color} 0%, ${color} ${percent}%, rgba(87,83,74,0.72) ${percent}%, rgba(87,83,74,0.72) 100%)`,
        }}
      />
    </label>
  );
}
