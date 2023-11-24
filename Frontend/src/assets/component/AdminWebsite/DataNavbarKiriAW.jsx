import DataNavbar from "../../controller/ControlNavbarElement"
import LogoBarang from "../../images/image-navbar/writing.png"
import LogoSales from "../../images/image-navbar/cube.png"
import LogoGaji from "../../images/image-navbar/refund.png"
import LogoKinerja from "../../images/image-navbar/stack.png"
import LogoTarget from "../../images/image-navbar/line.png"
import LogoRegister from "../../images/image-navbar/adduser.png"
import LogoMaster from "../../images/image-navbar/insert.png"
import LogoLogout from "../../images/image-navbar/logout2.png"


// untuk looping navabr kiri
function LoopMenu() {
    let a = [];
    a.push(<DataNavbar img={LogoBarang} title="Barang" link="/AdminWebsite" />)
    a.push(<DataNavbar img={LogoSales} title="Sales" link="Laporan-Sales" />)
    a.push(<DataNavbar img={LogoGaji} title="Gaji" link="Laporan-Gaji" />)
    a.push(<DataNavbar img={LogoKinerja} title="Kinerjs" link="Laporan-Kinerja" />)
    a.push(<DataNavbar img={LogoTarget} title="Target" link="Laporan-Target" />)
    a.push(<DataNavbar img={LogoRegister} title="Regist" link="Register-User" />)
    a.push(<DataNavbar img={LogoMaster} title="Master" link="Master" />)
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