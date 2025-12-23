/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Divine/Heaven
        divine: {
          gold: '#FFD700',
          white: '#F5F5DC',
          blue: '#87CEEB',
        },
        // Mortal/Spartan
        spartan: {
          bronze: '#CD7F32',
          crimson: '#8B0000',
          marble: '#FAF0E6',
        },
        // Hell/Infernal
        hell: {
          red: '#8B0000',
          obsidian: '#1A1A1A',
          ember: '#FF4500',
        },
        // Card Types
        card: {
          attack: '#8B0000',
          defense: '#4682B4',
          forge: '#FF4500',
          hybrid: '#6A0DAD',
          power: '#FFD700',
          curse: '#0D0D0D',
        },
        // Rarity
        rarity: {
          common: '#808080',
          uncommon: '#32CD32',
          rare: '#1E90FF',
          legendary: '#FFD700',
        },
      },
      fontFamily: {
        pixel: ['"Press Start 2P"', 'monospace'],
        greek: ['Cinzel', 'serif'],
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 3s ease-in-out infinite',
        'shake': 'shake 0.5s ease-in-out',
        'glow': 'glow 2s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        shake: {
          '0%, 100%': { transform: 'translateX(0)' },
          '25%': { transform: 'translateX(-5px)' },
          '75%': { transform: 'translateX(5px)' },
        },
        glow: {
          '0%, 100%': { boxShadow: '0 0 5px currentColor' },
          '50%': { boxShadow: '0 0 20px currentColor' },
        },
      },
    },
  },
  plugins: [],
}
