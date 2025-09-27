import { useEffect } from 'react'
import { RouterProvider } from "react-router-dom";
import Loader from '@pages/components/Loader';
import Router from '@components/Router';
// import i18n from "i18next";
import i18n from "@translations/index";
import './App.css'

function App() {
  useEffect(() => {
    let themeStored = localStorage.theme;
    if (!themeStored) {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
      localStorage.theme = systemTheme;
      themeStored = systemTheme;
    }

    const finalTheme = themeStored;
    document.documentElement.classList.toggle("dark", finalTheme === "dark");
    document.documentElement.style.colorScheme = finalTheme;

    const savedLang = localStorage.getItem("lang");
    localStorage.lang = savedLang || "en";
    i18n.changeLanguage(savedLang || "en");
  }, []);


  return (
    <div className="App">
      <Loader />
      <RouterProvider router={Router} />
    </div>
  )
}

export default App
