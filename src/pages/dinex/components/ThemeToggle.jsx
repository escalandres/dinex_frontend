import { useEffect, useState } from "react";

export const ThemeToggle = () => {
    const [isDark, setIsDark] = useState(() => {
        const themeGuardado = localStorage.theme;
        if (themeGuardado) return themeGuardado === "dark";
        document.documentElement.style.colorScheme = themeGuardado;
        return window.matchMedia("(prefers-color-scheme: dark)").matches;
    });

    useEffect(() => {
        document.documentElement.classList.toggle("dark", isDark);
        localStorage.theme = isDark ? "dark" : "light";
        document.documentElement.style.colorScheme = isDark ? "dark" : "light";
    }, [isDark]);

    const toggleTheme = () => setIsDark(prev => !prev);

    return (
        <div className="flex items-center gap-4 mt-4">
        <label className="inline-flex items-center cursor-pointer">
            <input
            type="checkbox"
            checked={isDark}
            onChange={toggleTheme}
            className="sr-only"
            />
            <div className="relative w-11 h-6 bg-gray-200 rounded-full dark:bg-gray-700 transition-colors duration-300 ease-in-out">
            <div
                className={`absolute top-[2px] left-[2px] w-5 h-5 bg-white border border-gray-300 rounded-full flex items-center justify-center text-xs transition-all duration-300 ease-in-out ${
                isDark ? "translate-x-full" : ""
                } dark:border-gray-600`}
            >
                {isDark ? (
                <span className="text-white">🌙</span>
                ) : (
                <span className="text-yellow-500">☀️</span>
                )}
            </div>
            </div>
            <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">
            Tema: {isDark ? "dark" : "light"}
            </span>
        </label>
        </div>
    );
};