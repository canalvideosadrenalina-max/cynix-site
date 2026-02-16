/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        matrix: "#00ff41",
      },
      boxShadow: {
        "glow-blue": "0 0 40px -8px rgba(0, 112, 243, 0.5)",
        "glow-blue-lg": "0 0 60px -12px rgba(0, 112, 243, 0.4)",
        "glow-blue-sm": "0 0 20px -4px rgba(0, 112, 243, 0.4)",
      },
      backgroundImage: {
        "grid-pattern": "linear-gradient(rgba(0, 112, 243, 0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 112, 243, 0.03) 1px, transparent 1px)",
        "grid-pattern-dense": "linear-gradient(rgba(0, 112, 243, 0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 112, 243, 0.06) 1px, transparent 1px)",
      },
      backgroundSize: {
        "grid": "48px 48px",
        "grid-dense": "24px 24px",
      },
    },
  },
  plugins: [],
};
