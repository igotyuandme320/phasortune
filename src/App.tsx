import { AnimatePresence, motion } from "framer-motion";
import { BrowserRouter, Navigate, Route, Routes, useLocation } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import { LandernWatermark } from "./components/LandernWatermark";
import { DemoModeProvider, useDemoMode } from "./context/DemoModeContext";
import { HomePage } from "./pages/HomePage";
import { PhasorLabPage } from "./pages/PhasorLabPage";
import { PowerFlowLab } from "./pages/PowerFlowLab";

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<HomePage />} />
        <Route path="/phasor" element={<PhasorLabPage />} />
        <Route path="/power" element={<PowerFlowLab />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AnimatePresence>
  );
}

function AppFrame() {
  const { isDemoMode } = useDemoMode();

  return (
    <div className={`app-shell ${isDemoMode ? "demo-mode" : ""}`}>
      <Navbar />
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.35 }}>
        <AnimatedRoutes />
      </motion.div>
      <LandernWatermark />
    </div>
  );
}

export function App() {
  return (
    <DemoModeProvider>
      <BrowserRouter
        basename={import.meta.env.BASE_URL}
        future={{ v7_relativeSplatPath: true, v7_startTransition: true }}
      >
        <AppFrame />
      </BrowserRouter>
    </DemoModeProvider>
  );
}
