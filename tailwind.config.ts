import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        lab: {
          bg: "#191713",
          panel: "rgba(31, 29, 25, 0.78)",
          cyan: "#D97757",
          purple: "#8B78C2",
          green: "#6FA58A",
          yellow: "#D6A75D",
          text: "#F3EEE7",
        },
      },
      boxShadow: {
        neon: "0 12px 38px rgba(217, 119, 87, 0.18)",
        panel: "0 18px 60px rgba(0, 0, 0, 0.28)",
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
            filter: "drop-shadow(0 0 10px rgba(217, 119, 87, 0.22))",
          },
          "50%": {
            opacity: "1",
            filter: "drop-shadow(0 0 20px rgba(111, 165, 138, 0.42))",
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
