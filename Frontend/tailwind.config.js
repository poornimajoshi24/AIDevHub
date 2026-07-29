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
        background: '#07090e',
        surface: {
          50: '#141824',
          100: '#1c2235',
          200: '#262e45',
          300: '#343f5e',
        },
        border: 'rgba(255, 255, 255, 0.08)',
        glow: {
          purple: '#8b5cf6',
          cyan: '#06b6d4',
          blue: '#3b82f6',
          pink: '#ec4899',
          emerald: '#10b981',
          amber: '#f59e0b'
        }
      },
      fontFamily: {
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace']
      },
      backdropBlur: {
        xs: '2px',
        xl: '20px',
        '2xl': '40px'
      },
      boxShadow: {
        'glow-purple': '0 0 35px -5px rgba(139, 92, 246, 0.3)',
        'glow-cyan': '0 0 35px -5px rgba(6, 182, 212, 0.3)',
        'glow-blue': '0 0 35px -5px rgba(59, 130, 246, 0.3)',
        'glow-emerald': '0 0 35px -5px rgba(16, 185, 129, 0.3)',
        'glass': '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
        'stripe': '0 13px 27px -5px rgba(50,50,93,0.25), 0 8px 16px -8px rgba(0,0,0,0.3)'
      },
      animation: {
        'pulse-glow': 'pulseGlow 4s ease-in-out infinite',
        'gradient-shift': 'gradientShift 8s ease infinite',
        'float': 'float 6s ease-in-out infinite',
        'spin-slow': 'spin 12s linear infinite',
        'shimmer': 'shimmer 2.5s linear infinite'
      },
      keyframes: {
        pulseGlow: {
          '0%, 100%': { opacity: '0.4', transform: 'scale(1)' },
          '50%': { opacity: '0.8', transform: 'scale(1.05)' }
        },
        gradientShift: {
          '0%, 100%': { 'background-position': '0% 50%' },
          '50%': { 'background-position': '100% 50%' }
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' }
        },
        shimmer: {
          '100%': { transform: 'translateX(100%)' }
        }
      }
    },
  },
  plugins: [],
}
