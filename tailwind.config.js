/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      "./src/**/*.{js,ts,jsx,tsx}",
    ],
      theme: {
    extend: {
      fontFamily: {
        'sans': ['Inter', 'Noto Sans KR', 'system-ui', 'sans-serif'],
        'display': ['Poppins', 'Inter', 'system-ui', 'sans-serif'],
        'body': ['Source Sans Pro', 'Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
    plugins: [],
  }