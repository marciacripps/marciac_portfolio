/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: [
          'Inter',
          'system-ui',
          '-apple-system',
          'BlinkMacSystemFont',
          'Segoe UI',
          'Roboto',
          'Helvetica Neue',
          'Arial',
          'sans-serif',
        ],
      },
      colors: {
        willow: {
          50: '#f0f7ff',
          100: '#e0f0ff',
          200: '#bae0ff',
          300: '#7cc5ff',
          400: '#36a7ff',
          500: '#0088ff',
          600: '#0066ff',
          700: '#0052cc',
          800: '#0044a3',
          900: '#003380',
        },
      },
      backgroundImage: {
        'willow-pattern': "url('https://images.pexels.com/photos/6847584/pexels-photo-6847584.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')",
      },
      animation: {
        'fade-in': 'fadeIn 0.7s ease-out forwards',
        'pulse': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'bounce': 'bounce 1.5s infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        pulse: {
          '0%, 100%': { opacity: '0.2' },
          '50%': { opacity: '0.3' },
        },
        bounce: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
      spacing: {
        '128': '32rem',
      },
      transitionDuration: {
        '2000': '2000ms',
      },
    },
  },
  plugins: [],
};