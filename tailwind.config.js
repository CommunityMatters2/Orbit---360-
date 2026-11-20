/** @type {import('tailwindcss').Config} */
const v = (name) => `rgb(var(--${name}) / <alpha-value>)`

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        paper: v('paper'),
        surface: v('surface'),
        ink: v('ink'),
        muted: v('muted'),
        line: v('line'),
        blue: v('a-blue'),
        green: v('a-green'),
        orange: v('a-orange'),
        gold: v('a-gold'),
        plum: v('a-plum'),
        teal: v('a-teal'),
        pink: v('a-pink'),
      },
      fontFamily: {
        display: ['Unbounded', '"Arial Black"', 'system-ui', 'sans-serif'],
        sans: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      maxWidth: { site: '1280px' },
    },
  },
  plugins: [],
}
