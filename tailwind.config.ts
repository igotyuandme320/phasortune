import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        lab: {
          bg: "#111214",
          panel: "rgba(25, 25, 24, 0.72)",
          cyan: "#E37A5F",
          purple: "#9A8CDC",
          green: "#78B99A",
          yellow: "#D8B36C",
          text: "#F7F1E8",
        },
      },
      boxShadow: {
        neon: "0 12px 34px rgba(227, 122, 95, 0.14)",
        panel: "0 18px 54px rgba(0, 0, 0, 0.22)",
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
