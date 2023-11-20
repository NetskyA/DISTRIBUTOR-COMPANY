import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LoginPages from "./assets/pages/login";
import HomeSalesman from "./assets/pages/homeSalesman";
import ProfileSales from "./assets/component/Salesman/DataProfileSales"
import Catalog from './assets/component/Salesman/DataStokBarang';
import OrderBarang from "./assets/component/Salesman/DataOrderBarang"
import ReturBarang from "./assets/component/Salesman/DataReturBarang"
import HistoriPenjualanSales from "./assets/component/Salesman/DataHistoriPenjualan"
import PostKeranjang from "./assets/component/Salesman/DataPostKeranjang"
import DetailHistoriPenjualanSales from "./assets/component/Salesman/DataDetailHistori"
import HomeSupervisor from './assets/pages/homesupervisor';
import DataProfileSupervisor from "./assets/component/Supervisor/DataProfileSupervisor"
import DataTargetSupervisor from "./assets/component/Supervisor/DataTargetSupervisor"
import DataLaporanSalesman from "./assets/component/Supervisor/DataLaporanSalesman"
import ProfileKoordinator from "./assets/component/Koordinator/DataProfileKoordinator"
import TargetKoordinatorToSupervisor from "./assets/component/Koordinator/DataTargetKoordinator"
import TargetLaporanToSupervisor from "./assets/component/Koordinator/DataLaporanSupervisor"
import HomeKoorSupervisor from './assets/pages/homeKoordinatorSupervisor';
import HomeAdminPenjualan from './assets/pages/homeAdminPenjualan';
import OrderanVerifikasi from "./assets/component/Adminpenjualan/DataOrderanMasuk"
import PrintOrderPenjualan from "./assets/component/Adminpenjualan/DataPrintOrderan"
import LaporanOrderOrderan from "./assets/component/Adminpenjualan/DataLaporanOrderan"
import HomeAdminGaji from './assets/pages/homeAdminGaji';
import GajiKaryawan from "./assets/component/Admingaji/DataGaji"
import KomisiKaryawan from "./assets/component/Admingaji/DataKomisi"
import LaporanGajiKaryawan from "./assets/component/Admingaji/DataLaporanGaji"
// import {
//   createBrowserRouter,
//   RouterProvider,
// } from "react-router-dom";

// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <div>Hello world!</div>,
//   },
// ]);

const router = createBrowserRouter([
    {
      path:"/",
      element: <LoginPages />,
    },{
      path:"/Salesman",
      element:<HomeSalesman/>,
      children:[{
        index:true,
        element:<ProfileSales/>
      },{
        path:"Catalog",
        element:<Catalog/>
      },{
        path:"Order",
        element:<OrderBarang/>
      },{
        path:"Keranjang",
        element:<PostKeranjang/>
      },{
        path:"History",
        element:<HistoriPenjualanSales/>
      },{
        path:"Retur",
        element:<ReturBarang/>
      },{
        path:"Detail-History/:id",
        element:<DetailHistoriPenjualanSales/>,
        // loader:
      }]
    },{
      path:"/Supervisor",
      element:<HomeSupervisor/>,
      children:[{
        index:true,
        element:<DataProfileSupervisor/>
      },{
        path:"Target",
        element:<DataTargetSupervisor/>,
      },{
        path:"Laporan",
        element:<DataLaporanSalesman/>
      }]
    },{
      path:"/Koordinator",
      element:<HomeKoorSupervisor/>, 
      children:[{
        index:true,
        element:<ProfileKoordinator/>
      },{
        path:"Target",
        element:<TargetKoordinatorToSupervisor/>,
      },{
        path:"Laporan",
        element:<TargetLaporanToSupervisor/>
      }]
    },{
      path:"/AdminPenjualan",
      element:<HomeAdminPenjualan/>,
      children:[{
        index:true,
        element:<OrderanVerifikasi/>
      },{
        path:"Print-Orderan-Penjualan",
        element:<PrintOrderPenjualan/>,
      },{
        path:"Laporan-Orderan-Penjualan",
        element:<LaporanOrderOrderan/>
      }]
    },{
      path:"/AdminGaji",
      element:<HomeAdminGaji/>,
      children:[{
        index:true,
        element:<GajiKaryawan/>
      },{
        path:"Komisi-Karyawan",
        element:<KomisiKaryawan/>,
      },{
        path:"Laporan-Gaji-Karyawan",
        element:<LaporanGajiKaryawan/>
      }]
    }
  ]);
  ReactDOM.createRoot(document.getElementById("root")).render(
      <RouterProvider router={router} />
  );

// ReactDOM.createRoot(document.getElementById('root')).render(
//   // <React.StrictMode>
//   // </React.StrictMode>,
//     <App />
// )
