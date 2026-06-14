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
    <div className="h-[320px] rounded-lg border border-slate-700/70 bg-slate-950/35 p-4">
      <div className="mb-3">
        <h3 className="font-semibold text-white">正弦波形</h3>
        <p className="text-xs text-slate-400 demo-hide">
          电流相位由阻抗角决定，感性电路电流滞后，容性电路电流超前。
        </p>
      </div>
      <ResponsiveContainer width="100%" height="82%">
        <LineChart data={data} margin={{ top: 8, right: 12, left: 0, bottom: 4 }}>
          <CartesianGrid stroke="rgba(148,163,184,0.14)" strokeDasharray="3 6" />
          <XAxis
            dataKey="t"
            tick={{ fill: "#94A3B8", fontSize: 12 }}
            tickFormatter={(value: number) => `${value.toFixed(1)}ms`}
            stroke="#334155"
          />
          <YAxis yAxisId="voltage" tick={{ fill: "#A5F3FC", fontSize: 12 }} stroke="#164E63" />
          <YAxis
            yAxisId="current"
            orientation="right"
            tick={{ fill: "#BBF7D0", fontSize: 12 }}
            stroke="#166534"
          />
          <Tooltip
            contentStyle={{ background: "#0F172A", border: "1px solid rgba(148,163,184,0.25)", borderRadius: 8 }}
            labelFormatter={(value) => `t = ${Number(value).toFixed(3)} ms`}
          />
          <Legend />
          <Line yAxisId="voltage" name="u(t) 电压 / V" dataKey="u" dot={false} stroke="#00D4FF" strokeWidth={3} />
          <Line yAxisId="current" name="i(t) 电流 / A" dataKey="i" dot={false} stroke="#22C55E" strokeWidth={3} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
