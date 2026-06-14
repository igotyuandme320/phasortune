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

interface PhaseResponseChartProps {
  data: FrequencyResponsePoint[];
  selectedFrequency: number;
  resonanceFrequency: number;
}

export function PhaseResponseChart({ data, selectedFrequency, resonanceFrequency }: PhaseResponseChartProps) {
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
    <div className="h-[300px] rounded-lg border border-stone-200/10 bg-[#211f1b]/55 p-4">
      <div className="mb-3">
        <h3 className="font-semibold text-stone-50">相频响应</h3>
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
          <YAxis tick={{ fill: "#E2BF7B", fontSize: 12 }} stroke="#7B6140" domain={[-90, 90]} />
          <Tooltip
            contentStyle={{ background: "#211F1B", border: "1px solid rgba(246,235,220,0.16)", borderRadius: 8 }}
            formatter={(value: number) => [`${value.toFixed(2)}°`, "相位角"]}
            labelFormatter={(value) => `频率 ${formatFrequency(Number(value))}`}
          />
          <ReferenceLine y={0} stroke="#9B9488" strokeDasharray="4 6" />
          <ReferenceLine x={Math.log10(selectedFrequency)} stroke="#D97757" strokeWidth={2} strokeDasharray="5 5" />
          <ReferenceLine x={Math.log10(resonanceFrequency)} stroke="#D6A75D" strokeWidth={2} />
          <Line name="φ" dataKey="phase" dot={false} stroke="#D6A75D" strokeWidth={3} type="monotone" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
