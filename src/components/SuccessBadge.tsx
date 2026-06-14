import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";

export function SuccessBadge() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.76, y: 18 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className="rounded-lg border border-lab-green/35 bg-lab-green/15 px-5 py-4 text-center shadow-[0_16px_36px_rgba(111,165,138,0.18)]"
    >
      <motion.div
        animate={{ rotate: [0, -8, 8, 0], scale: [1, 1.08, 1] }}
        transition={{ duration: 1.25, repeat: Infinity }}
        className="mx-auto mb-2 grid h-12 w-12 place-items-center rounded-full bg-lab-green/20"
      >
        <CheckCircle2 className="h-7 w-7 text-lab-green" />
      </motion.div>
      <div className="text-2xl font-black text-stone-50">Resonance Achieved!</div>
      <div className="text-lg font-semibold text-stone-100">谐振达成！</div>
    </motion.div>
  );
}
