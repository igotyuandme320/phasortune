import {
  calculateCurrent,
  calculateImpedance,
  calculatePhase,
  calculateReactance,
} from "./circuitMath";

// 共享的角频率/格式化工具直接复用 circuitMath，避免重复实现。
export { formatNumber as formatPowerValue, radiansToDegrees } from "./circuitMath";

export interface PowerMetrics {
  omega: number;
  XL: number;
  XC: number;
  impedance: number;
  current: number;
  phase: number;
  activePower: number;
  reactivePower: number;
  apparentPower: number;
  powerFactor: number;
}

export interface PowerWaveformPoint {
  t: number;
  u: number;
  i: number;
  p: number;
  P: number;
}

export function calculateInstantaneousPower(U: number, I: number, omega: number, phase: number, t: number): number {
  const voltage = U * Math.sin(omega * t);
  const current = I * Math.sin(omega * t - phase);
  return voltage * current;
}

export function calculatePowerMetrics(U: number, R: number, f: number, L: number, C: number): PowerMetrics {
  const { omega, XL, XC } = calculateReactance(f, L, C);
  const impedance = calculateImpedance(R, f, L, C);
  const current = calculateCurrent(U, R, f, L, C);
  const phase = calculatePhase(R, f, L, C);
  // U 与 current 为峰值（幅值），功率取有效值口径：S = U_rms·I_rms = U·I/2。
  // 这样有功功率 P 与瞬时功率 p(t) 的真实平均值 ½UI·cosφ 一致。
  const apparentPower = (U * current) / 2;

  return {
    omega,
    XL,
    XC,
    impedance,
    current,
    phase,
    activePower: apparentPower * Math.cos(phase),
    reactivePower: apparentPower * Math.sin(phase),
    apparentPower,
    powerFactor: Math.cos(phase),
  };
}

export function generateWaveformData(
  U: number,
  R: number,
  L: number,
  C: number,
  f: number,
): PowerWaveformPoint[] {
  const metrics = calculatePowerMetrics(U, R, f, L, C);
  const period = 1 / f;
  const points = 180;

  return Array.from({ length: points + 1 }, (_, index) => {
    const t = (index / points) * period * 2;
    const u = U * Math.sin(metrics.omega * t);
    const i = metrics.current * Math.sin(metrics.omega * t - metrics.phase);

    return {
      t: t * 1000,
      u,
      i,
      p: calculateInstantaneousPower(U, metrics.current, metrics.omega, metrics.phase, t),
      P: metrics.activePower,
    };
  });
}
