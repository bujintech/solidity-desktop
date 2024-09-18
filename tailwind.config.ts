/** @type {import('tailwindcss').Config} */
import plugin from 'tailwindcss/plugin';
import { border, colors, radius, shadow, typography } from './renderer/specific/tailwind';

export default {
  content: [
    './index.html',
    './renderer/**/*.{js,ts,jsx,tsx}',
    './node_modules/@cyberutopian/components/**/*.{js,ts,jsx,tsx,mdx,html}',
  ],
  theme: {
    extend: {},
    colors,
  },
  corePlugins: {
    preflight: false,
  },
  plugins: [
    plugin(function ({ addComponents, addBase }) {
      addComponents(typography);
      addComponents(radius);
      addComponents(shadow);
      addComponents(border);

      addBase({
        'input:-webkit-autofill': {
          '-webkit-box-shadow': '0 0 0px 1000px white inset !important',
          'box-shadow': '0 0 0px 1000px white inset !important',
          '-webkit-text-fill-color': '#000 !important',
        },
        'input:-webkit-autofill:hover': {
          '-webkit-box-shadow': '0 0 0px 1000px white inset !important',
          'box-shadow': '0 0 0px 1000px white inset !important',
          '-webkit-text-fill-color': '#000 !important',
        },
        'input:-webkit-autofill:focus': {
          '-webkit-box-shadow': '0 0 0px 1000px white inset !important',
          'box-shadow': '0 0 0px 1000px white inset !important',
          '-webkit-text-fill-color': '#000 !important',
        },
        'input:-webkit-autofill:active': {
          '-webkit-box-shadow': '0 0 0px 1000px white inset !important',
          'box-shadow': '0 0 0px 1000px white inset !important',
          '-webkit-text-fill-color': '#000 !important',
        },
      });
    }),
  ],
};
