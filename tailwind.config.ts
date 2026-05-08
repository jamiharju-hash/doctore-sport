import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        surface: '#07080A',
        panel: '#0D1117',
        panel2: '#111827',
        border: '#263241',
        muted: '#8B949E',
        accept: '#00E676',
        reject: '#FF4D4D',
        wait: '#F5B544',
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'ui-monospace', 'SFMono-Regular', 'monospace'],
      },
      boxShadow: {
        terminal: '0 0 0 1px rgba(148, 163, 184, 0.14), 0 24px 80px rgba(0, 0, 0, 0.45)',
      },
    },
  },
  plugins: [],
};

export default config;
