/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: { 
          DEFAULT: 'var(--navy)', 
          deep: 'var(--navy-deep)', 
          surface: 'var(--navy-surface)' 
        },
        gold: { 
          DEFAULT: 'var(--gold)', 
          light: 'var(--gold-light)', 
          muted: '#8B6F2E', 
          pale: '#F5EDD6' 
        },
        cream: { 
          DEFAULT: 'var(--cream)', 
          warm: 'var(--cream-warm)', 
          dim: 'rgba(247,244,239,0.55)' 
        },
        teal: { 
          DEFAULT: 'var(--teal)', 
          dark: '#3A9990' 
        },
        obsidian: '#0D0F14',
      },
      fontFamily: {
        serif: ['var(--font-cormorant)', 'Georgia', 'serif'],
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        accent: ['var(--font-playfair)', 'serif'],
      },
      letterSpacing: {
        'luxury': '0.25em',
        'ultra': '0.4em',
      },
      keyframes: {
        marquee: { '0%': { transform: 'translateX(0)' }, '100%': { transform: 'translateX(-50%)' } },
        twinkle: { '0%,100%': { opacity: '0.2' }, '50%': { opacity: '1' } },
        pulseRing: { '0%,100%': { transform: 'scale(1)', opacity: '0.4' }, '50%': { transform: 'scale(1.02)', opacity: '1' } },
        lensFlare: { '0%': { transform: 'rotate(0deg)' }, '100%': { transform: 'rotate(360deg)' } },
        float: { '0%,100%': { transform: 'translateY(0px)' }, '50%': { transform: 'translateY(-12px)' } },
        shimmer: { '0%': { transform: 'translateX(-100%)' }, '100%': { transform: 'translateX(100%)' } },
      },
      animation: {
        'marquee': 'marquee 30s linear infinite',
        'twinkle': 'twinkle 3s ease-in-out infinite',
        'pulse-ring': 'pulseRing 3s ease-in-out infinite',
        'lens-flare': 'lensFlare 20s linear infinite',
        'float': 'float 6s ease-in-out infinite',
        'shimmer': 'shimmer 2s infinite',
      },
      backdropBlur: { xs: '2px' },
    },
  },
  plugins: [],
};
