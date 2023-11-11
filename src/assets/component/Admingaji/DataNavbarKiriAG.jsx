import DataNavbar from "../../controller/ControlNavbarElement"
import LogoGaji from "../../images/image-navbar/card.png"
import LogoKomisi from "../../images/image-navbar/refund.png"
import LogoLaporan from "../../images/image-navbar/laporan.png"
import LogoLogout from "../../images/image-navbar/logout2.png"


// untuk looping navabr kiri
function LoopMenu() {
    let a = [];
    a.push(<DataNavbar img={LogoGaji} title="Gaji" link="Gaji-Karyawan" />)
    a.push(<DataNavbar img={LogoKomisi} title="Komisi" link="Komisi-Karyawan" />)
    a.push(<DataNavbar img={LogoLaporan} title="Laporan" link="Laporan-Gaji-Karyawan" />)
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