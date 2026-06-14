import { radiansToDegrees, type PowerMetrics } from "../utils/powerMath";

interface PowerInterpretationPanelProps {
  metrics: PowerMetrics;
}

function getCircuitText(metrics: PowerMetrics): string {
  const reactiveGap = metrics.XL - metrics.XC;

  if (Math.abs(reactiveGap) < Math.max(0.5, metrics.impedance * 0.03)) {
    return "近似纯阻性：电压与电流几乎同相，能量主要转化为有功功率。";
  }

  if (reactiveGap > 0) {
    return "感性：电流滞后于电压，磁场储能占主导，无功功率为正。";
  }

  return "容性：电流超前于电压，电场储能占主导，无功功率为负。";
}

function getOscillationText(metrics: PowerMetrics): string {
  const ratio = metrics.apparentPower === 0 ? 0 : Math.abs(metrics.reactivePower) / metrics.apparentPower;

  if (ratio < 0.18) {
    return "能量往返交换较弱，功率曲线大部分时间保持正向。";
  }

  if (ratio < 0.55) {
    return "存在明显能量往返，电源与储能元件之间持续交换能量。";
  }

  return "能量往返很强，瞬时功率会出现显著负值，说明能量周期性回送。";
}

function getEfficiencyText(metrics: PowerMetrics): string {
  const factor = Math.abs(metrics.powerFactor);

  if (factor >= 0.9) {
    return "功率因数高，视在功率中大部分转化为有功功率。";
  }

  if (factor >= 0.65) {
    return "功率因数中等，无功成分已经不可忽略。";
  }

  return "功率因数偏低，电流中有较多不做净功的往返能量。";
}

export function PowerInterpretationPanel({ metrics }: PowerInterpretationPanelProps) {
  return (
    <div className="grid gap-3">
      <div className="rounded-lg border border-lab-cyan/15 bg-lab-cyan/10 p-4">
        <div className="text-sm font-semibold text-stone-50">电路性质</div>
        <p className="mt-2 text-sm leading-6 text-stone-300">{getCircuitText(metrics)}</p>
      </div>
      <div className="rounded-lg border border-lab-purple/15 bg-lab-purple/10 p-4">
        <div className="text-sm font-semibold text-stone-50">能量往返</div>
        <p className="mt-2 text-sm leading-6 text-stone-300">{getOscillationText(metrics)}</p>
      </div>
      <div className="rounded-lg border border-lab-green/15 bg-lab-green/10 p-4">
        <div className="text-sm font-semibold text-stone-50">功率利用</div>
        <p className="mt-2 text-sm leading-6 text-stone-300">{getEfficiencyText(metrics)}</p>
      </div>
      <div className="rounded-lg border border-stone-200/10 bg-[#211f1b]/55 p-4">
        <div className="text-xs uppercase tracking-[0.18em] text-stone-500">φ</div>
        <div className="mt-1 text-3xl font-black text-stone-50">{radiansToDegrees(metrics.phase).toFixed(2)}°</div>
      </div>
    </div>
  );
}
