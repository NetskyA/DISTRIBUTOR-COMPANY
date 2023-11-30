/* eslint-disable*/

import client from "./client";
import formatter from "./formatter";

function targetData({target,current}) {
    return(
        <>
            <div className="header float-right flex text-2xl font-semibold m-2">
                {/* berisi target bulanan yang diambil dari total penjulan sales pribadi*/}
                <div className="text-primary">
                    Target bulanan
                </div>
                <div className="ms-4 text-gray-600">
                    ( {formatter.format(current)}
                </div>
                <div className="text-primary">
                    / {formatter.format(target)} )
                </div>
                {/* berisi target bulanan yang diambil dari total penjulan sales pribadi*/}
            </div>
        </>
    )
}
export default targetData;