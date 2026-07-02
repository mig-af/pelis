import { Index } from "./pages/Index";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Movie } from "./pages/Movies";


export default function App() {
 
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/genre/:genre" element={<Movie />} />
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
