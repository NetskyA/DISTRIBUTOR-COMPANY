// import { useState } from 'react';
import DateControl from "../controller/DateControl"
// import ModalExit from "../controller/ModalExit"

function NavBarUp() {
    return(
        <>
        <div className="mt-2 font-semibold text-sm text-gray-500 flex float-right">
        <div>
            <p className="text-2xl mr-5 mt-4 font-semibold">
                Aldi A. (Sales)
            </p>
        </div>
                <div className="text-2xl mr-5 mt-4 font-semibold" style={{color:"#f97316"}}>
                    <DateControl/>
                </div>
        </div>
        </>
    )
}

export default NavBarUp;