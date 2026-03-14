/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ['Spline Sans', 'sans-serif'],
        sans: ['Inter', 'sans-serif'],
      },
      colors: {
        brand: {
          yellow:  '#f2ad0d', /* Stonkpop Primary */
          orange:  '#FF6B35',
          green:   '#06D6A0',
          blue:    '#118AB2',
          purple:  '#7B5EA7',
          pink:    '#FF6B9D',
        },
        stonkpop: {
          light: '#f8f7f5',
          dark: '#221d10'
        }
      },
      boxShadow: {
        clay: '6px 6px 0px 0px rgba(0,0,0,0.18)',
        'clay-sm': '3px 3px 0px 0px rgba(0,0,0,0.15)',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%':      { transform: 'translateY(-8px)' },
        },
        pulse_glow: {
          '0%, 100%': { boxShadow: '0 0 12px 4px rgba(255,214,10,0.5)' },
          '50%':      { boxShadow: '0 0 24px 8px rgba(255,107,53,0.6)' },
        },
        wiggle: {
          '0%, 100%': { transform: 'rotate(-3deg)' },
          '50%':      { transform: 'rotate(3deg)' },
        },
        pop_in: {
          '0%':   { transform: 'scale(0.7)', opacity: 0 },
          '70%':  { transform: 'scale(1.08)' },
          '100%': { transform: 'scale(1)', opacity: 1 },
        },
      },
      animation: {
        float:      'float 3s ease-in-out infinite',
        pulse_glow: 'pulse_glow 2s ease-in-out infinite',
        wiggle:     'wiggle 1s ease-in-out infinite',
        pop_in:     'pop_in 0.4s cubic-bezier(.36,.07,.19,.97) both',
      },
    },
  },
  plugins: [],
}
