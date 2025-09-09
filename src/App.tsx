import { useEffect } from 'react'
import { RouterProvider } from "react-router-dom";
import Loader from '@pages/components/Loader';
import Router from '@components/Router';

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
  }, []);


  return (
    <div className="App">
      <Loader />
      <RouterProvider router={Router} />
    </div>
  )
}

export default App
