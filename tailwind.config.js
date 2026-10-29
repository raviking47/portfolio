/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        tokyo: {
          bg: '#07090f',
          surface: '#121520',
          border: '#1e2436',
          text: '#a9b1d6',
          muted: '#7aa2f7',
          pink: '#ff007f',
          cyan: '#00f0ff',
          blue: '#3b82f6',
        }
      },
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
        jetbrains: ['JetBrains Mono', 'monospace'],
        space: ['Space Grotesk', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
