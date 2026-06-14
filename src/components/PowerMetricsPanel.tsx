import { radiansToDegrees, formatPowerValue, type PowerMetrics } from "../utils/powerMath";
import { ValueCard } from "./ValueCard";

interface PowerMetricsPanelProps {
  metrics: PowerMetrics;
}

export function PowerMetricsPanel({ metrics }: PowerMetricsPanelProps) {
  return (
    <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-1">
      <ValueCard label="P" subtitle="平均功率" value={formatPowerValue(metrics.activePower)} unit="W" accent="green" />
      <ValueCard label="Q" subtitle="无功功率" value={formatPowerValue(metrics.reactivePower)} unit="var" accent={metrics.reactivePower >= 0 ? "purple" : "cyan"} />
      <ValueCard label="S" subtitle="视在功率" value={formatPowerValue(metrics.apparentPower)} unit="VA" />
      <ValueCard label="cosφ" subtitle="功率因数" value={metrics.powerFactor.toFixed(3)} accent="yellow" />
      <ValueCard label="φ" subtitle="相位角" value={radiansToDegrees(metrics.phase).toFixed(2)} unit="°" accent="purple" />
    </div>
  );
}
