/* eslint-disable*/
import React, {useEffect} from "react";
import FotoProfile from "../images/image-modal/foto-profile.png"
import DataTarget from "../component/DataTarget"

export default function Table() {
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
                <div className="header lg:w-full md:w-1/2 text-primary text-4xl font-semibold">
                    <p>Profile</p>
                </div>
                <div className="rounded-xl lg:w-1/2 float-right mx-auto text-2xl font-semibold">
                    <DataTarget/>
                </div>
        </div>
            <div className="selectdisable border-2 mt-10 flex border-gray-300 rounded-2xl w-full h-80">
                <div className="row ms-4 m-2 w-full">
                    <div className="noId flex text-primary font-semibold text-2xl">
                        <p>User id : </p>
                        <p className="ms-4">S0001</p>
                    </div>
                    <div className="MSales flex mt-4 text-primary font-semibold text-2xl">
                    <p>Nama User : </p>
                        <p className="ms-4">Aldi</p>
                    </div>
                    <div className="PhoneNumber flex mt-4 text-primary font-semibold text-2xl">
                        <p>No. Hp : </p>
                        <p className="ms-4">08659585912 </p>
                        <p className="ms-4">/ 08346366464</p>
                    </div>
                    <div className="Email flex mt-4 text-primary font-semibold text-2xl">
                    <p>Email : </p>
                        <p className="ms-4">aldi@gmail.com</p>
                    </div>
                    <div className="Adress flex mt-4 text-primary font-semibold text-2xl">
                    <p>Alamat : </p>
                        <p className="ms-4">Jl. Cisitu Lama No. 54 Dago Coblong Bandung Jawa Barat</p>
                    </div>
                    <div className="MngSales flex mt-4 text-primary font-semibold text-2xl">
                        <p>Manager Sales : </p>
                        <p className="ms-4">Alvin</p>
                    </div>
                </div>
                <div className="row m-1 bg-gray-300 rounded-xl w-1/5">
                    <div className="noId">
                        <img className="w-72 m-2 mx-auto" src={FotoProfile} alt="foto profile" />
                    </div>
                </div>
            </div>

        </>
   );
}