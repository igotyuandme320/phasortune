import { motion } from "framer-motion";
import { useMemo, useState } from "react";
import { AnimatedCircuit } from "../components/AnimatedCircuit";
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
  const [frequency, setFrequency] = useState(50);
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
          <h1 className="mt-2 text-4xl font-semibold text-stone-50 sm:text-5xl">功率分析模块</h1>
          <p className="demo-hide mt-3 max-w-3xl leading-7 text-stone-300">
            调节 RLC 串联电路参数，实时观察瞬时功率、有功功率、无功功率、视在功率和功率因数。
          </p>
        </div>

        <div className="grid gap-3 sm:grid-cols-3">
          <div className="surface-panel px-4 py-3">
            <div className="text-xs text-stone-500">相位角</div>
            <div className="mt-1 text-xl font-semibold text-stone-50">{values.phaseDeg.toFixed(2)}°</div>
          </div>
          <div className="surface-panel px-4 py-3">
            <div className="text-xs text-stone-500">功率因数</div>
            <div className="mt-1 text-xl font-semibold text-stone-50">{values.metrics.powerFactor.toFixed(3)}</div>
          </div>
          <div className="surface-panel px-4 py-3">
            <div className="text-xs text-stone-500">无功方向</div>
            <div className="mt-1 text-xl font-semibold text-stone-50">
              {values.netReactance > 0.5 ? "感性" : values.netReactance < -0.5 ? "容性" : "近似纯阻"}
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-5 xl:grid-cols-[300px_minmax(0,1fr)_360px]">
        {/* 左侧：参数控制，滚动时整页严格固定 */}
        <GlassPanel className="order-1 h-fit self-start p-4 xl:sticky xl:top-20" delay={0.05}>
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

        {/* 中间：滚动分析内容 */}
        <div className="order-3 grid content-start gap-5 xl:order-2">
          <VoltageCurrentChart data={values.waveform} voltageScale={20} currentScale={voltage / resistance} />
          <PowerWaveformChart data={values.waveform} averagePower={values.metrics.activePower} />

          <GlassPanel className="p-4" delay={0.18}>
            <h2 className="mb-4 text-lg font-bold text-stone-50">功率数据</h2>
            <PowerMetricsPanel metrics={values.metrics} />
          </GlassPanel>

          <GlassPanel className="p-4" delay={0.22}>
            <h2 className="mb-4 text-lg font-bold text-stone-50">物理解释</h2>
            <PowerInterpretationPanel metrics={values.metrics} />
          </GlassPanel>

          <GlassPanel className="p-4" delay={0.08}>
            <h2 className="mb-4 text-lg font-bold text-stone-50">电路状态</h2>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              <ValueCard label="ω" subtitle="角频率" value={formatPowerValue(values.metrics.omega, 1)} unit="rad/s" formula={"\\omega=2\\pi f"} />
              <ValueCard label="|Z|" subtitle="阻抗模" value={formatPowerValue(values.metrics.impedance)} unit="Ω" formula={"|Z|=\\sqrt{R^2+(X_L-X_C)^2}"} />
              <ValueCard label="XL" subtitle="感抗" value={formatPowerValue(values.metrics.XL)} unit="Ω" accent="purple" formula={"X_L=\\omega L"} />
              <ValueCard label="XC" subtitle="容抗" value={formatPowerValue(values.metrics.XC)} unit="Ω" accent="yellow" formula={"X_C=\\dfrac{1}{\\omega C}"} />
            </div>
          </GlassPanel>
        </div>

        {/* 右侧：电路示意，严格固定在右上角 */}
        <div className="order-2 h-fit self-start xl:order-3 xl:sticky xl:top-20">
          <GlassPanel className="p-4 demo-emphasis" delay={0.12}>
            <div className="mb-3 flex items-center justify-between gap-2">
              <div>
                <h2 className="text-base font-bold text-stone-50">RLC 串联电路</h2>
                <p className="text-xs text-stone-400">动态示意</p>
              </div>
              <span className="rounded-lg border border-lab-green/20 bg-lab-green/[0.075] px-2.5 py-1 text-xs text-stone-100">
                I = {values.metrics.current.toFixed(4)} A
              </span>
            </div>
            <AnimatedCircuit intensity={values.visualCurrent} speed={values.visualCurrent} />
          </GlassPanel>
        </div>
      </div>
    </motion.main>
  );
}
