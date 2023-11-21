// import { useState } from 'react';
import DateControl from "./ControlTanggal"
import LogoPerusahaan from "../images/image-login/icon2.png"
// import ModalExit from "../controller/ModalExit"

export default function NavBarUp() {
    return (
        <>
            <div className="mt-2 font-semibold text-sm text-gray-500 flex float-right">
                {/* nanti digunakan memanggil nama sesuai akun*/}
                <div>
                    <p className="text-3xl mr-5 mt-4 font-semibold">
                        Aldi A. (Sales)
                    </p>
                </div>
                {/* nanti digunakan memanggil nama sesuai akun */}

                {/* untuk memanggil function controller target salesman */}
                <div className="text-3xl mr-5 mt-4 font-semibold" style={{ color: "#f97316" }}>
                    <DateControl />
                </div>
                <div className="logo">
                    <img src={LogoPerusahaan} className="w-16 h-16 mr-2" alt="" />
                </div>
                {/* untuk memanggil function controller target salesman */}
            </div>
        </>
    )
}

