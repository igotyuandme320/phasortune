interface PhasorDiagramProps {
  voltageAmplitude: number;
  currentAmplitude: number;
  phase: number;
}

function point(cx: number, cy: number, length: number, angle: number) {
  return {
    x: cx + length * Math.cos(angle),
    y: cy - length * Math.sin(angle),
  };
}

export function PhasorDiagram({ voltageAmplitude, currentAmplitude, phase }: PhasorDiagramProps) {
  const cx = 150;
  const cy = 128;
  const voltageLength = 82;
  const currentLength = Math.max(34, Math.min(76, currentAmplitude * 220));
  const voltageEnd = point(cx, cy, voltageLength, 0);
  const currentAngle = -phase;
  const currentEnd = point(cx, cy, currentLength, currentAngle);
  const arcStart = point(cx, cy, 38, currentAngle);
  const arcEnd = point(cx, cy, 38, 0);
  const largeArcFlag = Math.abs(phase) > Math.PI ? 1 : 0;
  const sweepFlag = phase >= 0 ? 0 : 1;
  const phaseDegrees = (phase * 180) / Math.PI;

  return (
    <div className="rounded-lg border border-slate-700/70 bg-slate-950/35 p-4">
      <div className="mb-3 flex items-center justify-between gap-3">
        <div>
          <h3 className="font-semibold text-white">相量图</h3>
          <p className="text-xs text-slate-400">Phasor diagram</p>
        </div>
        <span className="rounded-md border border-cyan-300/20 bg-cyan-300/10 px-2 py-1 text-xs text-cyan-100">
          φ = {phaseDegrees.toFixed(1)}°
        </span>
      </div>
      <svg viewBox="0 0 300 260" className="h-[260px] w-full">
        <defs>
          <marker id="phasor-arrow-voltage" markerHeight="8" markerWidth="8" orient="auto" refX="6" refY="3">
            <path d="M0,0 L0,6 L7,3 z" fill="#00D4FF" />
          </marker>
          <marker id="phasor-arrow-current" markerHeight="8" markerWidth="8" orient="auto" refX="6" refY="3">
            <path d="M0,0 L0,6 L7,3 z" fill="#22C55E" />
          </marker>
        </defs>
        <circle cx={cx} cy={cy} r="96" fill="rgba(15,23,42,0.42)" stroke="rgba(148,163,184,0.18)" />
        <path d={`M${cx - 110} ${cy} H${cx + 110} M${cx} ${cy + 110} V${cy - 110}`} stroke="#334155" strokeWidth="1" />
        <circle cx={cx} cy={cy} r="4" fill="#E5E7EB" />
        <line
          x1={cx}
          y1={cy}
          x2={voltageEnd.x}
          y2={voltageEnd.y}
          stroke="#00D4FF"
          strokeWidth="5"
          strokeLinecap="round"
          markerEnd="url(#phasor-arrow-voltage)"
        />
        <line
          x1={cx}
          y1={cy}
          x2={currentEnd.x}
          y2={currentEnd.y}
          stroke="#22C55E"
          strokeWidth="5"
          strokeLinecap="round"
          markerEnd="url(#phasor-arrow-current)"
        />
        {Math.abs(phase) > 0.02 ? (
          <path
            d={`M ${arcStart.x} ${arcStart.y} A 38 38 0 ${largeArcFlag} ${sweepFlag} ${arcEnd.x} ${arcEnd.y}`}
            fill="none"
            stroke="#FACC15"
            strokeWidth="3"
            strokeLinecap="round"
          />
        ) : null}
        <text x={voltageEnd.x + 10} y={voltageEnd.y - 8} fill="#A5F3FC" fontSize="14" fontWeight="700">
          U = {voltageAmplitude.toFixed(1)}V
        </text>
        <text x={currentEnd.x + 8} y={currentEnd.y + 18} fill="#BBF7D0" fontSize="14" fontWeight="700">
          I = {currentAmplitude.toFixed(3)}A
        </text>
        <text x={cx + 44} y={cy + (phase >= 0 ? 30 : -18)} fill="#FEF08A" fontSize="13">
          φ
        </text>
      </svg>
    </div>
  );
}
