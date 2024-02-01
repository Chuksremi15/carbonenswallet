module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      spacing: {
        128: "32rem",
        144: "36rem",
      },
      colors: {
        primary: "#8759F2",
        cardbg: "#f2efff",
        primaryDisabled: "#d7d0ff",
        textPrimary: "#4c11d5",
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
