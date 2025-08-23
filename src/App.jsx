import { RouterProvider } from "react-router-dom";
import Loader from './pages/components/Loader';

import './index.css';
import './App.css'
import Router from './components/Router';


function App() {
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
