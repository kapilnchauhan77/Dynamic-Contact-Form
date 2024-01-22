export default {
    /** @type {import('tailwindcss').Config} */
  content: [
      "./src/**/*.{html,js,jsx,ts,tsx}",
      "./src/*.{tsx,ts,js,jsx}",
      "node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {},
  },
  plugins: [
      require('flowbite/plugin'),
      require('@tailwindcss/forms'),
  ],
}

