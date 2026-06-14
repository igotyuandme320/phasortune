import { SliderControl } from "./SliderControl";

interface ParameterControlPanelProps {
  voltage: number;
  frequency: number;
  resistance: number;
  inductanceMh: number;
  capacitanceUf: number;
  onVoltageChange: (value: number) => void;
  onFrequencyChange: (value: number) => void;
  onResistanceChange: (value: number) => void;
  onInductanceChange: (value: number) => void;
  onCapacitanceChange: (value: number) => void;
}

export function ParameterControlPanel({
  voltage,
  frequency,
  resistance,
  inductanceMh,
  capacitanceUf,
  onVoltageChange,
  onFrequencyChange,
  onResistanceChange,
  onInductanceChange,
  onCapacitanceChange,
}: ParameterControlPanelProps) {
  return (
    <div className="grid gap-3">
      <SliderControl label="电压 U" subtitle="正弦电源幅值" min={1} max={20} step={0.1} value={voltage} unit="V" onChange={onVoltageChange} />
      <SliderControl label="频率 f" subtitle="角频率由它决定" min={10} max={2000} step={1} value={frequency} unit="Hz" accent="green" onChange={onFrequencyChange} />
      <SliderControl label="电阻 R" subtitle="有功功率来源" min={1} max={200} step={1} value={resistance} unit="Ω" accent="yellow" onChange={onResistanceChange} />
      <SliderControl label="电感 L" subtitle="提供感性无功" min={1} max={500} step={1} value={inductanceMh} unit="mH" accent="purple" onChange={onInductanceChange} />
      <SliderControl label="电容 C" subtitle="提供容性无功" min={1} max={1000} step={1} value={capacitanceUf} unit="μF" accent="cyan" onChange={onCapacitanceChange} />
    </div>
  );
}
