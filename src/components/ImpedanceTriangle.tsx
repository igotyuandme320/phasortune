interface ImpedanceTriangleProps {
  resistance: number;
  reactance: number;
  impedance: number;
  phase: number;
}

export function ImpedanceTriangle({ resistance, reactance, impedance, phase }: ImpedanceTriangleProps) {
  const maxValue = Math.max(resistance, Math.abs(reactance), 1);
  const base = Math.max(58, (resistance / maxValue) * 190);
  const height = Math.max(reactance === 0 ? 0 : 42, (Math.abs(reactance) / maxValue) * 140);
  const x0 = 58;
  const y0 = 128;
  const x1 = x0 + base;
  const y1 = reactance >= 0 ? y0 - height : y0 + height;
  const phaseDegrees = (phase * 180) / Math.PI;

  return (
    <div className="rounded-lg border border-stone-200/10 bg-[#211f1b]/55 p-4">
      <div className="mb-3 flex items-center justify-between gap-3">
        <div>
          <h3 className="font-semibold text-stone-50">阻抗三角形</h3>
          <p className="text-xs text-stone-400">Impedance triangle</p>
        </div>
        <span className="rounded-md border border-lab-yellow/20 bg-lab-yellow/10 px-2 py-1 text-xs text-stone-100">
          |Z| = {impedance.toFixed(2)} Ω
        </span>
      </div>
      <svg viewBox="0 0 320 240" className="h-[230px] w-full">
        <path d="M35 128 H285 M58 28 V218" stroke="rgba(246,235,220,0.10)" strokeWidth="1" />
        <path d={`M ${x0} ${y0} H ${x1} V ${y1} Z`} fill="rgba(217,119,87,0.08)" stroke="rgba(217,119,87,0.16)" />
        <line x1={x0} y1={y0} x2={x1} y2={y0} stroke="#D97757" strokeWidth="4.5" strokeLinecap="round" />
        <line x1={x1} y1={y0} x2={x1} y2={y1} stroke="#8B78C2" strokeWidth="4.5" strokeLinecap="round" />
        <line x1={x0} y1={y0} x2={x1} y2={y1} stroke="#D6A75D" strokeWidth="4.5" strokeLinecap="round" />
        <text x={(x0 + x1) / 2 - 14} y={y0 + 24} fill="#F0B09A" fontSize="13" fontWeight="700">
          R
        </text>
        <text x={x1 + 8} y={(y0 + y1) / 2 + 4} fill="#D8CEF6" fontSize="13" fontWeight="700">
          XL - XC
        </text>
        <text x={(x0 + x1) / 2 - 8} y={(y0 + y1) / 2 - 10} fill="#E2BF7B" fontSize="13" fontWeight="700">
          |Z|
        </text>
        <path
          d={`M ${x0 + 28} ${y0} A 28 28 0 0 ${reactance >= 0 ? 0 : 1} ${x0 + 28 * Math.cos(Math.abs(phase))} ${
            y0 - Math.sign(reactance || 1) * 28 * Math.sin(Math.abs(phase))
          }`}
          fill="none"
          stroke="#6FA58A"
          strokeWidth="3"
          strokeLinecap="round"
        />
        <text x={x0 + 34} y={y0 - 8} fill="#BFD9C9" fontSize="12">
          φ={phaseDegrees.toFixed(1)}°
        </text>
      </svg>
    </div>
  );
}
