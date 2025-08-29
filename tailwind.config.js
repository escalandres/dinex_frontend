/** @type {import('tailwindcss').Config} */
export default {
    darkMode: 'class', // ← Esto activa el modo oscuro por clase
    content: [
        './index.html',
        './src/**/*.{js,ts,jsx,tsx}',
    ],
    theme: {
        extend: {},
    },
    plugins: [],
}