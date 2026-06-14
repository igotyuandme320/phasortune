export function LandernWatermark() {
  return (
    <div className="pointer-events-none fixed bottom-5 right-6 z-40 hidden select-none items-center gap-2 rounded-full border border-stone-100/8 bg-[#f7f1e8]/[0.025] px-3 py-1.5 text-[11px] font-medium tracking-[0.24em] text-stone-200/32 backdrop-blur-md md:flex">
      <span className="h-1.5 w-1.5 rounded-full bg-lab-cyan/35" />
      landern
    </div>
  );
}
