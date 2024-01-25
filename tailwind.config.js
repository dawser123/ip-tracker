/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        imgDesktop: "url(assets/imgDesktop.png)",
        imgMobile: "url(assets/imgMobile.png)",
      },
      fontFamily: {
        sans: ["Rubik", "sans"],
      },
      screens: {
        sm: "480px",
        m: "640px",
        md: "766px",
        lg: "992px",
        xl: "1440px",
      },
      colors: {
        veryDarkGray: "hsl(0, 0%, 17%)",
        darkGray: "hsl(0, 0%, 59%)",
      },
    },
  },
  plugins: [],
};
