/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js, jsx, ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primaryLight: "#F9F9F9",
        primaryDark: "#112D4E",
        secondaryLight: "#DBE2EF",
        secondaryDark: "#3F72AF",
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
