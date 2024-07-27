import { type Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";

export default {
  content: ["./src/**/*.tsx"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-geist-sans)", ...fontFamily.sans],
        poppins: ['Poppins', ...fontFamily.sans]
      },
      colors: {
        'dark-gray': '#222831',
        'light-gray': '#31363F',
        'light-cyan': '#76ABAE',
        'light-green': '#76ae83',
        'light-red': '#ae7676',
        'grayish-white': '#EEEEEE'
      }
    },
  },
  plugins: [],
} satisfies Config;
