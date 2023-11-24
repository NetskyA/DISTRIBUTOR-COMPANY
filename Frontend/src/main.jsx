// import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "./app.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LoginPages from "./assets/pages/login";
import Home from "./assets/pages/home";
import ProfileSales from "./assets/component/Salesman/DataProfileSales";
import Catalog from "./assets/component/Salesman/DataStokBarang";
import OrderBarang from "./assets/component/Salesman/DataOrderBarang";
import ReturBarang from "./assets/component/Salesman/DataReturBarang";
import HistoriPenjualanSales from "./assets/component/Salesman/DataHistoriPenjualan";
import PostKeranjang from "./assets/component/Salesman/DataPostKeranjang";
import DetailHistoriPenjualanSales from "./assets/component/Salesman/DataDetailHistori";
import DataProfileSupervisor from "./assets/component/Supervisor/DataProfileSupervisor";
import DataTargetSupervisor from "./assets/component/Supervisor/DataTargetSupervisor";
import DataLaporanSalesman from "./assets/component/Supervisor/DataLaporanSalesman";
import ProfileKoordinator from "./assets/component/Koordinator/DataProfileKoordinator";
import TargetKoordinatorToSupervisor from "./assets/component/Koordinator/DataTargetKoordinator";
import TargetLaporanToSupervisor from "./assets/component/Koordinator/DataLaporanSupervisor";
import OrderanVerifikasi from "./assets/component/Adminpenjualan/DataOrderanMasuk";
import PrintOrderPenjualan from "./assets/component/Adminpenjualan/DataPrintOrderan";
import LaporanOrderOrderan from "./assets/component/Adminpenjualan/DataLaporanOrderan";
import GajiKaryawan from "./assets/component/Admingaji/DataGaji";
import KomisiKaryawan from "./assets/component/Admingaji/DataKomisi";
import LaporanGajiKaryawan from "./assets/component/Admingaji/DataLaporanGaji";
import DataHandler from "./assets/controller/DataHandler";

const {
  getDataCatalog,
  getDataProfileSalesman,
  getDataProfileSupervisor,
  getDataProfileKoordinatorSupervisor,
  cekLogin,
  cekOrder,
  cekPost,
  cekHistory,
  cekDetailHistory,
  getDataKoor,
  getSuperSales
} = DataHandler;

const router = createBrowserRouter([
  {
    path: "/",
    element: <LoginPages />,
    loader: cekLogin,
  },
  {
    path: "/Salesman",
    element: <Home role={"Salesman"} />,
    children: [
      {
        index: true,
        element: <ProfileSales />,
        loader: getDataProfileSalesman,
      },
      {
        path: "Catalog",
        element: <Catalog />,
        loader: getDataCatalog,
      },
      {
        path: "Order",
        element: <OrderBarang />,
        loader: cekOrder,
      },
      {
        path: "Keranjang",
        element: <PostKeranjang />,
        loader: cekPost,
      },
      {
        path: "History",
        element: <HistoriPenjualanSales />,
        loader:cekHistory
      },
      {
        path: "Retur",
        element: <ReturBarang />,
      },
      {
        path: "Detail-History/:id",
        element: <DetailHistoriPenjualanSales />,
        loader:cekDetailHistory
      },
    ],
  },
  {
    path: "/Supervisor",
    element: <Home role={"Supervisor"} />,
    children: [
      {
        index: true,
        element: <DataProfileSupervisor />,
        loader: getDataProfileSupervisor,
      },
      {
        path: "Target",
        element: <DataTargetSupervisor />,
      },
      {
        path: "Laporan",
        element: <DataLaporanSalesman />,
      },
    ],
  },
  {
    path: "/KoordinatorSupervisor",
    element: <Home role={"Koordinator-Supervisor"} />,
    children: [
      {
        index: true,
        element: <ProfileKoordinator />,
        loader: getDataProfileKoordinatorSupervisor,
      },
      {
        path: "Target",
        element: <TargetKoordinatorToSupervisor />,
        loader: getDataKoor,
      },
      {
        path: "Laporan",
        element: <TargetLaporanToSupervisor />,
        loader: getSuperSales,
      },
    ],
  },
  {
    path: "/AdminPenjualan",
    element: <Home role={"Admin-Penjualan"} />,
    children: [
      {
        index: true,
        element: <OrderanVerifikasi />,
      },
      {
        path: "Print-Orderan-Penjualan",
        element: <PrintOrderPenjualan />,
      },
      {
        path: "Laporan-Orderan-Penjualan",
        element: <LaporanOrderOrderan />,
      },
    ],
  },
  {
    path: "/AdminGaji",
    element: <Home role={"Admin-Gaji"} />,
    children: [
      {
        index: true,
        element: <GajiKaryawan />,
      },
      {
        path: "Komisi-Karyawan",
        element: <KomisiKaryawan />,
      },
      {
        path: "Laporan-Gaji-Karyawan",
        element: <LaporanGajiKaryawan />,
      },
    ],
  },
]);
ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);

// ReactDOM.createRoot(document.getElementById('root')).render(
//   // <React.StrictMode>
//   // </React.StrictMode>,
//     <App />
// )
