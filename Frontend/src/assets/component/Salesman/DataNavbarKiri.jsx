import DataNavbar from "../../controller/ControlNavbarElement"
import LogoProfile from "../../images/image-navbar/staff.png"
import LogoRetur from "../../images/image-navbar/return.png"
import LogoAdd from "../../images/image-navbar/add.png"
import LogoHistory from "../../images/image-navbar/history.png"
import LogoLogout from "../../images/image-navbar/logout2.png"
import LogoCatalog from "../../images/image-navbar/writing.png"
import LogoKeranjang from "../../images/image-navbar/keranjang.png"
import LogoLaporan from "../../images/image-navbar/laporan.png"


// untuk looping navabr kiri
function LoopMenu() {
    let a = [];
    a.push(<DataNavbar  img={LogoProfile} title="Profil" link="/Salesman" />)
    a.push(<DataNavbar  img={LogoCatalog} title="Katalog" link="Catalog" />)
    a.push(<DataNavbar  img={LogoAdd} title="Order" link="Order" />)
    a.push(<DataNavbar  img={LogoKeranjang} title="Post" link="Keranjang" />)
    a.push(<DataNavbar  img={LogoHistory} title="Histori" link="History" />)
    a.push(<DataNavbar  img={LogoRetur} title="Retur" link="Retur" />)
    a.push(<DataNavbar  img={LogoLogout} title="Keluar" link="/"/>)


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

