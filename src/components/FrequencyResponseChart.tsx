import {
  CartesianGrid,
  Line,
  LineChart,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import type { FrequencyResponsePoint } from "../utils/circuitMath";

interface FrequencyResponseChartProps {
  data: FrequencyResponsePoint[];
  selectedFrequency: number;
  resonanceFrequency: number;
  achieved?: boolean;
}

export function FrequencyResponseChart({
  data,
  selectedFrequency,
  resonanceFrequency,
  achieved = false,
}: FrequencyResponseChartProps) {
  const chartData = data.map((point) => ({
    ...point,
    x: Math.log10(point.frequency),
  }));
  const ticks = [10, 30, 100, 300, 1000, 3000, 5000].map((frequency) => Math.log10(frequency));
  const formatFrequency = (logFrequency: number) => {
    const frequency = 10 ** logFrequency;
    return frequency >= 1000 ? `${(frequency / 1000).toFixed(frequency >= 3000 ? 0 : 1)} kHz` : `${Math.round(frequency)} Hz`;
  };

  return (
    <div className="h-[320px] rounded-lg border border-stone-200/10 bg-[#211f1b]/55 p-4">
      <div className="mb-3 flex items-center justify-between gap-3">
        <div>
          <h3 className="font-semibold text-stone-50">幅频响应</h3>
        </div>
        <span className={`rounded-md border px-2 py-1 text-xs ${achieved ? "border-lab-green/35 bg-lab-green/10 text-stone-100" : "border-lab-cyan/20 bg-lab-cyan/10 text-stone-100"}`}>
          f₀ {resonanceFrequency.toFixed(1)} Hz
        </span>
      </div>
      <ResponsiveContainer width="100%" height="82%">
        <LineChart data={chartData} margin={{ top: 8, right: 12, left: 0, bottom: 4 }}>
          <CartesianGrid stroke="rgba(246,235,220,0.10)" strokeDasharray="3 6" />
          <XAxis
            dataKey="x"
            type="number"
            domain={[Math.log10(10), Math.log10(5000)]}
            ticks={ticks}
            tick={{ fill: "#9B9488", fontSize: 12 }}
            tickFormatter={formatFrequency}
            stroke="#514C44"
          />
          <YAxis tick={{ fill: "#BFD9C9", fontSize: 12 }} stroke="#486B59" />
          <Tooltip
            contentStyle={{ background: "#211F1B", border: "1px solid rgba(246,235,220,0.16)", borderRadius: 8 }}
            formatter={(value: number) => [`${value.toFixed(4)} A`, "电流"]}
            labelFormatter={(value) => `频率 ${formatFrequency(Number(value))}`}
          />
          <ReferenceLine x={Math.log10(selectedFrequency)} stroke="#D97757" strokeWidth={2} strokeDasharray="5 5" label={{ value: "当前", fill: "#F0B09A", fontSize: 12 }} />
          <ReferenceLine x={Math.log10(resonanceFrequency)} stroke="#D6A75D" strokeWidth={achieved ? 4 : 2} label={{ value: "f0", fill: "#E2BF7B", fontSize: 12 }} />
          <Line name="I" dataKey="current" dot={false} stroke="#6FA58A" strokeWidth={3} type="monotone" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
