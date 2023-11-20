// import { useState } from 'react';
import DateControl from "../../controller/ControlTanggal"
// import ModalExit from "../controller/ModalExit"

export default function NavBarUp() {
    return (
        <>
            <div className="mt-2 font-semibold text-sm text-gray-500 flex float-right">
                {/* nanti digunakan memanggil nama sesuai akun*/}
                <div>
                    <p className="text-3xl mr-5 mt-4 font-semibold">
                        Geovann. (Supervisor)
                    </p>
                </div>
                {/* nanti digunakan memanggil nama sesuai akun */}

                {/* untuk memanggil function controller target salesman */}
                <div className="text-3xl mr-5 mt-4 font-semibold" style={{ color: "#f97316" }}>
                    <DateControl />
                </div>
                {/* untuk memanggil function controller target salesman */}
            </div>
        </>
    )
}

