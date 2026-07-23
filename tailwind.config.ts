import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Dark backgrounds — slate-blue tinted, not pure black
        ink: {
          950: "#080C12",  // deepest bg
          900: "#0D1218",  // main bg
          850: "#121A24",  // secondary surfaces
          800: "#17222F",  // cards, panels
          700: "#1D2B3A",  // hover states
          600: "#253444",  // borders, dividers
        },
        // Accent — teal-steel #77C0CF
        celeste: {
          50:  "#EEF9FB",
          100: "#D4EFF5",
          200: "#AEDCE8",
          300: "#8DCEDD",
          400: "#82C6D4",
          500: "#77C0CF",  // MAIN
          600: "#5BAAB9",
          700: "#3F90A4",
          800: "#2C7384",
        },
        // Text — cool off-white, never pure white
        paper: {
          50:  "#EDF2F7",  // headlines, primary text
          100: "#DDE5EF",  // slightly dimmed
          200: "#C1CEDF",  // secondary headings
          300: "#94A9BE",  // body secondary
          400: "#6A84A0",  // muted labels
          500: "#4F6577",  // very muted
          600: "#384D5E",  // barely visible
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        display: ["var(--font-inter)", "system-ui", "sans-serif"],
        mono: ["var(--font-geist-mono)", "monospace"],
      },
      fontSize: {
        // Editorial-scale display type — big, tight
        "hero": ["clamp(3rem, 8vw, 6.5rem)", { lineHeight: "0.95", letterSpacing: "-0.035em", fontWeight: "500" }],
        "display-xl": ["clamp(2.5rem, 6vw, 5rem)", { lineHeight: "1", letterSpacing: "-0.03em", fontWeight: "500" }],
        "display-lg": ["clamp(2rem, 4.5vw, 3.75rem)", { lineHeight: "1.05", letterSpacing: "-0.025em", fontWeight: "500" }],
        "display-md": ["clamp(1.625rem, 3vw, 2.5rem)", { lineHeight: "1.1", letterSpacing: "-0.02em", fontWeight: "500" }],
        "display-sm": ["clamp(1.25rem, 2vw, 1.5rem)", { lineHeight: "1.25", letterSpacing: "-0.015em", fontWeight: "500" }],
      },
      spacing: {
        section: "clamp(4rem, 8vw, 7rem)",
        "section-lg": "clamp(6rem, 12vw, 10rem)",
      },
      borderRadius: {
        sm: "8px",
        DEFAULT: "12px",
        md: "16px",
        lg: "20px",
        xl: "24px",
        "2xl": "32px",
        "3xl": "40px",
      },
      boxShadow: {
        "soft": "0 2px 20px rgba(0, 0, 0, 0.4)",
        "lift": "0 12px 40px rgba(0, 0, 0, 0.5)",
        "celeste": "0 8px 40px rgba(119, 192, 207, 0.18)",
      },
      transitionTimingFunction: {
        "smooth": "cubic-bezier(0.25, 0.1, 0.25, 1)",
        "out-expo": "cubic-bezier(0.19, 1, 0.22, 1)",
        "signature": "cubic-bezier(0.32, 0.72, 0, 1)",
      },
      animation: {
        "marquee": "marquee 40s linear infinite",
        "marquee-slow": "marquee 60s linear infinite",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
