export default {
    content: ["./src/**/*.{js,jsx,ts,tsx}"],
    theme: {
        extend: {
            screens: {
                "3xl": "1820px",
            },
            colors: {
                background: "#282A2B",
                customRed: "#FE3439",
            },
            fontFamily: {
                sans: ["Helvetica", "Arial", "sans-serif"],
            },
        },
    },
    plugins: [],
};
