import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import type { WaveformPoint } from "../utils/circuitMath";

interface WaveformChartProps {
  data: WaveformPoint[];
}

export function WaveformChart({ data }: WaveformChartProps) {
  return (
    <div className="h-[320px] rounded-lg border border-stone-200/10 bg-[#211f1b]/55 p-4">
      <div className="mb-3">
        <h3 className="font-semibold text-stone-50">正弦波形</h3>
        <p className="text-xs text-stone-400 demo-hide">
          电流相位由阻抗角决定，感性电路电流滞后，容性电路电流超前。
        </p>
      </div>
      <ResponsiveContainer width="100%" height="82%">
        <LineChart data={data} margin={{ top: 8, right: 12, left: 0, bottom: 4 }}>
          <CartesianGrid stroke="rgba(246,235,220,0.10)" strokeDasharray="3 6" />
          <XAxis
            dataKey="t"
            tick={{ fill: "#9B9488", fontSize: 12 }}
            tickFormatter={(value: number) => `${value.toFixed(1)}ms`}
            stroke="#514C44"
          />
          <YAxis yAxisId="voltage" tick={{ fill: "#F0B09A", fontSize: 12 }} stroke="#7B4938" />
          <YAxis
            yAxisId="current"
            orientation="right"
            tick={{ fill: "#BFD9C9", fontSize: 12 }}
            stroke="#486B59"
          />
          <Tooltip
            contentStyle={{ background: "#211F1B", border: "1px solid rgba(246,235,220,0.16)", borderRadius: 8 }}
            labelFormatter={(value) => `t = ${Number(value).toFixed(3)} ms`}
          />
          <Legend />
          <Line yAxisId="voltage" name="电压 u(t) / V" dataKey="u" dot={false} stroke="#D97757" strokeWidth={3} />
          <Line yAxisId="current" name="电流 i(t) / A" dataKey="i" dot={false} stroke="#6FA58A" strokeWidth={3} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
