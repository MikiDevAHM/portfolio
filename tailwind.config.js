/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./app.vue",
    "./error.vue"
  ],
  theme: {
    extend: {
      colors: {
        'shindo-dark': '#1A142E',
        'shindo-darker': '#0F0A1F',
        'shindo-light': '#2A1F3E',
        'shindo-purple': '#8B5CF6',
        'shindo-purple-dark': '#6D28D9',
        'shindo-green': '#34D399',
        'shindo-text': '#E0E0E0',
        'shindo-text-light': '#FFFFFF',
        'shindo-text-dim': '#9CA3AF',
      },
      fontFamily: {
        'sans': ['Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'slide-up': 'slideUp 0.5s ease-out',
        'fade-in': 'fadeIn 0.5s ease-in',
      },
      keyframes: {
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}

