import DataNavbar from "../../controller/ControlNavbarElement"
import LogoOrder from "../../images/image-navbar/file.png"
import LogoPrint from "../../images/image-navbar/printer.png"
import LogoLaporan from "../../images/image-navbar/laporan.png"
import LogoLogout from "../../images/image-navbar/logout2.png"


// untuk looping navabr kiri
function LoopMenu() {
    let a = [];
    a.push(<DataNavbar img={LogoOrder} title="Order" link="/AdminPenjualan" />)
    a.push(<DataNavbar img={LogoPrint} title="Cetak" link="Print-Orderan-Penjualan" />)
    a.push(<DataNavbar img={LogoLaporan} title="Laporan" link="Laporan-Orderan-Penjualan" />)
    a.push(<DataNavbar img={LogoLogout} title="Keluar" link="/" />)


    return a;
}
// untuk looping navabr kiri
export default function HomeResult() {
    return (
        <>
            <LoopMenu />
        </>
    )
}