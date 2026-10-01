/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        canvas: '#F7F9FC',
        dark: {
          900: '#071426',
          800: '#0D1E36',
          700: '#162C4C',
        },
        brand: {
          primary: '#145BFF',
          secondary: '#3278FF',
          light: '#EAF1FF',
          hover: '#0E4BE3',
        },
        slate: {
          text: '#101828',
          muted: '#667085',
          border: 'rgba(16, 24, 40, 0.10)',
          card: '#FFFFFF',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        heading: ['Manrope', 'system-ui', 'sans-serif'],
      },
      maxWidth: {
        'content': '1320px',
      },
      boxShadow: {
        'card': '0 4px 20px -2px rgba(16, 24, 40, 0.05), 0 2px 6px -1px rgba(16, 24, 40, 0.03)',
        'card-hover': '0 12px 32px -4px rgba(16, 24, 40, 0.08), 0 4px 12px -2px rgba(16, 24, 40, 0.04)',
        'nav': '0 4px 24px 0 rgba(7, 20, 38, 0.06)',
      },
      animation: {
        'pulse-subtle': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      }
    },
  },
  plugins: [],
}
