/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary1: '#FFF8F3',  // Light cream background
        primary2: '#F5EBE0',  // Soft beige
        primary3: '#E3D5CA',  // Warm taupe
        primary4: '#9B6B4D',  // Rich brown
        primary5: '#340a10',  // Deep burgundy
      },
    },
  },
  plugins: [],
}
