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
        bg: {
          primary: "#FFFFFF",
          secondary: "#F8F9FA",
        },
        surface: {
          card: "#FFFFFF",
          elevated: "#FFFFFF",
        },
        text: {
          primary: "#1A1A1A",
          secondary: "#5A5A5A",
          tertiary: "#909090",
          disabled: "#C4C4C4",
          inverse: "#FFFFFF",
        },
        border: {
          default: "#E0E0E0",
          focus: "#4A90E2",
          disabled: "#F0F0F0",
        },
        urgent: {
          DEFAULT: "#E53E3E",
          bg: "#FFF5F5",
        },
        consider: {
          DEFAULT: "#DD6B20",
          bg: "#FFFAF0",
        },
        good: {
          DEFAULT: "#38A169",
          bg: "#F0FFF4",
        },
        info: {
          DEFAULT: "#3182CE",
          bg: "#EBF8FF",
        },
        warning: {
          DEFAULT: "#D69E2E",
          bg: "#FEFCBF",
          text: "#744210",
        },
      },
      fontFamily: {
        sans: [
          "-apple-system",
          "BlinkMacSystemFont",
          "Pretendard",
          "Apple SD Gothic Neo",
          "Noto Sans KR",
          "sans-serif",
        ],
      },
      fontSize: {
        display: ["32px", { lineHeight: "1.4", fontWeight: "700" }],
        h1: ["24px", { lineHeight: "1.4", fontWeight: "700" }],
        h2: ["20px", { lineHeight: "1.4", fontWeight: "700" }],
        "large-body": ["18px", { lineHeight: "1.5", fontWeight: "500" }],
        body: ["16px", { lineHeight: "1.6", fontWeight: "400" }],
        caption: ["14px", { lineHeight: "1.5", fontWeight: "400" }],
        small: ["12px", { lineHeight: "1.4", fontWeight: "400" }],
      },
      spacing: {
        xs: "4px",
        s: "8px",
        m: "16px",
        l: "24px",
        xl: "32px",
        xxl: "48px",
        "card-padding": "20px",
        "container-padding": "20px",
        "section-gap": "32px",
        "card-gap": "16px",
      },
      borderRadius: {
        card: "12px",
        chip: "18px",
        "chip-small": "14px",
        button: "24px",
        "button-large": "28px",
      },
      boxShadow: {
        card: "0 2px 8px rgba(0, 0, 0, 0.08)",
        "card-hover": "0 4px 12px rgba(0, 0, 0, 0.12)",
        "card-pressed": "0 1px 4px rgba(0, 0, 0, 0.1)",
        focus: "0 0 0 4px rgba(74, 144, 226, 0.3)",
      },
      screens: {
        tablet: "768px",
        desktop: "1024px",
      },
    },
  },
  plugins: [],
};
export default config;
