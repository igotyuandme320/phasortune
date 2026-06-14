import { motion } from "framer-motion";
import { BlockMath } from "react-katex";

interface FormulaCardProps {
  title?: string;
  formula: string;
  caption?: string;
  className?: string;
}

export function FormulaCard({ title, formula, caption, className = "" }: FormulaCardProps) {
  return (
    <motion.div
      whileHover={{ y: -4, scale: 1.015 }}
      transition={{ type: "spring", stiffness: 260, damping: 20 }}
      className={`rounded-lg border border-cyan-300/20 bg-slate-950/45 p-4 shadow-[0_0_22px_rgba(0,212,255,0.08)] ${className}`}
    >
      {title ? <div className="mb-2 text-sm font-semibold text-cyan-100">{title}</div> : null}
      <div className="overflow-x-auto">
        <BlockMath math={formula} />
      </div>
      {caption ? <p className="mt-2 text-xs leading-relaxed text-slate-400">{caption}</p> : null}
    </motion.div>
  );
}
