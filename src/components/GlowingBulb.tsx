import { motion } from "framer-motion";

interface GlowingBulbProps {
  brightness: number;
  achieved?: boolean;
}

function clamp(value: number): number {
  return Math.min(1, Math.max(0, value));
}

export function GlowingBulb({ brightness, achieved = false }: GlowingBulbProps) {
  const glow = clamp(brightness);

  return (
    <motion.div
      animate={achieved ? { scale: [1, 1.06, 1], opacity: [0.92, 1, 0.92] } : { scale: 1, opacity: 1 }}
      transition={{ duration: 1.2, repeat: achieved ? Infinity : 0 }}
      className="grid place-items-center rounded-lg border border-lab-yellow/20 bg-[#211f1b]/55 p-4"
      style={{
        boxShadow: `0 10px ${20 + glow * 42}px rgba(214,167,93,${0.08 + glow * 0.24})`,
      }}
    >
      <svg viewBox="0 0 180 220" className="h-56 w-full max-w-[220px]">
        <defs>
          <filter id="bulb-glow" x="-70%" y="-70%" width="240%" height="240%">
            <feGaussianBlur stdDeviation={8 + glow * 14} result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        <circle
          cx="90"
          cy="82"
          r="54"
          fill={`rgba(214,167,93,${0.08 + glow * 0.66})`}
          stroke="#D6A75D"
          strokeWidth="5"
          filter="url(#bulb-glow)"
        />
        <path
          d="M65 83 c14 -22 36 -22 50 0 c-2 16 -13 20 -13 36 H78 c0 -16 -11 -20 -13 -36z"
          fill={`rgba(245,218,168,${0.22 + glow * 0.68})`}
        />
        <path d="M73 141 H107 M76 154 H104 M80 167 H100" stroke="#9B9488" strokeLinecap="round" strokeWidth="8" />
        <path d="M58 188 H122" stroke="#6B665C" strokeLinecap="round" strokeWidth="10" />
        <circle cx="45" cy="42" r={4 + glow * 8} fill="#D6A75D" opacity={glow} />
        <circle cx="137" cy="55" r={3 + glow * 6} fill="#6FA58A" opacity={glow * 0.9} />
      </svg>
      <div className="text-center">
        <div className="text-sm font-semibold text-stone-100">灯泡亮度</div>
        <div className="text-xs text-stone-400">亮度 {(glow * 100).toFixed(0)}%</div>
      </div>
    </motion.div>
  );
}
