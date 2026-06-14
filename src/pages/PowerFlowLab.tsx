import { motion } from "framer-motion";
import { useMemo, useState } from "react";
import { AnimatedCircuit } from "../components/AnimatedCircuit";
import { FormulaCard } from "../components/FormulaCard";
import { GlassPanel } from "../components/GlassPanel";
import { ParameterControlPanel } from "../components/ParameterControlPanel";
import { PowerInterpretationPanel } from "../components/PowerInterpretationPanel";
import { PowerMetricsPanel } from "../components/PowerMetricsPanel";
import { PowerWaveformChart } from "../components/PowerWaveformChart";
import { ValueCard } from "../components/ValueCard";
import { VoltageCurrentChart } from "../components/VoltageCurrentChart";
import {
  calculatePowerMetrics,
  formatPowerValue,
  generateWaveformData,
  radiansToDegrees,
} from "../utils/powerMath";

export function PowerFlowLab() {
  const [voltage, setVoltage] = useState(10);
  const [frequency, setFrequency] = useState(500);
  const [resistance, setResistance] = useState(50);
  const [inductanceMh, setInductanceMh] = useState(100);
  const [capacitanceUf, setCapacitanceUf] = useState(100);

  const L = inductanceMh / 1000;
  const C = capacitanceUf * 1e-6;

  const values = useMemo(() => {
    const metrics = calculatePowerMetrics(voltage, resistance, frequency, L, C);
    const waveform = generateWaveformData(voltage, resistance, L, C, frequency);
    const referenceCurrent = voltage / resistance;
    const currentRatio = referenceCurrent === 0 ? 0 : Math.min(1, metrics.current / referenceCurrent);

    return {
      metrics,
      waveform,
      netReactance: metrics.XL - metrics.XC,
      phaseDeg: radiansToDegrees(metrics.phase),
      visualCurrent: Math.sqrt(Math.max(0, currentRatio)),
    };
  }, [C, L, frequency, resistance, voltage]);

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
          <p className="text-sm tracking-[0.2em] text-lab-green/80">交流功率流</p>
          <h1 className="mt-2 text-4xl font-black text-stone-50 sm:text-5xl">功率分析模块</h1>
          <p className="demo-hide mt-3 max-w-3xl leading-7 text-stone-300">
            调节 RLC 串联电路参数，实时观察瞬时功率、有功功率、无功功率、视在功率和功率因数。
          </p>
        </div>

        <div className="grid gap-3 sm:grid-cols-3">
          <div className="rounded-lg border border-stone-200/10 bg-stone-100/[0.04] px-4 py-3">
            <div className="text-xs text-stone-500">相位角</div>
            <div className="mt-1 text-xl font-bold text-stone-50">{values.phaseDeg.toFixed(2)}°</div>
          </div>
          <div className="rounded-lg border border-stone-200/10 bg-stone-100/[0.04] px-4 py-3">
            <div className="text-xs text-stone-500">功率因数</div>
            <div className="mt-1 text-xl font-bold text-stone-50">{values.metrics.powerFactor.toFixed(3)}</div>
          </div>
          <div className="rounded-lg border border-stone-200/10 bg-stone-100/[0.04] px-4 py-3">
            <div className="text-xs text-stone-500">无功方向</div>
            <div className="mt-1 text-xl font-bold text-stone-50">
              {values.netReactance > 0.5 ? "感性" : values.netReactance < -0.5 ? "容性" : "近似纯阻"}
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-5 xl:grid-cols-[330px_minmax(0,1fr)_340px]">
        <GlassPanel className="h-fit p-4" delay={0.05}>
          <h2 className="mb-4 text-lg font-bold text-stone-50">参数控制</h2>
          <ParameterControlPanel
            voltage={voltage}
            frequency={frequency}
            resistance={resistance}
            inductanceMh={inductanceMh}
            capacitanceUf={capacitanceUf}
            onVoltageChange={setVoltage}
            onFrequencyChange={setFrequency}
            onResistanceChange={setResistance}
            onInductanceChange={setInductanceMh}
            onCapacitanceChange={setCapacitanceUf}
          />
        </GlassPanel>

        <div className="grid gap-5">
          <GlassPanel className="p-4 demo-emphasis" delay={0.12}>
            <div className="mb-4 flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
              <div>
                <h2 className="text-lg font-bold text-stone-50">RLC 串联电路</h2>
                <p className="text-xs text-stone-400">电压、电流与功率按当前参数连续变化</p>
              </div>
              <span className="rounded-lg border border-lab-green/25 bg-lab-green/10 px-3 py-1 text-sm text-stone-100">
                I = {values.metrics.current.toFixed(4)} A
              </span>
            </div>
            <AnimatedCircuit
              intensity={values.visualCurrent}
              speed={values.visualCurrent}
              className="min-h-[300px]"
            />
          </GlassPanel>

          <VoltageCurrentChart data={values.waveform} />
          <PowerWaveformChart data={values.waveform} averagePower={values.metrics.activePower} />
        </div>

        <div className="grid h-fit gap-5">
          <GlassPanel className="p-4" delay={0.18}>
            <h2 className="mb-4 text-lg font-bold text-stone-50">功率数据</h2>
            <PowerMetricsPanel metrics={values.metrics} />
          </GlassPanel>

          <GlassPanel className="p-4" delay={0.22}>
            <h2 className="mb-4 text-lg font-bold text-stone-50">物理解释</h2>
            <PowerInterpretationPanel metrics={values.metrics} />
          </GlassPanel>
        </div>
      </div>

      <div className="mt-5 grid gap-5 lg:grid-cols-[1fr_0.9fr]">
        <GlassPanel className="p-4" delay={0.05}>
          <h2 className="mb-4 text-lg font-bold text-stone-50">功率公式</h2>
          <div className="grid gap-3 md:grid-cols-2">
            <FormulaCard formula={"p(t)=u(t)i(t)"} />
            <FormulaCard formula={"P=UI\\cos\\varphi"} />
            <FormulaCard formula={"Q=UI\\sin\\varphi"} />
            <FormulaCard formula={"S=UI"} />
          </div>
        </GlassPanel>

        <GlassPanel className="p-4" delay={0.08}>
          <h2 className="mb-4 text-lg font-bold text-stone-50">电路状态</h2>
          <div className="grid gap-3 sm:grid-cols-2">
            <ValueCard label="ω" subtitle="角频率" value={formatPowerValue(values.metrics.omega, 1)} unit="rad/s" />
            <ValueCard label="|Z|" subtitle="阻抗模" value={formatPowerValue(values.metrics.impedance)} unit="Ω" />
            <ValueCard label="XL" subtitle="感抗" value={formatPowerValue(values.metrics.XL)} unit="Ω" accent="purple" />
            <ValueCard label="XC" subtitle="容抗" value={formatPowerValue(values.metrics.XC)} unit="Ω" accent="yellow" />
          </div>
        </GlassPanel>
      </div>
    </motion.main>
  );
}
