/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./**/*.{html,js}"],
  theme: {
    extend: {
      fontFamily: {
        heading: ["Raleway", "ui-sans-serif", "system-ui", "sans-serif"],
        subhead: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
        body: ["Barlow", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      height: { "screen-minus-header": "calc(100svh - 80px)" },
      spacing: { "44p": "44%" },
      boxShadow: { "custom-card": "0 4px 16px rgba(26,26,26,0.14)" },
      textShadow: {
        sm: "1px 1px 2px rgba(0,0,0,0.4)",
        DEFAULT: "0 2px 8px rgba(0,0,0,0.9), 0 4px 14px rgba(0,0,0,0.8)",
        lg: "3px 3px 6px rgba(0,0,0,0.6)",
      },
    },
  },
  plugins: [
    function ({ matchUtilities, theme }) {
      matchUtilities(
        { "text-shadow": (v) => ({ textShadow: v }) },
        { values: theme("textShadow") }
      );
    },
  ],
};
