module.exports = {
  darkMode: "class",
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#1B3C53",
        secondary: {
          light: "#9BA1A6",
          dark: "#BFC5C8",
        },
        background: {
          light: "#FDF6ED",
          dark: "#121212",
        },
        textInput: {
          light: "#F1F1F1",
          dark: "#1E1E1E",
        },
        button: {
          light: "#456882",
          dark: "#2E86C1",
        },
        selection: {
          light: "#CFECF3",
          dark: "#1F3A5F",
        },
        text: {
          light: "#333333",
          dark: "#F5F5F5",
        },
        midGray: {
          light: "#666666",
          dark: "#A0A0A0",
        },
        yellow: "#f1c40f",
        red: "#ef0827",
        green: "#2ecc71",
        gray: "#cccccc",
        choco: {
          light: "#433530",
          dark: "#7B5E57",
        },
        savoy: {
          light: "#6A4E37",
          dark: "#A67C52",
        },
        blue: {
          light: "#0047AB",
          dark: "#4A90E2",
        },
      },
    },
  },
  plugins: [],
};