/* eslint-disable*/

//navigations
import DataNavbarKiriSales from "../component/Salesman/DataNavbarKiri"
import DataNavbarKiriKoor from "../component/Koordinator/DataNavbarKiriKoor"
import DataNavbarKiriSpv from "../component/Supervisor/DataNavbarKiriSpv"
import DataNavbarKiriAG from "../component/Admingaji/DataNavbarKiriAG"
import DataNavbarKiriAP from "../component/Adminpenjualan/DataNavbarKiriAP"
//navigations

//salesman
import ProfileSales from "../component/Salesman/DataProfileSales"
import OrderBarang from "../component/Salesman/DataOrderBarang"
import CatalogBarang from "../component/Salesman/DataStokBarang"
import ReturBarang from "../component/Salesman/DataReturBarang"
import HistoriPenjualanSales from "../component/Salesman/DataHistoriPenjualan"
import PostKeranjang from "../component/Salesman/DataPostKeranjang"
import DetailHistoriPenjualanSales from "../component/Salesman/DataDetailHistori"
import ModalExit from "../../assets/controller/ControlModalKeluar"
import DataTimeControl from "../controller/ControlWaktu"
import DataNavbarAtas from "../controller/DataNavbarAtas"
import TargetData from "../controller/ControlTarget"
//salesman

//Koordinator spv
import ProfileKoordinator from "../component/Koordinator/DataProfileKoordinator"
import TargetKoordinatorToSupervisor from "../component/Koordinator/DataTargetKoordinator"
import TargetLaporanToSupervisor from "../component/Koordinator/DataLaporanSupervisor"
//Koordinator spv

//supervisor
import DataProfileSupervisor from "../component/Supervisor/DataProfileSupervisor"
import DataTargetSupervisor from "../component/Supervisor/DataTargetSupervisor"
import DataLaporanSalesman from "../component/Supervisor/DataLaporanSalesman"
//supervisor

//admin gaji
import GajiKaryawan from "../component/Admingaji/DataGaji"
import KomisiKaryawan from "../component/Admingaji/DataKomisi"
import LaporanGajiKaryawan from "../component/Admingaji/DataLaporanGaji"
//admin gaji

// admin penjualan
import OrderanVerifikasi from "../component/Adminpenjualan/DataOrderanMasuk"
import PrintOrderPenjualan from "../component/Adminpenjualan/DataPrintOrderan"
import LaporanOrderOrderan from "../component/Adminpenjualan/DataLaporanOrderan"
// admin penjualan

function HomeFunction({ move }) {
    let dataMenu;
    if (move == "Profile") {
        dataMenu = <ProfileSales />
    } else if (move == "Katalog") {
        dataMenu = <CatalogBarang />
    } else if (move == "Order") {
        dataMenu = <OrderBarang />
    } else if (move == "Retur") {
        dataMenu = <ReturBarang />
    } else if (move == "Histori") {
        dataMenu = <HistoriPenjualanSales />
    } else if (move == "Detail") {
        dataMenu = <DetailHistoriPenjualanSales />
    } else if (move == "Post") {
        dataMenu = <PostKeranjang />
    } else if (move == "Exit") {
        dataMenu = <ModalExit />
    } else if (move == "ProfileKoordinator") {
        dataMenu = <ProfileKoordinator />
    } else if (move == "TargetKoordinatorToSupervisor") {
        dataMenu = <TargetKoordinatorToSupervisor />
    } else if (move == "TargetLaporanToSupervisor") {
        dataMenu = <TargetLaporanToSupervisor />
    } else if (move == "ProfileSupervisor") {
        dataMenu = <DataProfileSupervisor />
    } else if (move == "TargetSupervisorToSalesman") {
        dataMenu = <DataTargetSupervisor />
    } else if (move == "TargetLaporanToSalesman") {
        dataMenu = <DataLaporanSalesman />
    } else if (move == "GajiKaryawan") {
        dataMenu = <GajiKaryawan />
    } else if (move == "KomisiKaryawan") {
        dataMenu = <KomisiKaryawan />
    } else if (move == "LaporanGajiKaryawan") {
        dataMenu = <LaporanGajiKaryawan />
    } else if (move == "VerifikasiOrderPenjualan") {
        dataMenu = <OrderanVerifikasi />
    } else if (move == "PrintOrderPenjualan") {
        dataMenu = <PrintOrderPenjualan />
    } else if (move == "LaporanOrderOrderan") {
        dataMenu = <LaporanOrderOrderan />
    }
    return (
        <>
            <header className="flex">
                <div className="w-32 lg:w-36 overflow-hidden bg-transparent">
                    <div className="nav fixed m-4 rounded-lg bg-white" style={{ boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px" }}>
                        {/* <DataNavbarKiriKoor /> */}
                        {/* <DataNavbarKiriSpv /> */}
                        {/* <DataNavbarKiriSales /> */}
                        {/* <DataNavbarKiriAG /> */}
                        <DataNavbarKiriAP />
                    </div>
                </div>
                <div className="w-full mr-5 self-start">
                    <div className="w-full mb-10 h-20 mt-5 mr-5 bg-white  rounded-lg shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px]">
                        <DataNavbarAtas />
                    </div>
                    <div className="w-full" style={{ height: "71vh" }}>
                        <div className="cover mb-36 max-h-full mt-10" style={{ width: "100%" }}>
                            {dataMenu}
                        </div>
                    </div>
                </div>
            </header>
            <div className="footer w-full">
                <div className="coverfooter h-11 w-full">
                    <p className="font-semibold text-2xl text-white float-left mt-2 ms-5">CV. LAJU JAYA CEMERLANG</p>
                    <div className="footerleft float-right mt-2">
                        <div className="watch flex">
                            <div className="text-2xl mr-6 z-10 text-white font-semibold">
                                <DataTimeControl />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default HomeFunction;