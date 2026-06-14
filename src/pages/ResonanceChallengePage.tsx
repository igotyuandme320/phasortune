import { AnimatePresence, motion } from "framer-motion";
import { Activity, Shuffle, Zap } from "lucide-react";
import { useMemo, useState } from "react";
import { AnimatedCircuit } from "../components/AnimatedCircuit";
import { FormulaCard } from "../components/FormulaCard";
import { FrequencyResponseChart } from "../components/FrequencyResponseChart";
import { GlassPanel } from "../components/GlassPanel";
import { GlowingBulb } from "../components/GlowingBulb";
import { PhaseResponseChart } from "../components/PhaseResponseChart";
import { ResonanceKnob } from "../components/ResonanceKnob";
import { SliderControl } from "../components/SliderControl";
import { SuccessBadge } from "../components/SuccessBadge";
import { ValueCard } from "../components/ValueCard";
import {
  calculateCurrent,
  calculateImpedance,
  calculatePhase,
  calculateQ,
  calculateResonanceFrequency,
  formatNumber,
  generateFrequencyResponseData,
  radiansToDegrees,
} from "../utils/circuitMath";

const sourceVoltage = 12;

export function ResonanceChallengePage() {
  const [frequency, setFrequency] = useState(620);
  const [resistance, setResistance] = useState(35);
  const [inductanceMh, setInductanceMh] = useState(30);
  const [capacitanceUf, setCapacitanceUf] = useState(10);

  const L = inductanceMh / 1000;
  const C = capacitanceUf * 1e-6;

  const values = useMemo(() => {
    const resonanceFrequency = calculateResonanceFrequency(L, C);
    const impedance = calculateImpedance(resistance, frequency, L, C);
    const current = calculateCurrent(sourceVoltage, resistance, frequency, L, C);
    const phase = calculatePhase(resistance, frequency, L, C);
    const q = calculateQ(resistance, L, C);
    const difference = Math.abs(frequency - resonanceFrequency);
    const achieved = difference / resonanceFrequency < 0.03;
    const response = generateFrequencyResponseData(sourceVoltage, resistance, L, C);
    const status = achieved
      ? "接近谐振 Near resonance"
      : frequency < resonanceFrequency
        ? "低于谐振 Below resonance"
        : "高于谐振 Above resonance";

    return {
      resonanceFrequency,
      impedance,
      current,
      phaseDeg: radiansToDegrees(phase),
      q,
      difference,
      achieved,
      response,
      status,
    };
  }, [C, L, frequency, resistance]);

  const brightness = Math.min(1, values.current / (sourceVoltage / resistance));

  function applyPreset(preset: "wide" | "sharp" | "random") {
    if (preset === "wide") {
      const nextR = 80;
      const nextL = 30;
      const nextC = 10;
      const nextF0 = calculateResonanceFrequency(nextL / 1000, nextC * 1e-6);
      setResistance(nextR);
      setInductanceMh(nextL);
      setCapacitanceUf(nextC);
      setFrequency(Math.round(nextF0 * 0.72));
      return;
    }

    if (preset === "sharp") {
      const nextR = 8;
      const nextL = 80;
      const nextC = 2.2;
      const nextF0 = calculateResonanceFrequency(nextL / 1000, nextC * 1e-6);
      setResistance(nextR);
      setInductanceMh(nextL);
      setCapacitanceUf(nextC);
      setFrequency(Math.round(nextF0 * 1.22));
      return;
    }

    const nextR = Math.round(12 + Math.random() * 70);
    const nextL = Math.round(12 + Math.random() * 150);
    const nextC = Math.round((3 + Math.random() * 70) * 10) / 10;
    const nextF0 = calculateResonanceFrequency(nextL / 1000, nextC * 1e-6);
    const offset = Math.random() > 0.5 ? 1.35 : 0.65;
    setResistance(nextR);
    setInductanceMh(nextL);
    setCapacitanceUf(nextC);
    setFrequency(Math.max(10, Math.min(5000, Math.round(nextF0 * offset))));
  }

  return (
    <motion.main
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -16 }}
      transition={{ duration: 0.35 }}
      className="mx-auto max-w-[1500px] px-4 py-8 lg:px-6"
    >
      <div className="mb-6 flex flex-col justify-between gap-4 lg:flex-row lg:items-end">
        <div>
          <p className="text-sm uppercase tracking-[0.2em] text-green-100/75">RLC series resonance</p>
          <h1 className="mt-2 text-4xl font-black text-white sm:text-5xl">谐振挑战 Resonance Challenge</h1>
          <p className="demo-hide mt-3 max-w-3xl leading-7 text-slate-300">调节频率，让电路进入谐振状态。</p>
        </div>
        <AnimatePresence>{values.achieved ? <SuccessBadge /> : null}</AnimatePresence>
      </div>

      <div className="grid gap-5 xl:grid-cols-[330px_minmax(0,1fr)_330px]">
        <GlassPanel className="h-fit p-4" delay={0.05}>
          <ResonanceKnob
            frequency={frequency}
            min={10}
            max={5000}
            resonanceFrequency={values.resonanceFrequency}
            onChange={setFrequency}
          />

          <div className="mt-4 grid gap-3">
            <SliderControl label="电阻 R" subtitle="Resistance" min={1} max={200} step={1} value={resistance} unit="Ω" accent="yellow" onChange={setResistance} />
            <SliderControl label="电感 L" subtitle="Inductance" min={1} max={500} step={1} value={inductanceMh} unit="mH" accent="purple" onChange={setInductanceMh} />
            <SliderControl label="电容 C" subtitle="Capacitance" min={1} max={1000} step={0.1} value={capacitanceUf} unit="μF" accent="cyan" onChange={setCapacitanceUf} />
          </div>

          <div className="mt-4 grid grid-cols-3 gap-2">
            <button
              type="button"
              onClick={() => applyPreset("wide")}
              className="rounded-lg border border-cyan-300/25 bg-cyan-300/10 px-2 py-3 text-xs font-semibold text-cyan-100 transition hover:bg-cyan-300/20"
            >
              <Activity className="mx-auto mb-1 h-4 w-4" />
              宽峰低 Q
            </button>
            <button
              type="button"
              onClick={() => applyPreset("sharp")}
              className="rounded-lg border border-yellow-300/25 bg-yellow-300/10 px-2 py-3 text-xs font-semibold text-yellow-100 transition hover:bg-yellow-300/20"
            >
              <Zap className="mx-auto mb-1 h-4 w-4" />
              尖峰高 Q
            </button>
            <button
              type="button"
              onClick={() => applyPreset("random")}
              className="rounded-lg border border-green-300/25 bg-green-300/10 px-2 py-3 text-xs font-semibold text-green-100 transition hover:bg-green-300/20"
            >
              <Shuffle className="mx-auto mb-1 h-4 w-4" />
              随机挑战
            </button>
          </div>
        </GlassPanel>

        <div className="grid gap-5">
          <GlassPanel className="p-4 demo-emphasis" delay={0.12}>
            <div className="mb-4 flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
              <div>
                <h2 className="text-lg font-bold text-white">谐振电路 Resonant Circuit</h2>
                <p className="text-xs text-slate-400">XL = XC 时电流最大</p>
              </div>
              <span
                className={`rounded-lg border px-3 py-1 text-sm font-semibold ${
                  values.achieved
                    ? "border-green-300/40 bg-green-300/15 text-green-100"
                    : "border-cyan-300/25 bg-cyan-300/10 text-cyan-100"
                }`}
              >
                {values.status}
              </span>
            </div>
            <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_240px]">
              <AnimatedCircuit intensity={brightness} speed={brightness} resonant={values.achieved} showBulb />
              <GlowingBulb brightness={brightness} achieved={values.achieved} />
            </div>
          </GlassPanel>
          <FrequencyResponseChart
            data={values.response}
            selectedFrequency={frequency}
            resonanceFrequency={values.resonanceFrequency}
            achieved={values.achieved}
          />
        </div>

        <GlassPanel className="h-fit p-4" delay={0.18}>
          <h2 className="mb-4 text-lg font-bold text-white">挑战数据 Live Values</h2>
          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-1">
            <ValueCard label="f" subtitle="Current frequency" value={frequency.toFixed(0)} unit="Hz" />
            <ValueCard label="f₀" subtitle="Resonance frequency" value={values.resonanceFrequency.toFixed(1)} unit="Hz" accent="green" />
            <ValueCard label="|f - f₀|" subtitle="Difference" value={values.difference.toFixed(1)} unit="Hz" accent="yellow" />
            <ValueCard label="|Z|" subtitle="Impedance" value={formatNumber(values.impedance)} unit="Ω" />
            <ValueCard label="I" subtitle="Current" value={values.current.toFixed(4)} unit="A" accent="green" />
            <ValueCard label="φ" subtitle="Phase angle" value={values.phaseDeg.toFixed(2)} unit="°" accent="yellow" />
            <ValueCard label="Q" subtitle="Quality factor" value={values.q.toFixed(2)} accent="purple" />
            <ValueCard label="状态" subtitle="Status" value={values.status.split(" ")[0]} accent={values.achieved ? "green" : "cyan"} />
          </div>
        </GlassPanel>
      </div>

      <div className="mt-5 grid gap-5 lg:grid-cols-[0.95fr_1.05fr]">
        <PhaseResponseChart
          data={values.response}
          selectedFrequency={frequency}
          resonanceFrequency={values.resonanceFrequency}
        />
        <GlassPanel className="p-4" delay={0.05}>
          <h2 className="mb-4 text-lg font-bold text-white">谐振公式与结论</h2>
          <div className="grid gap-3 md:grid-cols-2">
            <FormulaCard formula={"f_0=\\frac{1}{2\\pi\\sqrt{LC}}"} />
            <FormulaCard formula={"Z=\\sqrt{R^2+(\\omega L-\\frac{1}{\\omega C})^2}"} />
            <FormulaCard formula={"I=\\frac{U}{Z}"} />
            <FormulaCard formula={"Q=\\frac{1}{R}\\sqrt{\\frac{L}{C}}"} />
          </div>
          <div className="demo-hide mt-4 rounded-lg border border-green-300/20 bg-green-300/10 p-4">
            <p className="leading-7 text-slate-200">
              在 RLC 串联电路中，当 XL = XC 时，感抗与容抗相互抵消，电路总阻抗最小，电流达到最大，此时发生串联谐振。
            </p>
          </div>
        </GlassPanel>
      </div>
    </motion.main>
  );
}
