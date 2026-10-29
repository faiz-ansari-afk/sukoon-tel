/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: [
    "./index.html",
    "./src/**/*.{ts,tsx,js,jsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "1.5rem",
      screens: {
        "2xl": "1280px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
          50: "#eef8f2",
          100: "#d7efe1",
          200: "#b2dfc6",
          300: "#83c7a3",
          400: "#50aa7d",
          500: "#2d8e60",
          600: "#1f714b",
          700: "#1a5b3e",
          800: "#164933",
          900: "#133d2c",
          950: "#082117",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        ayur: {
          red: {
            DEFAULT: "#c61d23",
            light: "#df2d34",
            dark: "#990f14",
          },
          gold: {
            DEFAULT: "#d99726",
            light: "#f3b33d",
            dark: "#aa6f11",
          },
          cream: {
            DEFAULT: "#fbf8f1",
            surface: "#f5f0e3",
            card: "#ffffff",
          },
          forest: {
            DEFAULT: "#184230",
            dark: "#0f2e21",
            light: "#265b44",
          },
          amber: "#e67e22",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      fontFamily: {
        sans: [
          "Plus Jakarta Sans",
          "Rozha One",
          "Noto Sans Devanagari",
          "system-ui",
          "-apple-system",
          "sans-serif",
        ],
        serif: ["Playfair Display", "Rozha One", "serif"],
        hindi: ["Noto Sans Devanagari", "sans-serif"],
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        pulseGlow: {
          "0%, 100%": { boxShadow: "0 0 15px rgba(34, 197, 94, 0.4)" },
          "50%": { boxShadow: "0 0 25px rgba(34, 197, 94, 0.8)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "pulse-glow": "pulseGlow 2s infinite ease-in-out",
      },
    },
  },
  plugins: [],
};

