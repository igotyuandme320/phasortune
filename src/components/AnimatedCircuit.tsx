import { useId } from "react";

interface AnimatedCircuitProps {
  intensity?: number;
  speed?: number;
  className?: string;
}

function clamp(value: number, min = 0, max = 1): number {
  return Math.min(max, Math.max(min, value));
}

export function AnimatedCircuit({
  intensity = 0.45,
  speed = 0.5,
  className = "",
}: AnimatedCircuitProps) {
  const rawId = useId().replace(/:/g, "");
  const pathId = `current-path-${rawId}`;
  const glow = clamp(intensity);
  const duration = 7 - clamp(speed) * 4.8;
  const particleCount = 6 + Math.round(glow * 3);

  return (
    <div className={`relative overflow-hidden rounded-lg border border-stone-200/10 bg-[#211f1b]/55 ${className}`}>
      <svg viewBox="0 0 680 360" role="img" aria-label="RLC 串联电路动画" className="h-full min-h-[260px] w-full">
        <defs>
          <filter id={`wire-glow-${rawId}`} x="-40%" y="-40%" width="180%" height="180%">
            <feGaussianBlur stdDeviation={String(3 + glow * 2)} result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <linearGradient id={`component-gradient-${rawId}`} x1="0%" x2="100%" y1="0%" y2="0%">
            <stop stopColor="#D97757" />
            <stop offset="55%" stopColor="#6FA58A" />
            <stop offset="100%" stopColor="#D6A75D" />
          </linearGradient>
        </defs>

        <rect x="16" y="16" width="648" height="328" rx="8" fill="rgba(35,32,28,0.44)" stroke="rgba(246,235,220,0.12)" />
        <path
          id={pathId}
          d="M118 210 H196 L218 184 L244 236 L270 184 L296 236 L322 184 L348 236 L374 210 H455 M455 210 c10 -28 34 -28 44 0 c10 28 34 28 44 0 c10 -28 34 -28 44 0 M587 210 H606 V103 H118 V210"
          fill="none"
          stroke="transparent"
          strokeWidth="4"
        />

        <path
          d="M118 210 H196"
          fill="none"
          stroke="#6B665C"
          strokeLinecap="round"
          strokeWidth="8"
        />
        <path
          className="circuit-wire"
          d="M118 210 H196"
          fill="none"
          stroke="#D97757"
          strokeLinecap="round"
          strokeOpacity={0.35 + glow * 0.55}
          strokeWidth="3"
        />

        <path
          d="M118 103 H606 V210 H587"
          fill="none"
          stroke="#6B665C"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="8"
        />
        <path
          className="circuit-wire"
          d="M118 103 H606 V210 H587"
          fill="none"
          stroke="#D97757"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeOpacity={0.32 + glow * 0.58}
          strokeWidth="3"
        />

        <g filter={`url(#wire-glow-${rawId})`}>
          <circle cx="118" cy="156" r="35" fill="rgba(217,119,87,0.06)" stroke="#D97757" strokeWidth="4" />
          <path d="M105 156 h26 M118 143 v26" stroke="#F3EEE7" strokeLinecap="round" strokeWidth="3" />
          <path d="M103 189 h30" stroke="#9B9488" strokeLinecap="round" strokeWidth="3" />

          <path
            d="M196 210 L218 184 L244 236 L270 184 L296 236 L322 184 L348 236 L374 210"
            fill="none"
            stroke={`url(#component-gradient-${rawId})`}
            strokeLinejoin="round"
            strokeWidth="6"
          />

          <path
            d="M455 210 c10 -28 34 -28 44 0 c10 28 34 28 44 0 c10 -28 34 -28 44 0"
            fill="none"
            stroke="#8B78C2"
            strokeLinecap="round"
            strokeWidth="6"
          />

          <path d="M420 172 V248 M438 172 V248" stroke="#D6A75D" strokeLinecap="round" strokeWidth="6" />
          <path d="M374 210 H420 M438 210 H455" stroke="#6B665C" strokeLinecap="round" strokeWidth="8" />
        </g>

        {Array.from({ length: particleCount }, (_, index) => (
          <circle key={index} r={3.5 + glow * 3.2} fill="#F7E5D8" opacity={0.48 + glow * 0.45}>
            <animateMotion
              dur={`${duration}s`}
              begin={`${(-index * duration) / particleCount}s`}
              repeatCount="indefinite"
            >
              <mpath href={`#${pathId}`} />
            </animateMotion>
          </circle>
        ))}

        <g className="text-[18px] font-semibold">
          <text x="72" y="280" fill="#F3EEE7">电源</text>
          <text x="70" y="304" fill="#9B9488" fontSize="14">交流源</text>
          <text x="258" y="280" fill="#F3EEE7">电阻 R</text>
          <text x="406" y="280" fill="#F3EEE7">电容 C</text>
          <text x="504" y="280" fill="#F3EEE7">电感 L</text>
        </g>
      </svg>
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          boxShadow: `inset 0 0 ${24 + glow * 46}px rgba(217,119,87,${0.05 + glow * 0.12})`,
        }}
      />
    </div>
  );
}
