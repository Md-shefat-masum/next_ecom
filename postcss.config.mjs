const config = {
  plugins: {
    "@tailwindcss/postcss": {},
  },
  // Enable source maps in development
  map: process.env.NODE_ENV === 'development' ? { inline: false } : false,
};

export default config;
