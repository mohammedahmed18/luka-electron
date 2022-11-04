/** @type {import('tailwindcss').Config} */
module.exports = {
   content: ['./packages/renderer/**/*.{js,ts,jsx,tsx}'],
   darkMode: 'class',
   plugins: [require('tailwindcss-rtl')]
}
