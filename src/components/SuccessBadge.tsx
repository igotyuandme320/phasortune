import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";

export function SuccessBadge() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.76, y: 18 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className="rounded-lg border border-green-300/35 bg-green-300/15 px-5 py-4 text-center shadow-[0_0_36px_rgba(34,197,94,0.28)]"
    >
      <motion.div
        animate={{ rotate: [0, -8, 8, 0], scale: [1, 1.08, 1] }}
        transition={{ duration: 1.25, repeat: Infinity }}
        className="mx-auto mb-2 grid h-12 w-12 place-items-center rounded-full bg-green-300/20"
      >
        <CheckCircle2 className="h-7 w-7 text-lab-green" />
      </motion.div>
      <div className="text-2xl font-black text-white">Resonance Achieved!</div>
      <div className="text-lg font-semibold text-green-100">谐振达成！</div>
    </motion.div>
  );
}
