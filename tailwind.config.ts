
import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary-purple': '#9b87f5',
        'soft-purple': '#E5DEFF',
        'neutral-gray': '#8E9196',
      },
    },
  },
  plugins: [],
}

export default config
