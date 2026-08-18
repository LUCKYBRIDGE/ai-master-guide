/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        brand: {
          openai: '#10a37f',
          google: '#4285f4',
          gemini: '#1a73e8',
          antigravity: '#8ab4f8',
          claude: '#d97706',
          anthropic: '#cc6b49',
          grok: '#1da1f2',
          xai: '#ffffff',
        }
      }
    },
  },
  plugins: [],
}
