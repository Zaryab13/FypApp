/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      height: {
        custom: "calc(100vh - 80px)",
      },
      width: {
        custom: "calc(100% - 200px)",
      },
      fontFamily: {
        primary: ["Roboto"],
      },
      colors: {
        primary: "#4169E1",
        secondary: "#06b6d4",
        tertiary: "#f7f9fd",
        Accent: "#06b6d4",
      },
      backgroundImage: {
        login: "url(./src/assets/loginImg.jpg)",
      },
    },
  },
  plugins: [],
};
