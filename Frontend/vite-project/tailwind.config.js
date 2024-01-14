/** @type {import('tailwindcss').Config} */
const withMT = require("@material-tailwind/react/utils/withMT");
 
module.exports = withMT({
  content: [ "./src/**/*.{js,jsx,ts,tsx}",
  "./node_modules/tw-elements/dist/js/**/*.js",
  "./src/routes/**/*.{js,jsx,ts,tsx}",
  ".src/components/**/*.{js,jsx,ts,tsx}",
  "./src/main.jsx",
  "./index.html",
  'node_modules/flowbite-react/lib/esm/**/*.js',
  "./index.html", 
  "./src/**/*.{vue,js,ts,jsx,tsx}",
],
  theme: {
    extend: {},
  },
  plugins: [require('flowbite/plugin'),],
});