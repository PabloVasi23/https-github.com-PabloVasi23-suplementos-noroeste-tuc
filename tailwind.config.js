
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        orbitron: ['Orbitron', 'sans-serif'],
      },
      colors: {
        primary: {
          DEFAULT: '#DFFF00', // Electric Lime
          hover: '#CCFF00',
        },
        dark: {
          bg: '#050505',
          card: '#121212',
          border: '#222222',
          muted: '#71717a',
        }
      }
    }
  },
  plugins: [],
}
