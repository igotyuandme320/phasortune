import { motion } from "framer-motion";
import { useMemo, useState } from "react";
import { GlassPanel } from "../components/GlassPanel";
import { ImpedanceTriangle } from "../components/ImpedanceTriangle";
import { PhasorDiagram } from "../components/PhasorDiagram";
import { QuizCard } from "../components/QuizCard";
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
  inductive: { label: "感性", subtitle: "电流滞后", accent: "yellow" as const },
  capacitive: { label: "容性", subtitle: "电流超前", accent: "purple" as const },
  resistive: { label: "近似纯阻性", subtitle: "同相", accent: "green" as const },
};

export function PhasorLabPage() {
  const [voltage, setVoltage] = useState(10);
  const [frequency, setFrequency] = useState(50);
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
        <p className="text-sm tracking-[0.2em] text-lab-cyan/80">正弦稳态分析</p>
        <h1 className="mt-2 text-4xl font-semibold text-stone-50 sm:text-5xl">相量实验室</h1>
        <p className="demo-hide mt-3 max-w-3xl leading-7 text-stone-300">
          把正弦电压与电流转换为相量，观察阻抗角如何决定相位关系。
        </p>
      </div>

      <div className="grid gap-5 xl:grid-cols-[300px_minmax(0,1fr)]">
        {/* 左侧：参数控制，滚动时整页严格固定 */}
        <GlassPanel className="h-fit self-start p-4 xl:sticky xl:top-20" delay={0.05}>
          <h2 className="mb-4 text-lg font-bold text-stone-50">参数控制</h2>
          <div className="grid gap-3">
            <SliderControl label="电压幅值 U" subtitle="正弦电源幅值" min={1} max={20} step={0.1} value={voltage} unit="V" onChange={setVoltage} />
            <SliderControl label="频率 f" subtitle="激励频率" min={10} max={2000} step={1} value={frequency} unit="Hz" accent="green" onChange={setFrequency} />
            <SliderControl label="电阻 R" subtitle="耗能元件" min={1} max={200} step={1} value={resistance} unit="Ω" accent="yellow" onChange={setResistance} />
            <SliderControl label="电感量 L" subtitle="单位毫亨" min={1} max={500} step={1} value={inductanceMh} unit="mH" accent="purple" onChange={setInductanceMh} />
            <SliderControl label="电容量 C" subtitle="单位微法" min={1} max={1000} step={1} value={capacitanceUf} unit="µF" accent="cyan" onChange={setCapacitanceUf} />
          </div>
        </GlassPanel>

        {/* 右侧：滚动分析内容 */}
        <div className="grid content-start gap-5">
          <WaveformChart data={values.waveform} voltageScale={20} currentScale={voltage / resistance} />

          <GlassPanel className="p-4" delay={0.18}>
            <h2 className="mb-4 text-lg font-bold text-stone-50">实时计算</h2>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              <ValueCard label="ω" subtitle="角频率" value={formatNumber(values.omega, 1)} unit="rad/s" formula={"\\omega=2\\pi f"} />
              <ValueCard label="XL" subtitle="感抗" value={formatNumber(values.XL)} unit="Ω" accent="purple" formula={"X_L=\\omega L"} />
              <ValueCard label="XC" subtitle="容抗" value={formatNumber(values.XC)} unit="Ω" accent="yellow" formula={"X_C=\\dfrac{1}{\\omega C}"} />
              <ValueCard label="|Z|" subtitle="阻抗模" value={formatNumber(values.impedance)} unit="Ω" formula={"|Z|=\\sqrt{R^2+(X_L-X_C)^2}"} />
              <ValueCard label="I" subtitle="电流幅值" value={values.current.toFixed(4)} unit="A" accent="green" formula={"I=\\dfrac{U}{|Z|}"} />
              <ValueCard label="φ" subtitle="相位角" value={values.phaseDeg.toFixed(2)} unit="°" accent="yellow" formula={"\\varphi=\\arctan\\dfrac{X_L-X_C}{R}"} />
              <ValueCard label={currentType.label} subtitle={currentType.subtitle} value={values.type === "inductive" ? "XL > XC" : values.type === "capacitive" ? "XC > XL" : "XL ≈ XC"} accent={currentType.accent} />
            </div>
          </GlassPanel>

          <div className="grid gap-5 lg:grid-cols-2">
            <PhasorDiagram
              voltageAmplitude={voltage}
              currentAmplitude={values.current}
              currentScale={currentRatio}
              phase={values.phase}
            />
            <ImpedanceTriangle resistance={resistance} reactance={values.XL - values.XC} impedance={values.impedance} phase={values.phase} />
          </div>

          <GlassPanel className="p-4" delay={0.08}>
            <div className="mb-4">
              <h2 className="text-lg font-bold text-stone-50">课堂提问</h2>
              <p className="text-xs text-stone-400">点击或悬停卡片查看答案</p>
            </div>
            <div className="grid gap-3 sm:grid-cols-3">
              <QuizCard question="什么是相量？" answer="相量把同频正弦量表示为复平面中的幅值和相位。" />
              <QuizCard question="为什么用复数表示正弦量？" answer="微分关系变成代数关系，电阻、电感、电容统一为阻抗。" />
              <QuizCard question="阻抗角如何决定相位差？" answer="φ 为电压相对电流的相位角；正值表示感性、电流滞后，负值表示容性、电流超前。" />
            </div>
          </GlassPanel>
        </div>
      </div>
    </motion.main>
  );
}
