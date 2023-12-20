/* eslint-disable*/
import React, { useEffect } from "react";
import { useLoaderData } from "react-router-dom";
import FotoProfile from "../../images/image-modal/fotoprofile.png"
import ControlTarget from "../../controller/ControlTarget"
export default function Table() {
    let data = useLoaderData()
    useEffect(() => {
        // Disable text selection for elements
        // with class "no-select"
        const noSelectElements = document.querySelectorAll(".selectdisable");
        noSelectElements.forEach((element) => {
            element.style.webkitUserSelect = "none";
            element.style.mozUserSelect = "none";
            element.style.msUserSelect = "none";
            element.style.userSelect = "none";
        });
    }, []);
    return (

        //PROFILE SALESMAN
        <>
            <div className="cover selectdisable flex">
                {/* nanti digunakan memanggil nama sesuai akun*/}
                <div className="header lg:w-full md:w-1/2 text-primary text-4xl font-semibold">
                    <p>Profil Supervisor</p>
                </div>
                <div className="rounded-xl lg:w-1/2 float-right mr-0 mx-auto text-2xl font-semibold">
                <ControlTarget current={data.targetSekarang} target={data.currtarget}/>
                </div>
                {/* untuk memanggil function controller target salesman */}
            </div>
            <div className="selectdisable border-2 mt-10 flex border-gray-300 rounded-2xl w-full h-full" style={{ boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px" }}>

                {/* berisi biodata salesman */}
                <div className="row ms-6 m-4 w-full">
                    <div className="MSales flex mt-4 text-primary font-semibold text-2xl">
                        <p>Nama User : </p>
                        <p className="ms-4">{data.nama}</p>
                    </div>
                    <div className="PhoneNumber flex mt-4 text-primary font-semibold text-2xl">
                        <p>No. Hp : </p>
                        <p className="ms-4">{data.no_handphone} </p>
                        {/* <p className="ms-4">/ 08346366464</p> */}
                    </div>
                    <div className="Email flex mt-4 text-primary font-semibold text-2xl">
                        <p>Email : </p>
                        <p className="ms-4">{data.email}</p>
                    </div>
                    <div className="Adress flex mt-4 text-primary font-semibold text-2xl">
                        <p>Alamat : </p>
                        <p className="ms-4">{data.alamat}</p>
                    </div>
                    <div className="MngSales flex mt-4 text-primary font-semibold text-2xl">
                        <p>Kordinator Supervisor : </p>
                        <p className="ms-4">{data.atasan}</p>
                    </div>
                </div>
                {/* berisi biodata salesman */}

                {/* menampilakan foto karyawan */}
                <div className="row m-1 bg-gray-300 rounded-xl w-1/5">
                    <div className="noId">
                        <img className="w-72 m-2 mx-auto" src={`https://dcbasborneoabadiselalu.glitch.me/uploads/${data.foto}`} alt="foto profile" />
                    </div>
                </div>
                {/* menampilakan foto karyawan */}

            </div>

        </>
    );
}