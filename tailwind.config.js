module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      spacing: {
        128: "32rem",
        144: "36rem",
      },
      colors: {
        primary: "#4C4AA1",
        cardbg: "#f2efff",
        primaryDisabled: "#BFBEDF",
        textPrimary: "#373583",
        textLight: "#807DC0",
        bggray: "#F8F8F8",
      },
      fontFamily: {
        head: "Inter, sans-serif", //font-heading
        body: "SF UI Text, sans-serif", //font-heading
      },
    },
  },
  plugins: [],
};
