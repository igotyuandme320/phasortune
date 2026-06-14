import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        lab: {
          bg: "#050816",
          panel: "rgba(15, 23, 42, 0.75)",
          cyan: "#00D4FF",
          purple: "#7C3AED",
          green: "#22C55E",
          yellow: "#FACC15",
          text: "#E5E7EB",
        },
      },
      boxShadow: {
        neon: "0 0 28px rgba(0, 212, 255, 0.28)",
        panel: "0 18px 60px rgba(0, 0, 0, 0.35)",
      },
      animation: {
        "grid-flow": "gridFlow 18s linear infinite",
        "slow-spin": "slowSpin 14s linear infinite",
        "pulse-glow": "pulseGlow 2.2s ease-in-out infinite",
        "dash-flow": "dashFlow 3s linear infinite",
        "float-soft": "floatSoft 5s ease-in-out infinite",
      },
      keyframes: {
        gridFlow: {
          "0%": { backgroundPosition: "0 0, 0 0" },
          "100%": { backgroundPosition: "80px 80px, 80px 80px" },
        },
        slowSpin: {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
        pulseGlow: {
          "0%, 100%": {
            opacity: "0.78",
            filter: "drop-shadow(0 0 10px rgba(0, 212, 255, 0.36))",
          },
          "50%": {
            opacity: "1",
            filter: "drop-shadow(0 0 22px rgba(34, 197, 94, 0.65))",
          },
        },
        dashFlow: {
          "0%": { strokeDashoffset: "0" },
          "100%": { strokeDashoffset: "-48" },
        },
        floatSoft: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
      },
      fontFamily: {
        display: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
