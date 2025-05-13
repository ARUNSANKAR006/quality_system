// tailwind.config.js
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],

  theme: {
  extend: {
    animation: {
      'float-slow': 'float 10s ease-in-out infinite',
      'float-slower': 'float 16s ease-in-out infinite',
      'spin-slow': 'spin 30s linear infinite',
    },
    keyframes: {
      float: {
        '0%, 100%': { transform: 'translateY(0px)' },
        '50%': { transform: 'translateY(-30px)' },
      },
    },
  },
}

};
