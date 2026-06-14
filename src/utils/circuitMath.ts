export type CircuitType = "inductive" | "capacitive" | "resistive";

export interface ReactanceResult {
  omega: number;
  XL: number;
  XC: number;
}

export interface WaveformPoint {
  t: number;
  u: number;
  i: number;
}

const TWO_PI = 2 * Math.PI;

export function calculateAngularFrequency(f: number): number {
  return TWO_PI * f;
}

export function calculateReactance(f: number, L: number, C: number): ReactanceResult {
  const omega = calculateAngularFrequency(f);
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

export function calculateCurrent(U: number, R: number, f: number, L: number, C: number): number {
  return U / calculateImpedance(R, f, L, C);
}

export function calculatePhase(R: number, f: number, L: number, C: number): number {
  const { XL, XC } = calculateReactance(f, L, C);
  return Math.atan((XL - XC) / R);
}

export function getCircuitType(XL: number, XC: number): CircuitType {
  const tolerance = Math.max(0.5, Math.min(XL, XC) * 0.04);

  if (Math.abs(XL - XC) <= tolerance) {
    return "resistive";
  }

  return XL > XC ? "inductive" : "capacitive";
}

export function generateWaveformData(
  U: number,
  R: number,
  L: number,
  C: number,
  f: number,
): WaveformPoint[] {
  const omega = calculateAngularFrequency(f);
  const I = calculateCurrent(U, R, f, L, C);
  const phi = calculatePhase(R, f, L, C);
  const period = 1 / f;
  const points = 160;

  return Array.from({ length: points + 1 }, (_, index) => {
    const t = (index / points) * period * 2;
    return {
      t: t * 1000,
      u: U * Math.sin(omega * t),
      i: I * Math.sin(omega * t - phi),
    };
  });
}

export function radiansToDegrees(radians: number): number {
  return (radians * 180) / Math.PI;
}

export function formatNumber(value: number, digits = 2): string {
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
