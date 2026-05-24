module.exports = {
  content: ['./src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        display:     ['"Cinzel"', 'Georgia', 'serif'],
        decorative:  ['"Cinzel Decorative"', '"Cinzel"', 'Georgia', 'serif'],
        body:        ['"EB Garamond"', 'Georgia', 'serif'],
        mono:        ['"Courier Prime"', 'Courier', 'monospace'],
      },
      colors: {
        parchment: {
          50:  '#fdf8ef',
          100: '#f7ecd6',
          200: '#edd9b0',
          300: '#e0c080',
          400: '#d4a44c',
          500: '#c4882a',
          600: '#a86e1f',
          700: '#865419',
          800: '#6a3f14',
          900: '#4d2e0e',
        },
        ink: {
          50:  '#f2ede3',
          100: '#ddd3c0',
          200: '#c4b498',
          300: '#a9926d',
          400: '#8c7047',
          500: '#6e5024',
          600: '#503a18',
          700: '#38270f',
          800: '#221709',
          900: '#120c04',
        },
        compass: {
          500: '#8b3a1a',
          600: '#6f2c12',
          700: '#53200d',
        },
        ocean: {
          500: '#2a5c6e',
          600: '#1e4455',
          700: '#132f3d',
        },
        aged: {
          50:  '#faf5e8',
          100: '#f0e6c4',
          200: '#e3d09a',
          300: '#ceb56e',
          400: '#b8954a',
          500: '#9a762f',
          600: '#7a5c22',
          700: '#5c4318',
        }
      },
      backgroundImage: {
        'parchment-texture': "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='400'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='400' height='400' filter='url(%23noise)' opacity='0.08'/%3E%3C/svg%3E\")",
      },
      borderRadius: {
        'sm':  '3px',
        DEFAULT: '4px',
        'md':  '6px',
        'lg':  '8px',
        'xl':  '12px',
        '2xl': '16px',
      },
      boxShadow: {
        'parchment': '0 2px 8px rgba(74,46,14,0.15), 0 1px 3px rgba(74,46,14,0.1)',
        'parchment-lg': '0 8px 32px rgba(74,46,14,0.2), 0 2px 8px rgba(74,46,14,0.12)',
        'inset-aged': 'inset 0 1px 3px rgba(74,46,14,0.08)',
        'compass': '0 0 0 1px rgba(139,58,26,0.3), 0 4px 16px rgba(139,58,26,0.15)',
      },
      keyframes: {
        shimmer:  { '0%': { backgroundPosition: '200% 0' }, '100%': { backgroundPosition: '-200% 0' } },
        fadeUp:   { from: { opacity: '0', transform: 'translateY(12px)' }, to: { opacity: '1', transform: 'translateY(0)' } },
        spin:     { from: { transform: 'rotate(0deg)' }, to: { transform: 'rotate(360deg)' } },
        compassSpin: { from: { transform: 'rotate(0deg)' }, to: { transform: 'rotate(360deg)' } },
        flicker:  { '0%, 100%': { opacity: '1' }, '50%': { opacity: '0.85' } },
        mapReveal: { from: { opacity: '0', clipPath: 'inset(0 100% 0 0)' }, to: { opacity: '1', clipPath: 'inset(0 0% 0 0)' } },
      },
      animation: {
        shimmer: 'shimmer 2s infinite',
        fadeUp:  'fadeUp 0.45s cubic-bezier(0.22, 1, 0.36, 1) forwards',
        compassSpin: 'compassSpin 20s linear infinite',
        flicker: 'flicker 3s ease-in-out infinite',
        mapReveal: 'mapReveal 0.8s cubic-bezier(0.22, 1, 0.36, 1) forwards',
      }
    }
  },
  plugins: []
}
