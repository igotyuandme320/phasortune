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
  const cx = 165;
  const cy = 140;
  const voltageLength = 112;
  const currentLength = Math.max(78, Math.min(110, currentAmplitude * 540));
  const voltageEnd = point(cx, cy, voltageLength, 0);
  const currentAngle = -phase;
  const currentEnd = point(cx, cy, currentLength, currentAngle);
  const arcRadius = 46;
  const arcStart = point(cx, cy, arcRadius, currentAngle);
  const arcEnd = point(cx, cy, arcRadius, 0);
  const largeArcFlag = Math.abs(phase) > Math.PI ? 1 : 0;
  const sweepFlag = phase >= 0 ? 0 : 1;
  const phaseDegrees = (phase * 180) / Math.PI;

  return (
    <div className="rounded-lg border border-stone-200/10 bg-[#211f1b]/55 p-4">
      <div className="mb-3 flex items-center justify-between gap-3">
        <div>
          <h3 className="font-semibold text-stone-50">相量图</h3>
          <p className="text-xs text-stone-400">Phasor diagram</p>
        </div>
        <span className="rounded-md border border-lab-cyan/20 bg-lab-cyan/10 px-2 py-1 text-xs text-stone-100">
          φ = {phaseDegrees.toFixed(1)}°
        </span>
      </div>
      <svg viewBox="0 0 330 280" className="h-[270px] w-full">
        <defs>
          <marker
            id="phasor-arrow-voltage"
            markerHeight="10"
            markerUnits="userSpaceOnUse"
            markerWidth="10"
            orient="auto"
            refX="9"
            refY="5"
          >
            <path d="M0,0 L0,10 L10,5 z" fill="#D97757" />
          </marker>
          <marker
            id="phasor-arrow-current"
            markerHeight="10"
            markerUnits="userSpaceOnUse"
            markerWidth="10"
            orient="auto"
            refX="9"
            refY="5"
          >
            <path d="M0,0 L0,10 L10,5 z" fill="#6FA58A" />
          </marker>
        </defs>
        <circle cx={cx} cy={cy} r="116" fill="rgba(35,32,28,0.58)" stroke="rgba(246,235,220,0.14)" />
        <circle cx={cx} cy={cy} r="78" fill="none" stroke="rgba(246,235,220,0.08)" />
        <path d={`M${cx - 128} ${cy} H${cx + 128} M${cx} ${cy + 122} V${cy - 122}`} stroke="rgba(246,235,220,0.12)" strokeWidth="1" />
        <circle cx={cx} cy={cy} r="3.5" fill="#F3EEE7" />
        <line
          x1={cx}
          y1={cy}
          x2={voltageEnd.x}
          y2={voltageEnd.y}
          stroke="#D97757"
          strokeWidth="3.5"
          strokeLinecap="round"
          markerEnd="url(#phasor-arrow-voltage)"
        />
        <line
          x1={cx}
          y1={cy}
          x2={currentEnd.x}
          y2={currentEnd.y}
          stroke="#6FA58A"
          strokeWidth="3.5"
          strokeLinecap="round"
          markerEnd="url(#phasor-arrow-current)"
        />
        {Math.abs(phase) > 0.02 ? (
          <path
            d={`M ${arcStart.x} ${arcStart.y} A ${arcRadius} ${arcRadius} 0 ${largeArcFlag} ${sweepFlag} ${arcEnd.x} ${arcEnd.y}`}
            fill="none"
            stroke="#D6A75D"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
        ) : null}
        <text x={voltageEnd.x + 8} y={voltageEnd.y - 8} fill="#F0B09A" fontSize="13" fontWeight="700">
          U = {voltageAmplitude.toFixed(1)}V
        </text>
        <text x={currentEnd.x + 8} y={currentEnd.y + 18} fill="#BFD9C9" fontSize="13" fontWeight="700">
          I = {currentAmplitude.toFixed(3)}A
        </text>
        <text x={cx + 54} y={cy + (phase >= 0 ? 32 : -20)} fill="#E2BF7B" fontSize="13">
          φ
        </text>
      </svg>
    </div>
  );
}
