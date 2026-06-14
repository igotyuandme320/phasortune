interface ResonanceKnobProps {
  frequency: number;
  min: number;
  max: number;
  resonanceFrequency: number;
  onChange: (value: number) => void;
}

export function ResonanceKnob({ frequency, min, max, resonanceFrequency, onChange }: ResonanceKnobProps) {
  const minLog = Math.log10(min);
  const maxLog = Math.log10(max);
  const percent = (Math.log10(frequency) - minLog) / (maxLog - minLog);
  const rotation = -135 + percent * 270;
  const sliderValue = Math.round(percent * 1000);

  return (
    <div className="rounded-lg border border-stone-200/10 bg-[#211f1b]/55 p-5 text-center">
      <div className="mx-auto grid h-52 w-52 place-items-center rounded-full border border-lab-cyan/25 bg-[radial-gradient(circle,rgba(217,119,87,0.12),rgba(35,32,28,0.84)_58%,rgba(25,23,19,0.96))] shadow-neon">
        <div className="relative h-40 w-40 rounded-full border border-stone-100/10 bg-[#171511]/75">
          <div
            className="absolute left-1/2 top-1/2 h-[3px] w-[72px] origin-left rounded-full bg-lab-yellow shadow-[0_8px_18px_rgba(214,167,93,0.28)]"
            style={{ transform: `rotate(${rotation}deg)` }}
          />
          <div className="absolute left-1/2 top-1/2 h-5 w-5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-stone-100 shadow-[0_8px_20px_rgba(0,0,0,0.35)]" />
          <div className="absolute inset-5 rounded-full border border-dashed border-stone-100/15" />
        </div>
      </div>
      <div className="mt-5">
        <div className="text-4xl font-black text-stone-50 neon-text">{frequency.toFixed(0)} Hz</div>
        <div className="mt-1 text-sm text-stone-400">目标 f₀ = {resonanceFrequency.toFixed(1)} Hz</div>
      </div>
      <input
        className="range-thumb mt-5 h-2 w-full cursor-pointer appearance-none rounded-full outline-none"
        type="range"
        min={0}
        max={1000}
        step={1}
        value={sliderValue}
        onChange={(event) => {
          const nextPercent = Number(event.currentTarget.value) / 1000;
          const nextFrequency = 10 ** (minLog + nextPercent * (maxLog - minLog));
          onChange(Math.round(nextFrequency));
        }}
        style={{
          background: `linear-gradient(90deg, #6FA58A 0%, #D97757 ${percent * 100}%, rgba(87,83,74,0.75) ${percent * 100}%, rgba(87,83,74,0.75) 100%)`,
        }}
      />
    </div>
  );
}
