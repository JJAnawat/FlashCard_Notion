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
        'grayish-white': '#EEEEEE'
      }
    },
  },
  plugins: [],
} satisfies Config;
