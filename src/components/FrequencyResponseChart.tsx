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
  return (
    <div className="h-[320px] rounded-lg border border-slate-700/70 bg-slate-950/35 p-4">
      <div className="mb-3 flex items-center justify-between gap-3">
        <div>
          <h3 className="font-semibold text-white">幅频响应</h3>
          <p className="text-xs text-slate-400">Current amplitude response</p>
        </div>
        <span className={`rounded-md border px-2 py-1 text-xs ${achieved ? "border-green-300/35 bg-green-300/10 text-green-100" : "border-cyan-300/20 bg-cyan-300/10 text-cyan-100"}`}>
          f₀ {resonanceFrequency.toFixed(1)} Hz
        </span>
      </div>
      <ResponsiveContainer width="100%" height="82%">
        <LineChart data={data} margin={{ top: 8, right: 12, left: 0, bottom: 4 }}>
          <CartesianGrid stroke="rgba(148,163,184,0.14)" strokeDasharray="3 6" />
          <XAxis
            dataKey="frequency"
            type="number"
            domain={[10, 5000]}
            tick={{ fill: "#94A3B8", fontSize: 12 }}
            tickFormatter={(value: number) => `${Math.round(value)}`}
            stroke="#334155"
          />
          <YAxis tick={{ fill: "#BBF7D0", fontSize: 12 }} stroke="#166534" />
          <Tooltip
            contentStyle={{ background: "#0F172A", border: "1px solid rgba(148,163,184,0.25)", borderRadius: 8 }}
            formatter={(value: number) => [`${value.toFixed(4)} A`, "电流"]}
            labelFormatter={(value) => `f = ${Number(value).toFixed(1)} Hz`}
          />
          <ReferenceLine x={selectedFrequency} stroke="#00D4FF" strokeWidth={2} strokeDasharray="5 5" label={{ value: "当前", fill: "#A5F3FC", fontSize: 12 }} />
          <ReferenceLine x={resonanceFrequency} stroke="#FACC15" strokeWidth={achieved ? 4 : 2} label={{ value: "f0", fill: "#FEF08A", fontSize: 12 }} />
          <Line name="I" dataKey="current" dot={false} stroke="#22C55E" strokeWidth={3} type="monotone" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
