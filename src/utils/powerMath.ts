export interface PowerReactance {
  omega: number;
  XL: number;
  XC: number;
}

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

const TWO_PI = 2 * Math.PI;

export function calculateOmega(f: number): number {
  return TWO_PI * f;
}

export function calculateReactance(f: number, L: number, C: number): PowerReactance {
  const omega = calculateOmega(f);

  return {
    omega,
    XL: omega * L,
    XC: 1 / (omega * C),
  };
}

export function calculateImpedance(R: number, f: number, L: number, C: number): number {
  const { XL, XC } = calculateReactance(f, L, C);
  return Math.sqrt(R * R + Math.pow(XL - XC, 2));
}

export function calculatePhase(R: number, f: number, L: number, C: number): number {
  const { XL, XC } = calculateReactance(f, L, C);
  return Math.atan((XL - XC) / R);
}

export function calculateCurrent(U: number, R: number, f: number, L: number, C: number): number {
  return U / calculateImpedance(R, f, L, C);
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
  const apparentPower = U * current;

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

export function radiansToDegrees(radians: number): number {
  return (radians * 180) / Math.PI;
}

export function formatPowerValue(value: number, digits = 2): string {
  if (!Number.isFinite(value)) {
    return "--";
  }

  if (Math.abs(value) >= 1000) {
    return value.toFixed(0);
  }

  if (Math.abs(value) >= 100) {
    return value.toFixed(1);
  }

  return value.toFixed(digits);
}
