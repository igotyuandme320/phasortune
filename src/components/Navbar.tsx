import { FlaskConical, Gauge, Home, MonitorUp, Waves } from "lucide-react";
import { Link, NavLink } from "react-router-dom";
import { useDemoMode } from "../context/DemoModeContext";

const navItems = [
  { to: "/", label: "首页", subtitle: "Home", icon: Home },
  { to: "/phasor", label: "相量实验室", subtitle: "Phasor", icon: Waves },
  { to: "/resonance", label: "谐振挑战", subtitle: "Resonance", icon: Gauge },
];

export function Navbar() {
  const { isDemoMode, toggleDemoMode } = useDemoMode();

  return (
    <header className="sticky top-0 z-50 border-b border-stone-200/10 bg-[#191713]/88 backdrop-blur-xl">
      <nav className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 lg:px-6">
        <Link to="/" className="flex items-center gap-3">
          <span className="grid h-10 w-10 place-items-center rounded-lg border border-lab-cyan/30 bg-lab-cyan/10 shadow-neon">
            <FlaskConical className="h-5 w-5 text-lab-cyan" />
          </span>
          <span>
            <span className="block text-lg font-semibold tracking-wide text-white">PhasorTune</span>
            <span className="block text-xs uppercase tracking-[0.18em] text-stone-400">
              Circuit Lab
            </span>
          </span>
        </Link>

        <div className="hidden items-center gap-2 md:flex">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `group flex items-center gap-2 rounded-lg border px-3 py-2 transition ${
                    isActive
                      ? "border-lab-cyan/45 bg-lab-cyan/10 text-stone-50 shadow-neon"
                      : "border-transparent text-stone-300 hover:border-lab-cyan/20 hover:bg-stone-100/5"
                  }`
                }
              >
                <Icon className="h-4 w-4 text-lab-cyan" />
                <span className="leading-tight">
                  <span className="block text-sm font-medium">{item.label}</span>
                  <span className="block text-[10px] uppercase tracking-[0.16em] text-stone-500">
                    {item.subtitle}
                  </span>
                </span>
              </NavLink>
            );
          })}
        </div>

        <button
          type="button"
          aria-pressed={isDemoMode}
          onClick={toggleDemoMode}
          className={`flex items-center gap-2 rounded-lg border px-3 py-2 text-sm font-medium transition ${
            isDemoMode
              ? "border-lab-yellow/50 bg-lab-yellow/10 text-stone-50 shadow-[0_12px_28px_rgba(214,167,93,0.16)]"
              : "border-stone-300/15 bg-[#211f1b]/75 text-stone-200 hover:border-lab-cyan/35 hover:text-stone-50"
          }`}
        >
          <MonitorUp className="h-4 w-4" />
          <span className="hidden sm:inline">课堂展示模式</span>
          <span className="sm:hidden">Demo</span>
        </button>
      </nav>

      <div className="grid grid-cols-3 border-t border-stone-200/10 md:hidden">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `flex items-center justify-center gap-1 px-2 py-2 text-xs ${
                  isActive ? "bg-lab-cyan/10 text-stone-50" : "text-stone-400"
                }`
              }
            >
              <Icon className="h-3.5 w-3.5" />
              {item.label}
            </NavLink>
          );
        })}
      </div>
    </header>
  );
}
