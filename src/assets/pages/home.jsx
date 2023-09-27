import CatalogBarang from "../component/StokBarang"
import ProfileSales from "../component/ProfileSales"
import TimeControl from "../controller/TimeControl"
import NavbarSide from "../component/NavigationMenu"
import NavbarUp from "../component/NavbarInfo"
import TargetData from "../component/TargetData"


function HomeFunction() {

  return (
    <>
    <header className="flex mb-40">
      <div className="w-32 lg:w-36 overflow-hidden bg-transparent">
        <div className="nav fixed m-4 rounded-lg bg-white " style={{boxShadow:"rgba(0, 0, 0, 0.24) 0px 3px 8px"}}>
                <NavbarSide/>
        </div>
        </div>
        <div className="w-full mr-5 self-start">
            <div className="w-full mb-10 h-20 mt-5 mr-5 bg-white  rounded-lg shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px]">
                <NavbarUp/>
            </div>
            <div className="w-full" style={{height: "71vh"}}>
                <div className="valueTarget">
                    <TargetData/>
                </div>
                <div className="cover mb-36 max-h-full mt-10" style={{width:"100%"}}>
                    <CatalogBarang/>
                    {/* <ProfileSales/> */}
                </div>
            </div>
        </div>
    </header>
    <div className="footer mt-24 w-full">
        <div className="coverfooter h-16 w-full">
            <p className="font-semibold text-3xl text-white float-left mt-4 ms-10">CV. Rusak Bersama</p>
            <div className="footerleft float-right mt-4">
                <div className="watch flex">
                <div className="text-2xl mr-6 z-10 text-white font-semibold">
                    <TimeControl/>
                    </div>
                </div>
            </div>
        </div>
    </div>
    </>
      )
}

export default HomeFunction;