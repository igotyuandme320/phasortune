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
      className={`surface-panel p-4 ${className}`}
    >
      {title ? <div className="mb-2 text-sm font-semibold text-stone-100">{title}</div> : null}
      <div className="overflow-x-auto">
        <BlockMath math={formula} />
      </div>
      {caption ? <p className="mt-2 text-xs leading-relaxed text-stone-400">{caption}</p> : null}
    </motion.div>
  );
}
