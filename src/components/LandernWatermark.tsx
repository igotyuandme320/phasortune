export function LandernWatermark() {
  return (
    <div className="pointer-events-none fixed bottom-5 right-6 z-40 hidden select-none items-center gap-2 rounded-full border border-stone-100/[0.08] bg-[#f7f1e8]/[0.032] px-3 py-1.5 text-[11px] font-medium tracking-[0.24em] text-stone-200/36 shadow-[inset_0_1px_0_rgba(255,252,247,0.05),0_10px_26px_rgba(0,0,0,0.16)] backdrop-blur-md md:flex">
      <span className="h-1.5 w-1.5 rounded-full bg-lab-cyan/35" />
      landern
    </div>
  );
}
