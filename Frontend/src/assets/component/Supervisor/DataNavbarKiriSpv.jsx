import DataNavbar from "../../controller/ControlNavbarElement"
import LogoProfile from "../../images/image-navbar/staff.png"
import LogoLogout from "../../images/image-navbar/logout2.png"
import LogoCatalog from "../../images/image-navbar/writing.png"
import LogoLaporan from "../../images/image-navbar/laporan.png"
import LogoToko from "../../images/image-navbar/toko.png"
import LogoTambah from "../../images/image-navbar/list.png"


// untuk looping navabr kiri
function LoopMenu() {
    let a = [];
    a.push(<DataNavbar img={LogoProfile} title="Profil" link="/Supervisor" />)
    a.push(<DataNavbar img={LogoCatalog} title="Target" link="Target" />)
    a.push(<DataNavbar img={LogoToko} title="Toko" link="Toko" />)
    a.push(<DataNavbar img={LogoTambah} title="Tambah" link="Tambah-Toko" />)
    a.push(<DataNavbar img={LogoLaporan} title="Laporan " link="Laporan" />)
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

