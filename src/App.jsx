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
        <Route path="/Catalog-Barang" element={<HomePages move={"Katalog"}/>} />
        <Route path="/Profile-Salesman" element={<HomePages move={"Profile"}/>} />
        <Route path="/Order-Barang" element={<HomePages move={"Order"}/>} />
        <Route path="/Retur-Barang" element={<HomePages move={"Retur"}/>} />
        <Route path="/Post-Keranjang" element={<HomePages move={"Post"}/>} />
        <Route path="/History-Penjualan-Salesman" element={<HomePages move={"Histori"}/>} />
        <Route path="/Detail-Penjualan-Salesman" element={<HomePages move={"Detail"}/>} />
        <Route path="/Profile-Koordinator" element={<HomePages move={"ProfileKoordinator"}/>} />
        <Route path="/Target-Koordinator-To-Supervisor" element={<HomePages move={"TargetKoordinatorToSupervisor"}/>} />
        <Route path="/Target-Laporan-To-Supervisor" element={<HomePages move={"TargetLaporanToSupervisor"}/>} />
        <Route path="/BlankPage" element={<>INTERFACE ON PROGRESS</>} />
      </Routes>
    </Router>
  )
}

export default App

{/* <Route path="/LoginPage" element={<LoginPages/>} /> */}
