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
        primary: "#10b981", // Emerald 500 (Green Plan vibe)
        secondary: "#3b82f6", // Blue 500
        background: "#f8fafc", // Slate 50
        card: "#ffffff",
      },
    },
  },
  plugins: [],
};
export default config;
