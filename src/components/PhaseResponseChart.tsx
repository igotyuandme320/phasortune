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
  return (
    <div className="h-[300px] rounded-lg border border-slate-700/70 bg-slate-950/35 p-4">
      <div className="mb-3">
        <h3 className="font-semibold text-white">相频响应</h3>
        <p className="text-xs text-slate-400">Phase angle response</p>
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
          <YAxis tick={{ fill: "#FDE68A", fontSize: 12 }} stroke="#854D0E" domain={[-90, 90]} />
          <Tooltip
            contentStyle={{ background: "#0F172A", border: "1px solid rgba(148,163,184,0.25)", borderRadius: 8 }}
            formatter={(value: number) => [`${value.toFixed(2)}°`, "相位角"]}
            labelFormatter={(value) => `f = ${Number(value).toFixed(1)} Hz`}
          />
          <ReferenceLine y={0} stroke="#94A3B8" strokeDasharray="4 6" />
          <ReferenceLine x={selectedFrequency} stroke="#00D4FF" strokeWidth={2} strokeDasharray="5 5" />
          <ReferenceLine x={resonanceFrequency} stroke="#FACC15" strokeWidth={2} />
          <Line name="φ" dataKey="phase" dot={false} stroke="#FACC15" strokeWidth={3} type="monotone" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
