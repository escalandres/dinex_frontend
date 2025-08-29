import { useEffect } from 'react';
import { RouterProvider } from "react-router-dom";
import Loader from './pages/components/Loader';

import './index.css';
import './App.css'
import Router from './components/Router';


function App() {
  useEffect(() => {
    let temaGuardado = localStorage.theme;
    if (!temaGuardado) {
      const temaSistema = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
      localStorage.theme = temaSistema;
      // document.documentElement.style.colorScheme = temaSistema;
      temaGuardado = temaSistema;
    }

    const temaFinal = temaGuardado;
    document.documentElement.classList.toggle("dark", temaFinal === "dark");
    document.documentElement.style.colorScheme = temaFinal;
  }, []);
  // React.useEffect(() => {
  //   let pagetitle = document.title;

  //   window.addEventListener("blur",()=>{
  //     document.title = "Come back here";
  //   })
  //   window.addEventListener("focus",()=>{
  //     document.title = pagetitle;
  //   })
    
  // }, []);
  
  return (
    <div className="App">
      <Loader />
      <RouterProvider router={Router} />
    </div>
  );
}

export default App;
