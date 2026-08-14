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
        brand: {
          50: '#f0f5fa',
          100: '#e1ebd4',
          700: '#1b4d89',
          800: '#0f2c59',
          900: '#0a1d3b',
        },
        gold: {
          400: '#e5c158',
          500: '#d4af37',
          600: '#b89220',
        },
        teal: {
          600: '#0d9488',
          700: '#0f766e',
        },
        warm: {
          50: '#fdfbf7',
          100: '#f7f4ed',
          200: '#eee8da',
        }
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'Inter', 'system-ui', 'sans-serif'],
        serif: ['var(--font-inter)', 'Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
export default config;
