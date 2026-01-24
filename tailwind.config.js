/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: "#5d55e7",
                "indigo-accent": "#4f46e5",
                "background-light": "#f6f6f8",
                "background-dark": "#121121",
                "success": "#10b981",
                "warning": "#f59e0b",
                "danger": "#ef4444",
                "info": "#3b82f6",
                background: 'var(--bg-color, #f8fafc)',
                foreground: 'var(--text-color, #0f172a)',
            },
            fontFamily: {
                "display": ["Inter"],
                sans: ['Inter', 'sans-serif'],
            },
            borderRadius: {
                "DEFAULT": "0.25rem",
                "lg": "0.5rem",
                "xl": "0.75rem",
                "full": "9999px"
            },
        },
    },
    plugins: [],
}
