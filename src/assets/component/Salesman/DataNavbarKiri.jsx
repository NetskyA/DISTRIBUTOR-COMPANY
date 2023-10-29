import DataNavbar from "../../controller/ControlNavbarElement"
import LogoProfile from "../../images/image-navbar/staff.png"
import LogoRetur from "../../images/image-navbar/return.png"
import LogoAdd from "../../images/image-navbar/add.png"
import LogoHistory from "../../images/image-navbar/history.png"
import LogoLogout from "../../images/image-navbar/logout2.png"
import LogoCatalog from "../../images/image-navbar/writing.png"
import LogoKeranjang from "../../images/image-navbar/keranjang.png"


// untuk looping navabr kiri
function LoopMenu() {
    let a = [];
    for (let i = 0; i < 8; i++) {
        if (i == 0) {
            a.push(<DataNavbar key={i} img={LogoProfile} title="Profil" link="Profile-Salesman" />)
        } else if (i == 1) {
            a.push(<DataNavbar key={i} img={LogoCatalog} title="Katalog" link="Catalog-Barang" />)
        } else if (i == 2) {
            a.push(<DataNavbar key={i} img={LogoAdd} title="Order" link="Order-Barang" />)
        } else if (i == 3) {
            a.push(<DataNavbar key={i} img={LogoKeranjang} title="Post" link="Post-Keranjang" />)
        } else if (i == 4) {
            a.push(<DataNavbar key={i} img={LogoHistory} title="Histori" link="History-Penjualan-Salesman" />)
        } else if (i == 5) {
            a.push(<DataNavbar key={i} img={LogoRetur} title="Retur" link="Retur-Barang" />)
        } else if (i == 6) {
            a.push(<DataNavbar key={i} dou img={LogoLogout} title="Keluar" link="" />)
        } else if (i == 7) {
            a.push(<DataNavbar key={i} dou img={LogoProfile} title="ProfilS" link="Profile-Supervisor" />)
        }
    }
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

