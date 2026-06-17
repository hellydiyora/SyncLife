/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/**/*.{js,jsx,ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        serif: ["Playfair Display", "Georgia", "serif"],
        sans: ["Inter", "sans-serif"],
        // Retaining font names just in case they are hardcoded in other places
        mainTag: ["Chelsea Market", "sans-serif"],
        subTag: ["Truculenta", "sans-serif"],
        danceTag: ["Caveat", "cursive"],
        allTag: ["Poppins", "sans-serif"],
        inter: ["Inter", "sans-serif"],
      },
      colors: {
        warm: {
          bg: "var(--color-bg-warm)",
          card: "var(--color-bg-card)",
          oatmeal: "var(--color-bg-oatmeal)",
          dark: "var(--color-text-dark)",
          muted: "var(--color-text-muted)",
        },
        sage: {
          DEFAULT: "var(--color-sage)",
          light: "var(--color-sage-light)",
        },
        terracotta: {
          DEFAULT: "var(--color-terracotta)",
          light: "var(--color-terracotta-light)",
        },
      },
      animation: {
        fadeIn: 'fadeIn 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards',
        slideUp: 'slideUp 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards',
        slideDown: 'slideDown 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards',
        scaleIn: 'scaleIn 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideDown: {
          '0%': { opacity: '0', transform: 'translateY(-15px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.98)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
      },
    },
    screens: {
      activityP: "880px",
      userP: "820px",
      habitP: "520px",
      galaxyF: "281px",
      moodP: "497px",
      moodE: "400px",
      signup: "380px",
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
    },
  },
  plugins: [],
};
