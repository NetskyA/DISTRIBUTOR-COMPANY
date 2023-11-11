import DataNavbar from "../../controller/ControlNavbarElement"
import LogoProfile from "../../images/image-navbar/staff.png"
import LogoLogout from "../../images/image-navbar/logout2.png"
import LogoCatalog from "../../images/image-navbar/writing.png"
import LogoLaporan from "../../images/image-navbar/laporan.png"


// untuk looping navabr kiri
function LoopMenu() {
    let a = [];
    a.push(<DataNavbar img={LogoProfile} title="ProfilS" link="Profile-Koordinator" />)
    a.push(<DataNavbar img={LogoCatalog} title="TargetS" link="Target-Koordinator-To-Supervisor" />)
    a.push(<DataNavbar img={LogoLaporan} title="Laporan " link="Target-Laporan-To-Supervisor" />)
    a.push(<DataNavbar img={LogoLogout} title="Keluar" link="" />)


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

