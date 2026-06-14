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
    <header className="sticky top-0 z-50 border-b border-cyan-300/10 bg-[#050816]/80 backdrop-blur-xl">
      <nav className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 lg:px-6">
        <Link to="/" className="flex items-center gap-3">
          <span className="grid h-10 w-10 place-items-center rounded-lg border border-cyan-300/30 bg-cyan-300/10 shadow-neon">
            <FlaskConical className="h-5 w-5 text-lab-cyan" />
          </span>
          <span>
            <span className="block text-lg font-semibold tracking-wide text-white">PhasorTune</span>
            <span className="block text-xs uppercase tracking-[0.18em] text-cyan-100/60">
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
                      ? "border-cyan-300/45 bg-cyan-300/10 text-white shadow-neon"
                      : "border-transparent text-slate-300 hover:border-cyan-300/20 hover:bg-white/5"
                  }`
                }
              >
                <Icon className="h-4 w-4 text-lab-cyan" />
                <span className="leading-tight">
                  <span className="block text-sm font-medium">{item.label}</span>
                  <span className="block text-[10px] uppercase tracking-[0.16em] text-slate-400">
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
              ? "border-yellow-300/60 bg-yellow-300/15 text-yellow-100 shadow-[0_0_24px_rgba(250,204,21,0.22)]"
              : "border-slate-600/70 bg-slate-900/70 text-slate-200 hover:border-cyan-300/40 hover:text-white"
          }`}
        >
          <MonitorUp className="h-4 w-4" />
          <span className="hidden sm:inline">课堂展示模式</span>
          <span className="sm:hidden">Demo</span>
        </button>
      </nav>

      <div className="grid grid-cols-3 border-t border-cyan-300/10 md:hidden">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `flex items-center justify-center gap-1 px-2 py-2 text-xs ${
                  isActive ? "bg-cyan-300/10 text-white" : "text-slate-400"
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
