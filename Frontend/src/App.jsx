import LoginPages from "./assets/pages/login";
import HomePages from "./assets/pages/home";
import './app.css'
import { Link, HashRouter as Router, Routes, Route } from "react-router-dom";
// import CatalogBarang from "./assets/pages/home"

function App() {
  return (

    <Router>
      <Routes>
        <Route path="/" element={<LoginPages />} />
        {/* salesman */}
        <Route path="/Catalog-Barang" element={<HomePages move={"Katalog"} />} />
        <Route path="/Profile-Salesman" element={<HomePages move={"Profile"} />} />
        <Route path="/Order-Barang" element={<HomePages move={"Order"} />} />
        <Route path="/Retur-Barang" element={<HomePages move={"Retur"} />} />
        <Route path="/Post-Keranjang" element={<HomePages move={"Post"} />} />
        <Route path="/History-Penjualan-Salesman" element={<HomePages move={"Histori"} />} />
        <Route path="/Detail-Penjualan-Salesman" element={<HomePages move={"Detail"} />} />
        {/* salesman */}

        {/* koordinator */}
        <Route path="/Profile-Koordinator" element={<HomePages move={"ProfileKoordinator"} />} />
        <Route path="/Target-Koordinator-To-Supervisor" element={<HomePages move={"TargetKoordinatorToSupervisor"} />} />
        <Route path="/Target-Laporan-To-Supervisor" element={<HomePages move={"TargetLaporanToSupervisor"} />} />
        {/* koordinator */}

        {/* supervisor */}
        <Route path="/Profile-Supervisor" element={<HomePages move={"ProfileSupervisor"} />} />
        <Route path="/Target-Supervisor-To-Salesman" element={<HomePages move={"TargetSupervisorToSalesman"} />} />
        <Route path="/Target-Laporan-To-Salesman" element={<HomePages move={"TargetLaporanToSalesman"} />} />
        {/* supervisor */}

        {/* admin gaji */}
        <Route path="/Gaji-Karyawan" element={<HomePages move={"GajiKaryawan"} />} />
        <Route path="/Komisi-Karyawan" element={<HomePages move={"KomisiKaryawan"} />} />
        <Route path="/Laporan-Gaji-Karyawan" element={<HomePages move={"LaporanGajiKaryawan"} />} />
        {/* admin gaji */}

        {/* admin penjualan */}
        <Route path="/Verifikasi-Orderan-Penjualan" element={<HomePages move={"VerifikasiOrderPenjualan"} />} />
        <Route path="/Print-Orderan-Penjualan" element={<HomePages move={"PrintOrderPenjualan"} />} />
        <Route path="/Laporan-Orderan-Penjualan" element={<HomePages move={"LaporanOrderOrderan"} />} />

        {/* admin penjualan */}

        <Route path="/BlankPage" element={<>INTERFACE ON PROGRESS</>} />
      </Routes>
    </Router>
  )
}

export default App

{/* <Route path="/LoginPage" element={<LoginPages/>} /> */ }
