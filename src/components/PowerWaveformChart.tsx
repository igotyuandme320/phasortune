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
  powerScale: number;
}

export function PowerWaveformChart({ data, averagePower, powerScale }: PowerWaveformChartProps) {
  return (
    <div className="chart-surface h-[340px] p-4">
      <div className="mb-3 flex items-center justify-between gap-3">
        <div>
          <h3 className="font-semibold text-stone-50">瞬时功率</h3>
          <p className="text-xs text-stone-400">p(t) = u(t)i(t)</p>
        </div>
        <span className="rounded-md border border-lab-green/20 bg-lab-green/[0.075] px-2.5 py-1 text-xs text-stone-100">
          P = {averagePower.toFixed(2)} W
        </span>
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
          <YAxis
            domain={[-powerScale * 0.6, powerScale * 1.05]}
            allowDataOverflow
            tickFormatter={(value: number) => value.toFixed(2)}
            tick={{ fill: "#F1A086", fontSize: 12 }}
            stroke="rgba(227,122,95,0.24)"
          />
          <Tooltip
            contentStyle={{ background: "rgba(18,17,15,0.92)", border: "1px solid rgba(246,235,220,0.12)", borderRadius: 8, boxShadow: "0 14px 34px rgba(0,0,0,0.28)" }}
            formatter={(value: number, name) => [`${value.toFixed(3)}`, name === "p" ? "瞬时功率" : "平均功率"]}
            labelFormatter={(value) => `时间 ${Number(value).toFixed(3)} ms`}
          />
          <Legend />
          <ReferenceLine y={averagePower} stroke="#78B99A" strokeWidth={1.8} strokeDasharray="6 6" label={{ value: "P", fill: "#BFD9C9", fontSize: 12 }} />
          <Line name="p(t) / W" dataKey="p" dot={false} isAnimationActive={false} stroke="#E37A5F" strokeWidth={2.6} type="monotone" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
