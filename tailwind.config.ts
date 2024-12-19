import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./views/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      sans: [
        '"Inter var", sans-serif',
        {
          fontFeatureSettings: '"cv11", "ss01"',
          fontVariationSettings: '"opsz" 32',
        },
      ],
    },
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },

      screens: {
        xs: "280px",
        sm: "375px",
        md: "768px",
        lg: "976px",
        xlg: "1200px",
        xl: "1440px",
        ds: "1920px",
        dm: "2480px",
        dl: "2700px",
      },
      boxShadow: {
        "3xl": "0px 4px 10px rgba(0, 0, 0, 0.08)",
        sum: "0px 2px 4px 0px rgba(0, 0, 0, 0.08)",
        premium: "3px -2px 8px 0px rgba(0, 0, 0, 0.08)",
        "4xl": "0px 2.73377px 5.46753px rgba(0, 0, 0, 0.16)",
      },
      colors: {
        transparent: "transparent",
        current: "currentColor",
        white: {
          light: "#101828",
          DEFAULT: "#FFFFFF",
          dark: "#101828",
        },
        primaryBlue: {
          DEFAULT: "#4055F1",
          hover: "#3A4DD9",
        },
        blue: {
          DEFAULT: "#46A2FF",
        },
        black: {
          DEFAULT: "#000000",
        },
        gray: {
          light: "#F5F5F5",
          DEFAULT: "#98A2B3",
          dark: "#727A86",
          darker: "#35393F",
        },
        background: {
          DEFAULT: "#98A2B3",
        },
        error: {
          DEFAULT: "#D42620",
        },
        warning: {
          DEFAULT: "#F3A218",
        },
        success: {
          DEFAULT: "#099137",
        },
      },
    },
    listStyleType: {
      none: "none",
      disc: "disc",
      decimal: "decimal",
      square: "square",
      roman: "upper-roman",
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
export default config;
