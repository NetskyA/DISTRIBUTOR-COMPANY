import LoginPages from "./assets/pages/login";
import HomePages from "./assets/pages/home";
import './app.css'
import {Link , HashRouter as Router, Routes, Route } from "react-router-dom";
// import HomePage from "./assets/pages/home"

function App() {
  return (
      
    <Router>
      <Routes>
        <Route path="/" element={<LoginPages/>} />
        <Route path="/HomePage" element={<HomePages/>} />
        <Route path="/BlankPage" element={<>INTERFACE ON PROGRESS</>} />
      </Routes>
    </Router>
  )
}

export default App

{/* <Route path="/LoginPage" element={<LoginPages/>} /> */}
