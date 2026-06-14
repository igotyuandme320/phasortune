import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import type { PowerWaveformPoint } from "../utils/powerMath";

interface PowerWaveformChartProps {
  data: PowerWaveformPoint[];
  averagePower: number;
}

export function PowerWaveformChart({ data, averagePower }: PowerWaveformChartProps) {
  return (
    <div className="h-[340px] rounded-lg border border-stone-200/10 bg-[#211f1b]/55 p-4">
      <div className="mb-3 flex items-center justify-between gap-3">
        <div>
          <h3 className="font-semibold text-stone-50">瞬时功率</h3>
          <p className="text-xs text-stone-400">p(t) = u(t)i(t)</p>
        </div>
        <span className="rounded-md border border-lab-green/25 bg-lab-green/10 px-2 py-1 text-xs text-stone-100">
          P = {averagePower.toFixed(2)} W
        </span>
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
          <YAxis tick={{ fill: "#F0B09A", fontSize: 12 }} stroke="#7B4938" />
          <Tooltip
            contentStyle={{ background: "#211F1B", border: "1px solid rgba(246,235,220,0.16)", borderRadius: 8 }}
            formatter={(value: number, name) => [`${value.toFixed(3)}`, name === "p" ? "瞬时功率" : "平均功率"]}
            labelFormatter={(value) => `时间 ${Number(value).toFixed(3)} ms`}
          />
          <Legend />
          <ReferenceLine y={averagePower} stroke="#6FA58A" strokeWidth={2} strokeDasharray="6 6" label={{ value: "P", fill: "#BFD9C9", fontSize: 12 }} />
          <Line name="p(t) / W" dataKey="p" dot={false} stroke="#D97757" strokeWidth={3} type="monotone" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
