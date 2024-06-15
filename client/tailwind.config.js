/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js, jsx, ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primaryLight: "#FDFDFD",
        primaryDark: "#112D4E",
        secondaryLight: "#DBE2EF",
        secondaryDark: "#3F72AF",
        light: {
          100: "#FDFDFD",
          200: "#f5f5f5",
          300: "#D9dbe1",
          400: "#b0bcc4",
          500: "#879ea5",
          600: "#618281",
          700: "#43655a",
        },
        dark: {
          100: "#bdd1fc",
          200: "#90a4cd",
          300: "#657aa1",
          400: "#3c5276",
          500: "#112d4e",
          600: "#0b1d32",
        },
      },
    },
    plugins: [],
    variants: {
      extend: {
        scale: ["active"],
        animate: ["active"],
      },
    },
  },
};
