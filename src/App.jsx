import LoginPages from "./assets/pages/login";
import HomePages from "./assets/pages/home";
import './app.css'
import {Link , HashRouter as Router, Routes, Route } from "react-router-dom";
// import CatalogBarang from "./assets/pages/home"

function App() {
  return (
      
    <Router>
      <Routes>
        <Route path="/" element={<LoginPages/>} />
        <Route path="/CatalogBarang" element={<HomePages move={"Profile"}/>} />
        <Route path="/ProfileSalesman" element={<HomePages move={"Katalog"}/>} />
        <Route path="/OrderBarang" element={<HomePages move={"Order"}/>} />
        <Route path="/BlankPage" element={<>INTERFACE ON PROGRESS</>} />
      </Routes>
    </Router>
  )
}

export default App

{/* <Route path="/LoginPage" element={<LoginPages/>} /> */}
