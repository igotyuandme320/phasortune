import { motion } from "framer-motion";
import { ArrowRight, Gauge, Waves } from "lucide-react";
import { Link } from "react-router-dom";
import { AnimatedCircuit } from "../components/AnimatedCircuit";
import { FormulaCard } from "../components/FormulaCard";
import { GlassPanel } from "../components/GlassPanel";

const formulaCards = [
  "Z=R+j(\\omega L-\\frac{1}{\\omega C})",
  "f_0=\\frac{1}{2\\pi\\sqrt{LC}}",
  "\\varphi=\\arctan\\frac{X_L-X_C}{R}",
];

const labCards = [
  {
    to: "/phasor",
    icon: Waves,
    title: "相量实验室",
    subtitle: "Phasor Lab",
    description: "观察正弦波、相位差、阻抗三角形和旋转相量。",
    button: "进入实验",
    color: "cyan",
  },
  {
    to: "/resonance",
    icon: Gauge,
    title: "谐振挑战",
    subtitle: "Resonance Challenge",
    description: "调节频率，让 RLC 电路达到谐振并点亮灯泡。",
    button: "开始挑战",
    color: "green",
  },
];

export function HomePage() {
  return (
    <motion.main
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -16 }}
      transition={{ duration: 0.35 }}
      className="mx-auto max-w-7xl px-4 py-10 lg:px-6"
    >
      <section className="grid min-h-[calc(100vh-104px)] content-center gap-8">
        <div className="mx-auto max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.55 }}
            className="mb-4 inline-flex items-center rounded-lg border border-cyan-300/25 bg-cyan-300/10 px-3 py-1 text-sm text-cyan-100"
          >
            Circuit Analysis Visualization Lab
          </motion.div>
          <h1 className="neon-text text-5xl font-black tracking-normal text-white sm:text-7xl lg:text-8xl">
            PhasorTune
          </h1>
          <p className="mt-4 text-2xl font-semibold text-cyan-100 sm:text-3xl">
            正弦稳态与 RLC 谐振可视化实验室
          </p>
          <p className="demo-hide mx-auto mt-5 max-w-3xl text-base leading-8 text-slate-300 sm:text-lg">
            通过旋转相量、动态波形和谐振小游戏，理解正弦稳态电路中的相位、阻抗、电流与频率响应。
          </p>
        </div>

        <div className="relative mx-auto w-full max-w-5xl">
          <AnimatedCircuit intensity={0.72} speed={0.76} showBulb resonant className="min-h-[300px]" />
          <div className="pointer-events-none absolute inset-0 hidden lg:block">
            {formulaCards.map((formula, index) => (
              <div
                key={formula}
                className={`absolute w-64 animate-float-soft ${
                  index === 0
                    ? "left-4 top-5"
                    : index === 1
                      ? "right-6 top-8 [animation-delay:1.2s]"
                      : "bottom-5 left-1/2 -translate-x-1/2 [animation-delay:2.4s]"
                }`}
              >
                <FormulaCard formula={formula} />
              </div>
            ))}
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {labCards.map((card, index) => {
            const Icon = card.icon;
            const isGreen = card.color === "green";
            return (
              <GlassPanel key={card.to} delay={0.12 + index * 0.08} className="p-5">
                <div className="flex h-full flex-col justify-between gap-5">
                  <div>
                    <div
                      className={`mb-4 grid h-12 w-12 place-items-center rounded-lg border ${
                        isGreen
                          ? "border-green-300/30 bg-green-300/10 text-lab-green"
                          : "border-cyan-300/30 bg-cyan-300/10 text-lab-cyan"
                      }`}
                    >
                      <Icon className="h-6 w-6" />
                    </div>
                    <h2 className="text-2xl font-bold text-white">{card.title}</h2>
                    <p className="text-sm uppercase tracking-[0.18em] text-slate-400">{card.subtitle}</p>
                    <p className="demo-hide mt-3 leading-7 text-slate-300">{card.description}</p>
                  </div>
                  <Link
                    to={card.to}
                    className={`inline-flex w-fit items-center gap-2 rounded-lg border px-4 py-2 font-semibold transition ${
                      isGreen
                        ? "border-green-300/35 bg-green-300/10 text-green-100 hover:bg-green-300/20"
                        : "border-cyan-300/35 bg-cyan-300/10 text-cyan-100 hover:bg-cyan-300/20"
                    }`}
                  >
                    {card.button}
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </GlassPanel>
            );
          })}
        </div>
      </section>
    </motion.main>
  );
}
