// import { useState } from 'react';
import DateControl from "./ControlTanggal"
import LogoPerusahaan from "../images/image-login/icon3.png"
// import ModalExit from "../controller/ModalExit"

export default function NavBarUp() {
    let nama = JSON.parse(localStorage.loggedData).username;
    let jabatan = JSON.parse(localStorage.loggedData).jabatan;
    return (
        <>
            <div className="mt-2 font-semibold text-sm text-gray-500 flex float-right">
                {/* nanti digunakan memanggil nama sesuai akun*/}
                <div>
                    <p className="text-3xl mr-5 mt-4 font-semibold">
                        {`${nama} (${jabatan})`}
                    </p>
                </div>
                {/* nanti digunakan memanggil nama sesuai akun */}

                {/* untuk memanggil function controller target salesman */}
                <div className="text-3xl mr-5 mt-4 font-semibold" style={{ color: "#f97316" }}>
                    <DateControl />
                </div>
                <div className="logo">
                    <img src={LogoPerusahaan} className="w-12 h-12 mt-2 mr-2" alt="" />
                </div>
                {/* untuk memanggil function controller target salesman */}
            </div>
        </>
    )
}

