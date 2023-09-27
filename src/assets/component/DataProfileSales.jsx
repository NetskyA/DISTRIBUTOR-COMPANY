/* eslint-disable*/
import React from "react";
import FotoProfile from "../images/image-modal/foto-profile.png"

export default function Table() {
    return (

        //PROFILE SALESMAN
        <>
             <div className="border-2 mt-10 flex border-gray-300 rounded-2xl w-full h-80">
                <div className="row ms-4 m-2 w-full">
                    <div className="noId flex text-primary font-semibold text-3xl">
                        <p>User id : </p>
                        <p className="ms-4">S0001</p>
                    </div>
                    <div className="MSales flex mt-4 text-primary font-semibold text-3xl">
                    <p>Nama User : </p>
                        <p className="ms-4">Aldi</p>
                    </div>
                    <div className="PhoneNumber flex mt-4 text-primary font-semibold text-3xl">
                        <p>No. Hp : </p>
                        <p className="ms-4">08659585912 </p>
                        <p className="ms-4">/ 08346366464</p>
                    </div>
                    <div className="Email flex mt-4 text-primary font-semibold text-3xl">
                    <p>Email : </p>
                        <p className="ms-4">aldi@gmail.com</p>
                    </div>
                    <div className="Adress flex mt-4 text-primary font-semibold text-3xl">
                    <p>Alamat : </p>
                        <p className="ms-4">Jl. Cisitu Lama No. 54 Dago Coblong Bandung Jawa Barat</p>
                    </div>
                    <div className="MngSales flex mt-4 text-primary font-semibold text-3xl">
                        <p>Manager Sales : </p>
                        <p className="ms-4">Alvin</p>
                    </div>
                </div>
                <div className="row m-1 bg-gray-300 rounded-xl w-1/4">
                    <div className="noId">
                        <img className="w-72 m-2 mx-auto" src={FotoProfile} alt="foto profile" />
                    </div>
                </div>
            </div>
        </>
   );
}