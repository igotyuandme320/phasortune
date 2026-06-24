import { radiansToDegrees, formatPowerValue, type PowerMetrics } from "../utils/powerMath";
import { ValueCard } from "./ValueCard";

interface PowerMetricsPanelProps {
  metrics: PowerMetrics;
}

export function PowerMetricsPanel({ metrics }: PowerMetricsPanelProps) {
  return (
    <div className="grid gap-3">
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        <ValueCard label="P" subtitle="平均功率" value={formatPowerValue(metrics.activePower)} unit="W" accent="green" formula={"P=UI\\cos\\varphi"} />
        <ValueCard label="Q" subtitle="无功功率" value={formatPowerValue(metrics.reactivePower)} unit="var" accent={metrics.reactivePower >= 0 ? "purple" : "cyan"} formula={"Q=UI\\sin\\varphi"} />
        <ValueCard label="S" subtitle="视在功率" value={formatPowerValue(metrics.apparentPower)} unit="VA" formula={"S=UI"} />
        <ValueCard label="cosφ" subtitle="功率因数" value={metrics.powerFactor.toFixed(3)} accent="yellow" formula={"\\cos\\varphi=\\dfrac{P}{S}"} />
        <ValueCard label="φ" subtitle="相位角" value={radiansToDegrees(metrics.phase).toFixed(2)} unit="°" accent="purple" formula={"\\varphi=\\arctan\\dfrac{X_L-X_C}{R}"} />
      </div>
      <p className="demo-hide text-xs leading-5 text-stone-500">
        U、I 为正弦量峰值，P / Q / S 按有效值（÷√2）计算。
      </p>
    </div>
  );
}
