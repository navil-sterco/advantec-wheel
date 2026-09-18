import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Light "showroom" theme built around the Advantec Wheels red/black mark.
        paper: "#F6F5F3",
        paperdim: "#EFEDE9",
        panel: "#FFFFFF",
        panelraised: "#FBFAF8",
        ink: "#141414",
        inkdeep: "#0B0B0C",
        heading: "#161616",
        body: "#3E3D3B",
        muted: "#7C7A76",
        rule: "#E4E1DB",
        red: "#C31F26",
        reddeep: "#9E181D",
        redsoft: "#FBEAEA",
        gold: "#C9A24B",
        // legacy aliases so existing component classes keep working
        amber: "#C31F26",
        amberdeep: "#9E181D",
        cyan: "#1D1D1D",
        cyandeep: "#0B0B0C",
        slate: "#7C7A76",
        moss: "#4C7A6B",
      },
      fontFamily: {
        display: ["var(--font-sora)", "sans-serif"],
        body: ["var(--font-inter)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      keyframes: {
        inkReveal: {
          "0%": { opacity: "0", filter: "blur(6px)", transform: "translateY(6px)" },
          "100%": { opacity: "1", filter: "blur(0px)", transform: "translateY(0)" },
        },
        blink: {
          "0%, 49%": { opacity: "1" },
          "50%, 100%": { opacity: "0" },
        },
        tick: {
          "0%": { transform: "scale(0.4)", opacity: "0" },
          "60%": { transform: "scale(1.15)", opacity: "1" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
        glowPulse: {
          "0%, 100%": { opacity: "1", boxShadow: "0 0 0 0 rgba(195,31,38,0.45)" },
          "50%": { opacity: "0.6", boxShadow: "0 0 0 4px rgba(195,31,38,0)" },
        },
      },
      animation: {
        inkReveal: "inkReveal 0.5s cubic-bezier(0.22, 1, 0.36, 1) both",
        blink: "blink 1s step-end infinite",
        tick: "tick 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) both",
        glowPulse: "glowPulse 2s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
