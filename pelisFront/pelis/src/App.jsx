import { Index } from "./pages/public/Index";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { GenrePage } from "./pages/public/GenrePage";
import { Login } from "./pages/auth/Login";
import { Register } from "./pages/auth/Register";
import { Dashboard } from "./pages/dashboard/Dashboard";


export default function App() {
 
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/genre/:genre" element={<GenrePage />} />
        <Route path="/login" element={ <Login />}/>
        <Route path="/register" element={ <Register />}/>
        <Route path="/dashboard" element={ <Dashboard/>}/>

      </Routes>
    </BrowserRouter>
  

  );
}








// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from './assets/vite.svg'
// import heroImg from './assets/hero.png'
// import './App.css'

// function App() {
//   const [count, setCount] = useState(0)

//   return (
//     <>
//     </>
//   )
// }

// export default App
