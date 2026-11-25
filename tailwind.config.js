/** @type {import('tailwindcss').Config} */
// Every colour is sampled from the Dandy Dog logo (_fb-pack/images/profile.jpg).
module.exports = {
  content: ['./*.html', './assets/js/**/*.js'],
  theme: {
    extend: {
      colors: {
        // ink – the black scottie in the logo (#010101), tinted a touch toward the logo cyan so it never reads as flat black
        ink: { DEFAULT: '#0e1a20', soft: '#3b4c55', faint: '#66777f' },
        // action – the logo's "Dandy Dog" script cyan (#08acea) taken darker in OKLCH so white text passes 4.5:1. Reserved for Call, Book and links.
        action: { DEFAULT: '#076d99', dark: '#05557a', light: '#e3f3fa' },
        // splash – the script cyan itself and the water drops (#08acea / #4ab6d8). Illustrations, drops and markers only, never text.
        splash: { DEFAULT: '#08acea', soft: '#4ab6d8', 100: '#d9f1fa', 50: '#eef9fc' },
        // highlight – the lime watering can (#d7de24). Stickers, the puppy band, small markers. Ink text on it.
        highlight: { DEFAULT: '#d4dc2a', soft: '#e8ed8c', 100: '#f4f6cf' },
        // accent – the scottie's red tongue. Used very rarely.
        accent: { DEFAULT: '#e2332b' },
        // surface – the pale aqua in the logo (#c8f5f9) washed right out for page grounds
        surface: { DEFAULT: '#f2fafb', deep: '#e4f4f7', card: '#fbfefe' },
      },
      fontFamily: {
        // Gluten: soft, wet, rounded letterforms with a slant axis, picked to sit next to the logo's brush script
        display: ['"Gluten Variable"', '"Arial Rounded MT Bold"', 'system-ui', 'sans-serif'],
        // Atkinson Hyperlegible Next: calm, very readable body face with open shapes
        sans: ['"Atkinson Hyperlegible Next Variable"', 'system-ui', '-apple-system', '"Segoe UI"', 'sans-serif'],
      },
      maxWidth: { site: '78rem' },
      boxShadow: {
        lift: '0 2px 3px rgba(14,26,32,.06), 0 18px 40px -18px rgba(14,26,32,.35)',
        press: '0 1px 0 rgba(14,26,32,.25)',
      },
    },
  },
  plugins: [],
};
