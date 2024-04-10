/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{html,js,jsx}"],
    theme: {
        extend: {
            colors: {
                "primary-color": "rgba(var(--primary-color))",
                "secondary-color": "rgba(var(--secondary-color))",
                "background-color": "rgba(var(--background-color))",
                "highlight-color": "rgba(var(--highlight-color))",
                "navbar-color": "rgba(var(--navbar-color))",
                "navbar-text-color": "rgba(var(--navbar-text-color))",
            }
        },
        screens: {
            "xl": "1280px",
            "lg": "1024px",
            "md": "768px",
            "sm": "640px",
            "exsm": "505px"
        }
    },
    plugins: [],
    darkMode: "class"
}

