/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        heading: ['Orbitron', 'sans-serif'],
        body: ['Poppins', 'sans-serif'],
      },
      colors: {
        background: '#0b0b0b',
        foreground: '#f8fafc',
        dark: {
          DEFAULT: '#0b0b0b',
          lighter: '#1a1a1a',
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}