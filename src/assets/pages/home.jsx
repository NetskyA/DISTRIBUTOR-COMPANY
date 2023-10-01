/* eslint-disable*/

import ProfileSales from "../component/Salesman/DataProfileSales"
import OrderBarang from "../component/Salesman/DataOrderBarang"
import CatalogBarang from "../component/Salesman/DataStokBarang"
import ReturBarang from "../component/Salesman/DataReturBarang"
import DataTimeControl from "../controller/ControlWaktu"
import DataNavbarKiri from "../component/Salesman/DataNavbarKiri"
import DataNavbarAtas from "../component/Salesman/DataNavbarAtas"
import TargetData from "../component/Salesman/DataTarget"


function HomeFunction({move}) {
    let dataMenu;
    if(move=="Profile"){ 
        dataMenu = <CatalogBarang/>
    }else if(move=="Katalog") {
        dataMenu = <ProfileSales/>
    }else if (move == "Order"){
        dataMenu = <OrderBarang/>
    }else if (move == "Retur"){
        dataMenu = <ReturBarang/>
    }
  return (
    <>
    <header className="flex mb-40">
      <div className="w-32 lg:w-36 overflow-hidden bg-transparent">
        <div className="nav fixed m-4 rounded-lg bg-white " style={{boxShadow:"rgba(0, 0, 0, 0.24) 0px 3px 8px"}}>
                <DataNavbarKiri/>
        </div>
        </div>
        <div className="w-full mr-5 self-start">
            <div className="w-full mb-10 h-20 mt-5 mr-5 bg-white  rounded-lg shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px]">
                <DataNavbarAtas/>
            </div>
            <div className="w-full" style={{height: "71vh"}}>
                <div className="cover mb-36 max-h-full mt-10" style={{width:"100%"}}>
                    {dataMenu}
                </div>
            </div>
        </div>
    </header>
    <div className="footer mt-24 w-full">
        <div className="coverfooter h-16 w-full">
            <p className="font-semibold text-3xl text-white float-left mt-4 ms-10">CV. LAJU JAYA CEMERLANG</p>
            <div className="footerleft float-right mt-4">
                <div className="watch flex">
                <div className="text-2xl mr-6 z-10 text-white font-semibold">
                    <DataTimeControl/>
                    </div>
                </div>
            </div>
        </div>
    </div>
    </>
      )
}

export default HomeFunction;