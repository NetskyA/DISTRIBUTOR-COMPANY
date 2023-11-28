import { useState } from "react";
import MasterBarang from "./MasterBarang";
import MasterBrand from "./MasterBrand";
import DetailBarang from "./DetailBarang";
import MasterJabatan from "./MasterJabatan";
import MasterKota from "./MasterKota";
import MasterKelurahan from "./MasterKelurahan";
import MasterToko from "./MasterToko";
import MasterUser from "./MasterUser";

export default function Master() {
    const [isBarang, setisBarang] = useState(true);
    const toggleBarang = () => {
        setisBarang(!isBarang);
    }

    const [isBrand, setisBrand] = useState(true);
    const toggleBrand = () => {
        setisBrand(!isBrand);
    }

    const [isDetailBarang, setisDetailBarang] = useState(true);
    const toggleDetailBarang = () => {
        setisDetailBarang(!isDetailBarang);
    }

    const [isJabatan, setisJabatan] = useState(true);
    const toggleJabatan = () => {
        setisJabatan(!isJabatan);
    }

    const [isKota, setisKota] = useState(true);
    const toggleKota = () => {
        setisKota(!isKota);
    }

    const [isKelurahan, setisKelurahan] = useState(true);
    const toggleKelurahan = () => {
        setisKelurahan(!isKelurahan);
    }

    const [isToko, setisToko] = useState(true);
    const toggleToko = () => {
        setisToko(!isToko);
    }

    const [isUser, setisUser] = useState(true);
    const toggleUser = () => {
        setisUser(!isUser);
    }


    return (
        <>  <div className="cover" style={{marginLeft:(!isUser)?"5.7vw":"0vh"}}>

            <div className="cover selectdisable flex">
                <div className="header lg:w-full md:w-1/2 text-primary text-4xl font-semibold">
                    <p>Master</p>
                </div>
                <div className="rounded-xl lg:w-1/2 float-right mr-0 mx-auto text-2xl font-semibold">
                    {/* <ControlTarget /> */}
                </div>
            </div>
            <div className="selectdisable border-2 mt-10 border-gray-300 rounded-2xl w-1/3 h-full" style={{ boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px" }}>
                <div className="grid grid-cols-4 ms-2">
                    <div className="flex text-primary text-2xl">
                        <button onClick={toggleBarang} className="bg-primary w-36 m-4 h-12 rounded-xl text-white hover:bg-gray-300 hover:text-primary font-bold py-2 px-4">
                            Barang
                        </button>
                    </div>
                    <div className="flex text-primary text-2xl">
                        <button onClick={toggleBrand} className="bg-primary w-36 m-4 h-12 rounded-xl text-white hover:bg-gray-300 hover:text-primary font-bold py-2 px-4">
                            Brand
                        </button>
                    </div>
                    <div className="flex text-primary text-xl">
                        <button onClick={toggleDetailBarang} className="bg-primary w-36 m-4 h-12 rounded-xl text-white hover:bg-gray-300 hover:text-primary font-bold py-2 px-4">
                            D. Barang
                        </button>
                    </div>
                    <div className="flex text-primary text-2xl">
                        <button onClick={toggleJabatan} className="bg-primary w-36 m-4 h-12 rounded-xl text-white hover:bg-gray-300 hover:text-primary font-bold py-2 px-4">
                            Jabatan
                        </button>
                    </div>
                    <div className="flex text-primary text-2xl">
                        <button onClick={toggleKota} className="bg-primary w-36 m-4 h-12 rounded-xl text-white hover:bg-gray-300 hover:text-primary font-bold py-2 px-4">
                            Kota
                        </button>
                    </div>
                    <div className="flex text-primary text-2xl">
                        <button onClick={toggleKelurahan} className="bg-primary w-36 m-4 h-12 rounded-xl text-white hover:bg-gray-300 hover:text-primary font-bold py-2 px-4">
                            Kelurahan
                        </button>
                    </div>
                    <div className="flex text-primary text-2xl">
                        <button onClick={toggleToko} className="bg-primary w-36 m-4 h-12 rounded-xl text-white hover:bg-gray-300 hover:text-primary font-bold py-2 px-4">
                            Toko
                        </button>
                    </div>
                    <div className="flex text-primary text-2xl">
                        <button onClick={toggleUser} className="bg-primary w-36 m-4 h-12 rounded-xl text-white hover:bg-gray-300 hover:text-primary font-bold py-2 px-4">
                            User
                        </button>
                    </div>
                </div>
            </div>
            {!isBarang &&
                <MasterBarang />
            }
            {!isBrand &&
                <MasterBrand />
            }
            {!isDetailBarang &&
                <DetailBarang />
            }
            {!isJabatan &&
                <MasterJabatan />
            }
            {!isKota &&
                <MasterKota />
            }
            {!isKelurahan &&
                <MasterKelurahan />
            }
            {!isToko &&
                <MasterToko />
            }
           
            {!isUser &&
                <MasterUser />
            }
        </div>
   
        </>
    )
}