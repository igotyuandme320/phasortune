interface ResonanceKnobProps {
  frequency: number;
  min: number;
  max: number;
  resonanceFrequency: number;
  onChange: (value: number) => void;
}

export function ResonanceKnob({ frequency, min, max, resonanceFrequency, onChange }: ResonanceKnobProps) {
  const percent = (frequency - min) / (max - min);
  const rotation = -135 + percent * 270;

  return (
    <div className="rounded-lg border border-cyan-300/20 bg-slate-950/40 p-5 text-center">
      <div className="mx-auto grid h-52 w-52 place-items-center rounded-full border border-cyan-300/25 bg-[radial-gradient(circle,rgba(0,212,255,0.12),rgba(15,23,42,0.8)_58%,rgba(5,8,22,0.95))] shadow-neon">
        <div className="relative h-40 w-40 rounded-full border border-white/10 bg-slate-950/70">
          <div
            className="absolute left-1/2 top-1/2 h-[3px] w-[66px] origin-left rounded-full bg-lab-yellow shadow-[0_0_18px_rgba(250,204,21,0.72)]"
            style={{ transform: `rotate(${rotation}deg)` }}
          />
          <div className="absolute left-1/2 top-1/2 h-5 w-5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white shadow-[0_0_18px_rgba(255,255,255,0.45)]" />
          <div className="absolute inset-5 rounded-full border border-dashed border-cyan-300/20" />
        </div>
      </div>
      <div className="mt-5">
        <div className="text-4xl font-black text-white neon-text">{frequency.toFixed(0)} Hz</div>
        <div className="mt-1 text-sm text-slate-400">目标 f₀ = {resonanceFrequency.toFixed(1)} Hz</div>
      </div>
      <input
        className="range-thumb mt-5 h-2 w-full cursor-pointer appearance-none rounded-full outline-none"
        type="range"
        min={min}
        max={max}
        step={1}
        value={frequency}
        onChange={(event) => onChange(Number(event.currentTarget.value))}
        style={{
          background: `linear-gradient(90deg, #22C55E 0%, #00D4FF ${percent * 100}%, rgba(71,85,105,0.75) ${percent * 100}%, rgba(71,85,105,0.75) 100%)`,
        }}
      />
    </div>
  );
}
