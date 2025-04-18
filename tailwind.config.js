/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");

export default {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./views/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./app.vue",
    "./error.vue",
  ],
  safelist: [
    {
      pattern: /(bg|text)-alert./,
    },
  ],
  theme: {
    colors: {
      transparent: "transparent",
      white: "#FFFFFF",
      black: "#01091D",
      base: {
        green: "#008000",
        gray: {
          DEFAULT: "#626266",
          light: "#A3A3A9",
          100: "#f2f2f2",
          200: "#e5e5e5",
          300: "#d8d8d8",
        },
      },
      green: {
        100: "#00ff00",
        200: "#00e500",
        300: "#00cc00",
        400: "#00b200",
        500: "#009900",
        600: "#007f00",
        700: "#006600",
        800: "#004c00",
      },
      blue: {
        100: "#022D82",
        200: "#02266F",
        300: "#021F5B",
        400: "#011641",
        500: "#010D27",
      },
      tint: {
        100: "#00ff00",
        200: "#19ff19",
        300: "#32ff32",
        400: "#4cff4c",
        500: "#66ff66",
        600: "#7fff7f",
        600: "#99ff99",
        600: "#b2ffb2",
        600: "#ccffcc",
      },
      alert: {
        info: {
          bg: "#87cefa",
          text: "#0000ff",
          icon: "#0000ff",
        },
        danger: {
          bg: "#FECACA",
          text: "#991B1B",
          icon: "#991B1B",
        },
        success: {
          bg: "#98ff98",
          text: "#006400",
          icon: "#006400",
        },
        warning: {
          bg: "#fcffa4",
          text: "#f5c71a",
          icon: "#f5c71a",
        },
      },
      error: {
        100: "#FEF2F2",
        200: "#FECACA",
        300: "#F87171",
        400: "#DC2626",
        500: "#991B1B",
      },
      success: {
        100: "#ECFDF5",
        200: "#A7F3D0",
        300: "#34D399",
        400: "#059669",
        500: "#065F46",
      },
    },
    extend: {
      fontFamily: {
        sans: ["Inter", ...defaultTheme.fontFamily.sans],
        display: ["Work Sans", ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [],
};
