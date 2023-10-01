import DataNavbar from "../Salesman/DataNavbarElement"
import LogoProfile from "../../images/image-navbar/staff.png"
import LogoRetur from "../../images/image-navbar/return.png"
import LogoAdd from "../../images/image-navbar/add.png"
import LogoHistory from "../../images/image-navbar/history.png"
import LogoLogout from "../../images/image-navbar/logout2.png"
import LogoCatalog from "../../images/image-navbar/writing.png"


// untuk looping navabr kiri
function LoopMenu() {
    let a = [];
    for (let i = 0; i < 6; i++) {
        if(i==0){
            a.push(<DataNavbar img={LogoProfile} title="Profil" link="ProfileSalesman" />)
        }else if(i==1){
            a.push(<DataNavbar img={LogoAdd} title="Order" link="OrderBarang"/>)
        }else if(i==2){
            a.push(<DataNavbar img={LogoCatalog} title="Katalog" link="CatalogBarang"/>)
        } if(i==3){
            a.push(<DataNavbar img={LogoRetur} title="Retur" link="BlankPage"/>)
        }else if(i==4){
            a.push(<DataNavbar img={LogoHistory} title="Histori" link="BlankPage"/>)
        }else if(i==5){
            a.push(<DataNavbar dou img={LogoLogout} title="Keluar" link=""/>)
        }
    }
    return a;
}
// untuk looping navabr kiri
export default function HomeResult() {
    return(
        <>
         <LoopMenu/>
        </>
    )
}

