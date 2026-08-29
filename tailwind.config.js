/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,jsx,mdx}',
    './src/components/**/*.{js,jsx,mdx}',
    './src/app/**/*.{js,jsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Enhanced dual identity color system
        primary: {
          gold: '#D4AF37',
          'gold-light': '#E4BF47',
          'gold-dark': '#B8991F',
          DEFAULT: '#D4AF37',
        },
        'primary-gold': '#D4AF37',
        'primary-gold-light': '#E4BF47',
        'primary-gold-dark': '#B8991F',
        
        // Professional brand colors
        professional: {
          blue: '#1E40AF',
          'blue-light': '#3B82F6',
          'blue-dark': '#1E3A8A',
          navy: '#0F172A',
          slate: '#334155',
          silver: '#94A3B8',
        },
        
        // Music ministry brand colors
        ministry: {
          gold: '#D4AF37',
          burgundy: '#800020',
          crimson: '#B22222',
          royal: '#4169E1',
          ivory: '#FFFFF0',
        },
        
        accent: {
          red: '#B22222',
          'red-light': '#C23232',
          'red-dark': '#921212',
          DEFAULT: '#B22222',
        },
        'accent-red': '#B22222',
        'accent-red-light': '#C23232',
        'accent-red-dark': '#921212',
        
        tech: {
          teal: '#008080',
          'teal-light': '#109090',
          'teal-dark': '#006060',
          DEFAULT: '#008080',
        },
        'tech-teal': '#008080',
        'tech-teal-light': '#109090',
        'tech-teal-dark': '#006060',
        
        background: {
          dark: '#0F172A',
          light: '#F5F5DC',
          professional: '#FFFFFF',
          ministry: '#FFFFF0',
          DEFAULT: '#0F172A',
        },
        
        text: {
          primary: '#FFFFFF',
          secondary: '#D1D5DB',
          tertiary: '#6B7280',
        },
      },
      fontFamily: {
        // Enhanced typography system for dual identity
        heading: ['Montserrat', 'system-ui', 'sans-serif'],
        body: ['Open Sans', 'system-ui', 'sans-serif'],
        nav: ['Raleway', 'system-ui', 'sans-serif'],
        quote: ['Playfair Display', 'Georgia', 'serif'],
        code: ['JetBrains Mono', 'Monaco', 'monospace'],
        
        // Professional brand typography
        professional: ['Inter', 'system-ui', 'sans-serif'],
        'professional-heading': ['Poppins', 'system-ui', 'sans-serif'],
        
        // Ministry brand typography
        ministry: ['Crimson Text', 'Georgia', 'serif'],
        'ministry-script': ['Dancing Script', 'cursive'],
      },
      fontSize: {
        'xs': ['12px', { lineHeight: '16px', letterSpacing: '0.025em' }],
        'sm': ['14px', { lineHeight: '20px', letterSpacing: '0.025em' }],
        'base': ['16px', { lineHeight: '24px', letterSpacing: '0' }],
        'lg': ['18px', { lineHeight: '28px', letterSpacing: '0' }],
        'xl': ['20px', { lineHeight: '28px', letterSpacing: '0' }],
        '2xl': ['24px', { lineHeight: '32px', letterSpacing: '-0.025em' }],
        '3xl': ['30px', { lineHeight: '36px', letterSpacing: '-0.025em' }],
        '4xl': ['36px', { lineHeight: '40px', letterSpacing: '-0.025em' }],
        '5xl': ['48px', { lineHeight: '52px', letterSpacing: '-0.025em' }],
        '6xl': ['60px', { lineHeight: '64px', letterSpacing: '-0.025em' }],
        '7xl': ['72px', { lineHeight: '76px', letterSpacing: '-0.025em' }],
        '8xl': ['96px', { lineHeight: '100px', letterSpacing: '-0.025em' }],
        '9xl': ['128px', { lineHeight: '132px', letterSpacing: '-0.025em' }],
      },
      spacing: {
        '0.5': '2px',
        '1.5': '6px',
        '2.5': '10px',
        '3.5': '14px',
        xs: '8px',
        sm: '16px',
        md: '24px',
        lg: '32px',
        xl: '40px',
        '2xl': '48px',
        '3xl': '56px',
        '4xl': '64px',
        '5xl': '80px',
        '6xl': '96px',
      },
      borderRadius: {
        none: '0px',
        sm: '4px',
        md: '8px',
        lg: '12px',
        xl: '16px',
        '2xl': '24px',
        '3xl': '32px',
        full: '9999px',
      },
      boxShadow: {
        sm: '0 1px 2px rgba(0, 0, 0, 0.05)',
        md: '0 4px 6px rgba(0, 0, 0, 0.1)',
        lg: '0 10px 15px rgba(0, 0, 0, 0.1)',
        xl: '0 20px 25px rgba(0, 0, 0, 0.1)',
        '2xl': '0 25px 50px rgba(0, 0, 0, 0.25)',
        'gold': '0 4px 20px rgba(212, 175, 55, 0.4)',
        'gold-lg': '0 10px 30px rgba(212, 175, 55, 0.5)',
        'ministry': '0 4px 20px rgba(128, 0, 32, 0.3)',
        'professional': '0 4px 20px rgba(30, 64, 175, 0.2)',
      },
      animation: {
        'fadeIn': 'fadeIn 0.6s ease-out forwards',
        'slideUp': 'slideUp 0.4s ease-out forwards',
        'slideDown': 'slideDown 0.4s ease-out forwards',
        'slideLeft': 'slideLeft 0.4s ease-out forwards',
        'slideRight': 'slideRight 0.4s ease-out forwards',
        'scaleIn': 'scaleIn 0.3s ease-out forwards',
        'rotateIn': 'rotateIn 0.5s ease-out forwards',
        'bounce-gentle': 'bounceGentle 2s ease-in-out infinite',
        'pulse-gold': 'pulseGold 2s ease-in-out infinite',
        'gradient': 'gradient 3s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(100%)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideDown: {
          '0%': { opacity: '0', transform: 'translateY(-100%)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideLeft: {
          '0%': { opacity: '0', transform: 'translateX(100%)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        slideRight: {
          '0%': { opacity: '0', transform: 'translateX(-100%)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.8)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        rotateIn: {
          '0%': { opacity: '0', transform: 'rotate(-180deg) scale(0.8)' },
          '100%': { opacity: '1', transform: 'rotate(0deg) scale(1)' },
        },
        bounceGentle: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        pulseGold: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(212, 175, 55, 0.4)' },
          '50%': { boxShadow: '0 0 40px rgba(212, 175, 55, 0.8)' },
        },
        gradient: {
          '0%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' },
        },
      },
    },
  },
  plugins: [],
  darkMode: 'class',
};