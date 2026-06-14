import { createContext, useContext, useMemo, useState } from "react";

interface DemoModeContextValue {
  isDemoMode: boolean;
  toggleDemoMode: () => void;
}

const DemoModeContext = createContext<DemoModeContextValue | undefined>(undefined);

export function DemoModeProvider({ children }: { children: React.ReactNode }) {
  const [isDemoMode, setIsDemoMode] = useState(false);

  const value = useMemo(
    () => ({
      isDemoMode,
      toggleDemoMode: () => setIsDemoMode((current) => !current),
    }),
    [isDemoMode],
  );

  return <DemoModeContext.Provider value={value}>{children}</DemoModeContext.Provider>;
}

export function useDemoMode(): DemoModeContextValue {
  const context = useContext(DemoModeContext);

  if (!context) {
    throw new Error("useDemoMode must be used inside DemoModeProvider");
  }

  return context;
}
