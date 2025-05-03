/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,vue,ts}',
    './pages/**/*.{vue,js,ts}',
    './layouts/**/*.vue',
    './components/**/*.{vue,js,ts}',
    './plugins/**/*.{js,ts}',
    './nuxt.config.{js,ts}',
  ],
  theme: {
    extend: {
      colors: {
        primary: "#d8b16e",  // 🎨 Dorado puro
        secondary: "#5b3810",  // 🎨 Negro carbón
        accent: "#B8860B",  // 🎨 Oro oscuro
        neutral: "#F5DEB3",  // 🎨 Beige trigo
        dark: "#4A4A4A"  // 🎨 Gris oscuro
      },
    },
  },
  plugins: [],
}
/*
#1
primary: "#FFD700",  // 🎨 Dorado brillante
  secondary: "#8B0000",  // 🎨 Rojo borgoña
  accent: "#FAEBD7",  // 🎨 Blanco antiguo
  neutral: "#2F4F4F",  // 🎨 Gris pizarra
  dark: "#5A3E36"  // 🎨 Marrón chocolate
*/