/** @type {import('tailwindcss').Config} */

export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}","./src/**/*.{html,js}","./node_modules/tw-elements/dist/js/**/*.js","node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    container: {
      center: true,
      padding: '16',
    },
    extend: {
      colors: {
        primary: '#f97316',
        secondary: '#a1a1aa',
        dark: '#212121',
        bckcolor:'#ffeede'
      },
      screens: {
        '2xl': '1320px',
      },
      backgroundImage: {
        heropattern: "url('dist/asset/login/background-login.jpg')",
      }
    },
  },
  darkMode: "class",
plugins: []
}

