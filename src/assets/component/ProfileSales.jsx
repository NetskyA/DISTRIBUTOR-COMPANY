import React from "react";
export default function Table() {
    return (

        //PROFILE SALESMAN
        <>
            { <div className="border-2 mt-10 mr-4 border-gray-400 rounded-2xl w-full h-80">
                <div className="row ms-4 m-2">
                    <div className="noId flex text-primary font-semibold text-3xl">
                        <p>No id : </p>
                        <p className="ms-4">S0001</p>
                    </div>
                    <div className="MngSales flex mt-4 text-primary font-semibold text-3xl">
                        <p>Manager Sales : </p>
                        <p className="ms-4">Alvin</p>
                    </div>
                    <div className="MSales flex mt-4 text-primary font-semibold text-3xl">
                    <p>Nama Sales : </p>
                        <p className="ms-4">Aldi</p>
                    </div>
                    <div className="PhoneNumber flex mt-4 text-primary font-semibold text-3xl">
                    <p>Nomer Telfon : </p>
                        <p className="ms-4">08659585912</p>
                    </div>
                    <div className="Email flex mt-4 text-primary font-semibold text-3xl">
                    <p>Email : </p>
                        <p className="ms-4">aldi@gmail.com</p>
                    </div>
                    <div className="Adress flex mt-4 text-primary font-semibold text-3xl">
                    <p>Alamat : </p>
                        <p className="ms-4">Kutisati indah</p>
                    </div>
                </div>
            </div> }
        </>
   );
}