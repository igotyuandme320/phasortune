interface ImpedanceTriangleProps {
  resistance: number;
  reactance: number;
  impedance: number;
  phase: number;
}

export function ImpedanceTriangle({ resistance, reactance, impedance, phase }: ImpedanceTriangleProps) {
  // 用单一缩放系数同时缩放两条直角边，保证 height/base = |X|/R = tan|φ|，
  // 角度始终等于真实阻抗角（不会因为某条边触顶/触底而“卡住”）。
  const absReactance = Math.abs(reactance);
  const baseBudget = 196;
  const heightBudget = 92;
  const scale = Math.min(baseBudget / Math.max(resistance, 1e-3), heightBudget / Math.max(absReactance, 1e-3));
  const base = resistance * scale;
  const height = absReactance * scale;
  const x0 = 56;
  const y0 = 126;
  const x1 = x0 + base;
  const y1 = reactance >= 0 ? y0 - height : y0 + height;
  const arcR = Math.max(10, Math.min(28, Math.min(base, height) * 0.6));
  const phaseDegrees = (phase * 180) / Math.PI;

  return (
    <div className="chart-surface p-4">
      <div className="mb-3 flex items-center justify-between gap-3">
        <div>
          <h3 className="font-semibold text-stone-50">阻抗三角形</h3>
          <p className="text-xs text-stone-400">R 与 XL - XC 的几何关系</p>
        </div>
        <span className="rounded-md border border-lab-yellow/20 bg-lab-yellow/[0.075] px-2.5 py-1 text-xs text-stone-100">
          |Z| = {impedance.toFixed(2)} Ω
        </span>
      </div>
      <svg viewBox="0 0 340 252" className="h-[240px] w-full">
        <path d="M28 126 H300 M56 24 V228" stroke="rgba(246,235,220,0.10)" strokeWidth="1" />
        <path d={`M ${x0} ${y0} H ${x1} V ${y1} Z`} fill="rgba(217,119,87,0.08)" stroke="rgba(217,119,87,0.16)" />
        <line x1={x0} y1={y0} x2={x1} y2={y0} stroke="#E37A5F" strokeWidth="4" strokeLinecap="round" />
        <line x1={x1} y1={y0} x2={x1} y2={y1} stroke="#9A8CDC" strokeWidth="4" strokeLinecap="round" />
        <line x1={x0} y1={y0} x2={x1} y2={y1} stroke="#D8B36C" strokeWidth="4" strokeLinecap="round" />
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
          d={`M ${x0 + arcR} ${y0} A ${arcR} ${arcR} 0 0 ${reactance >= 0 ? 0 : 1} ${x0 + arcR * Math.cos(Math.abs(phase))} ${
            y0 - Math.sign(reactance || 1) * arcR * Math.sin(Math.abs(phase))
          }`}
          fill="none"
          stroke="#78B99A"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
        <text x={x0 + arcR + 6} y={reactance >= 0 ? y0 - 8 : y0 + 16} fill="#BFD9C9" fontSize="12">
          φ={phaseDegrees.toFixed(1)}°
        </text>
      </svg>
    </div>
  );
}
