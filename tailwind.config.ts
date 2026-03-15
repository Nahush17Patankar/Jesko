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
        background: "#050505",
        foreground: "#ffffff",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "sans-serif"],
      },
      letterSpacing: {
        widest: ".25em",
        cinematic: ".5em",
      },
    },
  },
  plugins: [],
};
export default config;
