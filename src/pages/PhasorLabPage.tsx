import { motion } from "framer-motion";
import { useMemo, useState } from "react";
import { AnimatedCircuit } from "../components/AnimatedCircuit";
import { FormulaCard } from "../components/FormulaCard";
import { GlassPanel } from "../components/GlassPanel";
import { ImpedanceTriangle } from "../components/ImpedanceTriangle";
import { PhasorDiagram } from "../components/PhasorDiagram";
import { SliderControl } from "../components/SliderControl";
import { ValueCard } from "../components/ValueCard";
import { WaveformChart } from "../components/WaveformChart";
import {
  calculateCurrent,
  calculateImpedance,
  calculatePhase,
  calculateReactance,
  formatNumber,
  generateWaveformData,
  getCircuitType,
  radiansToDegrees,
} from "../utils/circuitMath";

const typeMeta = {
  inductive: { label: "感性", subtitle: "Inductive", accent: "yellow" as const },
  capacitive: { label: "容性", subtitle: "Capacitive", accent: "purple" as const },
  resistive: { label: "近似纯阻性", subtitle: "Resistive", accent: "green" as const },
};

export function PhasorLabPage() {
  const [voltage, setVoltage] = useState(10);
  const [frequency, setFrequency] = useState(500);
  const [resistance, setResistance] = useState(50);
  const [inductanceMh, setInductanceMh] = useState(100);
  const [capacitanceUf, setCapacitanceUf] = useState(100);

  const L = inductanceMh / 1000;
  const C = capacitanceUf * 1e-6;

  const values = useMemo(() => {
    const reactance = calculateReactance(frequency, L, C);
    const impedance = calculateImpedance(resistance, frequency, L, C);
    const current = calculateCurrent(voltage, resistance, frequency, L, C);
    const phase = calculatePhase(resistance, frequency, L, C);
    const type = getCircuitType(reactance.XL, reactance.XC);
    return {
      ...reactance,
      impedance,
      current,
      phase,
      phaseDeg: radiansToDegrees(phase),
      type,
      waveform: generateWaveformData(voltage, resistance, L, C, frequency),
    };
  }, [C, L, frequency, resistance, voltage]);

  const currentRatio = Math.min(1, values.current / (voltage / resistance));
  const currentType = typeMeta[values.type];

  return (
    <motion.main
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -16 }}
      transition={{ duration: 0.35 }}
      className="mx-auto max-w-[1500px] px-4 py-8 lg:px-6"
    >
      <div className="mb-6">
        <p className="text-sm uppercase tracking-[0.2em] text-cyan-100/70">Sinusoidal steady-state</p>
        <h1 className="mt-2 text-4xl font-black text-white sm:text-5xl">相量实验室 Phasor Lab</h1>
        <p className="demo-hide mt-3 max-w-3xl leading-7 text-slate-300">
          把正弦电压与电流转换为相量，观察阻抗角如何决定相位关系。
        </p>
      </div>

      <div className="grid gap-5 xl:grid-cols-[320px_minmax(0,1fr)_330px]">
        <GlassPanel className="h-fit p-4" delay={0.05}>
          <h2 className="mb-4 text-lg font-bold text-white">参数控制 Controls</h2>
          <div className="grid gap-3">
            <SliderControl label="电压幅值 U" subtitle="Voltage amplitude" min={1} max={20} step={0.1} value={voltage} unit="V" onChange={setVoltage} />
            <SliderControl label="频率 f" subtitle="Frequency" min={10} max={2000} step={1} value={frequency} unit="Hz" accent="green" onChange={setFrequency} />
            <SliderControl label="电阻 R" subtitle="Resistance" min={1} max={200} step={1} value={resistance} unit="Ω" accent="yellow" onChange={setResistance} />
            <SliderControl label="电感 L" subtitle="Inductance" min={1} max={500} step={1} value={inductanceMh} unit="mH" accent="purple" onChange={setInductanceMh} />
            <SliderControl label="电容 C" subtitle="Capacitance" min={1} max={1000} step={1} value={capacitanceUf} unit="μF" accent="cyan" onChange={setCapacitanceUf} />
          </div>
        </GlassPanel>

        <div className="grid gap-5">
          <GlassPanel className="p-4 demo-emphasis" delay={0.12}>
            <div className="mb-4 flex items-center justify-between gap-3">
              <div>
                <h2 className="text-lg font-bold text-white">RLC 串联电路</h2>
                <p className="text-xs text-slate-400">Animated series circuit</p>
              </div>
              <span className="rounded-lg border border-green-300/25 bg-green-300/10 px-3 py-1 text-sm text-green-100">
                I = {values.current.toFixed(4)} A
              </span>
            </div>
            <AnimatedCircuit intensity={currentRatio} speed={currentRatio} />
          </GlassPanel>
          <WaveformChart data={values.waveform} />
        </div>

        <GlassPanel className="h-fit p-4" delay={0.18}>
          <h2 className="mb-4 text-lg font-bold text-white">实时计算 Live Values</h2>
          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-1">
            <ValueCard label="ω" subtitle="Angular frequency" value={formatNumber(values.omega, 1)} unit="rad/s" />
            <ValueCard label="XL" subtitle="Inductive reactance" value={formatNumber(values.XL)} unit="Ω" accent="purple" />
            <ValueCard label="XC" subtitle="Capacitive reactance" value={formatNumber(values.XC)} unit="Ω" accent="yellow" />
            <ValueCard label="|Z|" subtitle="Impedance" value={formatNumber(values.impedance)} unit="Ω" />
            <ValueCard label="I" subtitle="Current amplitude" value={values.current.toFixed(4)} unit="A" accent="green" />
            <ValueCard label="φ" subtitle="Phase angle" value={values.phaseDeg.toFixed(2)} unit="°" accent="yellow" />
            <ValueCard label={currentType.label} subtitle={currentType.subtitle} value={values.type === "inductive" ? "XL > XC" : values.type === "capacitive" ? "XC > XL" : "XL ≈ XC"} accent={currentType.accent} />
          </div>
        </GlassPanel>
      </div>

      <div className="mt-5 grid gap-5 lg:grid-cols-2">
        <PhasorDiagram voltageAmplitude={voltage} currentAmplitude={values.current} phase={values.phase} />
        <ImpedanceTriangle resistance={resistance} reactance={values.XL - values.XC} impedance={values.impedance} phase={values.phase} />
      </div>

      <div className="mt-5 grid gap-5 lg:grid-cols-[1.1fr_0.9fr]">
        <GlassPanel className="p-4" delay={0.05}>
          <h2 className="mb-4 text-lg font-bold text-white">核心公式 Formulas</h2>
          <div className="grid gap-3 md:grid-cols-2">
            <FormulaCard formula={"Z=R+j(\\omega L-\\frac{1}{\\omega C})"} />
            <FormulaCard formula={"|Z|=\\sqrt{R^2+(X_L-X_C)^2}"} />
            <FormulaCard formula={"I=\\frac{U}{|Z|}"} />
            <FormulaCard formula={"\\varphi=\\arctan\\frac{X_L-X_C}{R}"} />
          </div>
        </GlassPanel>

        <GlassPanel className="p-4 demo-hide" delay={0.08}>
          <h2 className="mb-4 text-lg font-bold text-white">课堂提示 Notes</h2>
          <div className="grid gap-3">
            <div className="rounded-lg border border-cyan-300/15 bg-cyan-300/10 p-3">
              <h3 className="font-semibold text-white">什么是相量？</h3>
              <p className="mt-1 text-sm leading-6 text-slate-300">相量把同频正弦量表示为复平面中的幅值和相位。</p>
            </div>
            <div className="rounded-lg border border-violet-300/15 bg-violet-300/10 p-3">
              <h3 className="font-semibold text-white">为什么用复数？</h3>
              <p className="mt-1 text-sm leading-6 text-slate-300">微分关系变成代数关系，电阻、电感、电容统一为阻抗。</p>
            </div>
            <div className="rounded-lg border border-yellow-300/15 bg-yellow-300/10 p-3">
              <h3 className="font-semibold text-white">阻抗角的意义</h3>
              <p className="mt-1 text-sm leading-6 text-slate-300">φ 为电压相对电流的相位角；正值表示感性，负值表示容性。</p>
            </div>
          </div>
        </GlassPanel>
      </div>
    </motion.main>
  );
}
