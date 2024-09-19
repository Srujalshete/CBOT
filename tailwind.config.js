const { flattenColorPalette } = require('tailwindcss/lib/util/flattenColorPalette');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {},
  },
  plugins: [addVariablesForColors],
};

function addVariablesForColors({ addBase, theme }) {
  const colors = theme('colors');
  const colorVariables = Object.entries(colors).reduce((vars, [key, value]) => {
    if (typeof value === 'object') {
      Object.entries(value).forEach(([subKey, subValue]) => {
        vars[`--${key}-${subKey}`] = subValue;
      });
    } else {
      vars[`--${key}`] = value;
    }
    return vars;
  }, {});

  addBase({
    ':root': colorVariables,
  });
}