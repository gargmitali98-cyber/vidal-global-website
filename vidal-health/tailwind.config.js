/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './content/**/*.{js,ts}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        heading: ['Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        // Vidal Health parent brand system — see DESIGN.md
        brand: {
          DEFAULT: '#007071',
          hover: '#005C5D',
          deep: '#00494A',
          ink: '#012E2F',
          lime: '#72BF44',
          'lime-deep': '#4D9A2A',
        },
        accent: {
          amber: '#F5A623',
          cyan: '#23B5C9',
        },
        surface: {
          base: '#FFFFFF',
          section: '#F3F6F4',
          interactive: '#EEF4F4',
          highlight: '#E8F2F2',
          extralight: '#EFF2F4',
          lightblue: '#CAEDED',
          mint: '#F2F9F4',
        },
        content: {
          primary: '#1F2D2D',
          secondary: '#627272',
        },
        border: {
          soft: '#E6ECEC',
        },
        // Legacy aliases — existing teal-*/navy-* class names keep working
        teal: {
          DEFAULT: '#007071',
          hover: '#005C5D',
          soft: '#E8F2F2',
          muted: '#CAEDED',
        },
        navy: {
          DEFAULT: '#012E2F',
          light: '#033E3F',
          muted: '#0A5253',
        },
        neutral: {
          50: '#F3F6F4',
          100: '#EEF4F4',
          200: '#E6ECEC',
          300: '#CBD5DD',
          400: '#99989B',
          500: '#627272',
          600: '#5E5E5F',
          700: '#2A3440',
          800: '#1A2330',
          900: '#1F2D2D',
        },
      },
      boxShadow: {
        // Near-flat system; cards change border on hover rather than lifting.
        card: '0 1px 2px rgba(1,46,47,0.05)',
        'card-hover': '0 1px 2px rgba(1,46,47,0.05), 0 2px 8px rgba(1,46,47,0.04)',
        dashboard: '0 24px 64px rgba(1,46,47,0.18)',
        teal: '0 8px 24px rgba(0,112,113,0.20)',
      },
      borderRadius: {
        card: '16px',
        icon: '12px',
        chip: '8px',
      },
      letterSpacing: {
        eyebrow: '0.16em',
      },
    },
  },
  plugins: [],
};
