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
    <div className="chart-surface h-[320px] p-4">
      <div className="mb-3">
        <h3 className="font-semibold text-stone-50">正弦波形</h3>
        <p className="text-xs text-stone-400 demo-hide">
          电流相位由阻抗角决定，感性电路电流滞后，容性电路电流超前。
        </p>
      </div>
      <ResponsiveContainer width="100%" height="82%">
        <LineChart data={data} margin={{ top: 8, right: 12, left: 0, bottom: 4 }}>
          <CartesianGrid stroke="rgba(246,235,220,0.075)" strokeDasharray="3 7" />
          <XAxis
            dataKey="t"
            tick={{ fill: "#9B9488", fontSize: 12 }}
            tickFormatter={(value: number) => `${value.toFixed(1)}ms`}
            stroke="rgba(246,235,220,0.16)"
          />
          <YAxis yAxisId="voltage" tick={{ fill: "#F1A086", fontSize: 12 }} stroke="rgba(227,122,95,0.24)" />
          <YAxis
            yAxisId="current"
            orientation="right"
            tick={{ fill: "#BFD9C9", fontSize: 12 }}
            stroke="rgba(120,185,154,0.24)"
          />
          <Tooltip
            contentStyle={{ background: "rgba(18,17,15,0.92)", border: "1px solid rgba(246,235,220,0.12)", borderRadius: 8, boxShadow: "0 14px 34px rgba(0,0,0,0.28)" }}
            labelFormatter={(value) => `t = ${Number(value).toFixed(3)} ms`}
          />
          <Legend />
          <Line yAxisId="voltage" name="电压 u(t) / V" dataKey="u" dot={false} isAnimationActive={false} stroke="#E37A5F" strokeWidth={2.6} />
          <Line yAxisId="current" name="电流 i(t) / A" dataKey="i" dot={false} isAnimationActive={false} stroke="#78B99A" strokeWidth={2.6} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
