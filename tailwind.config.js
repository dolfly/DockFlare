/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./templates/**/*.html",
  ],
  darkMode: 'class',
  theme: {
    extend: {},
  },
  plugins: [
    require("daisyui"),
  ],
  daisyui: {
    themes: ["light", "dark"], // Or your preferred themes: true for all, or specific ones
    // styled: true,         // include daisyUI component styling (default)
    // base: true,           // include daisyUI base styling (default)
    // utils: true,          // include daisyUI utility classes (default)
    // logs: true,           // Show logs (default)
    // prefix: "dui-",       // Optional prefix for daisyUI classnames
  },
}