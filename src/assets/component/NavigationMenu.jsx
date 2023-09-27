import ImportNavbarSideCard from "../controller/NavbarSideCard"
import LogoProfile from "../images/image-navbar/staff.png"
import LogoRetur from "../images/image-navbar/return.png"
import LogoAdd from "../images/image-navbar/add.png"
import LogoStock from "../images/image-navbar/warehouse.png"
import LogoHistory from "../images/image-navbar/history.png"
import LogoLogout from "../images/image-navbar/logout2.png"
import LogoCatalog from "../images/image-navbar/writing.png"


function LoopMenu() {
    let a = [];
    for (let i = 0; i < 7; i++) {
     if(i==0){
       a.push(<ImportNavbarSideCard img={LogoProfile} title="Profil" link="HomePage" />)
    }else if(i==1){
       a.push(<ImportNavbarSideCard img={LogoAdd} title="Pesan" link=""/>)
      }else if(i==2){
         a.push(<ImportNavbarSideCard img={LogoCatalog} title="Catalog" link="HomePage"/>)
      }else if(i==3){
        a.push(<ImportNavbarSideCard img={LogoStock} title="Stok" link=""/>)
      }else if(i==4){
        a.push(<ImportNavbarSideCard img={LogoRetur} title="Retur" link=""/>)
   }else if(i==5){
        a.push(<ImportNavbarSideCard img={LogoHistory} title="Histori" link=""/>)
   }else if(i==6){
        a.push(<ImportNavbarSideCard dou img={LogoLogout} title="Keluar" link=""/>)
   }
}
return a;
}
function HomeResult() {
    return(
        <>
         <LoopMenu/>
        </>
    )
}

export default HomeResult;