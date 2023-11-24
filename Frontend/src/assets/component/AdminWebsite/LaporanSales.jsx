import ControlTarget from "../../controller/ControlTarget"
import { useState } from "react";

export default function LaporanSales() {
    const [isVisibleSales, setIsVisibleSales] = useState(false);
    const [dateStart, setDateStart] = useState("-");

    const toggleVisibilitySales = () => {
        setIsVisibleSales(!isVisibleSales);
    };
    return (
        <>
            <div className="cover selectdisable flex">
                <div className="header lg:w-full md:w-1/2 text-primary text-4xl font-semibold">
                    <p>Laporan Sales</p>
                </div>
                <div className="rounded-xl lg:w-1/2 float-right mr-0 mx-auto text-2xl font-semibold">
                    {/* <ControlTarget /> */}
                </div>
            </div>
            <div className="selectdisable border-2 mt-10 border-gray-300 rounded-2xl w-1/3 h-56" style={{ boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px" }}>
                <div className="row ms-4 m-4 w-full" > <div className="flex text-primary text-2xl">
                    <p className="pt-1 pr-2">Tanggal Awal :
                    </p>
                    <input
                        type="date"
                        name="date"
                        id="dateStart"
                        className="border-0 text-2xl h-10"
                        required="dates" />
                </div>
                    <div className="flex text-primary mt-3 text-2xl">
                        <p className="pt-1 pr-2">Tanggal Akhir :
                        </p>
                        <input
                            type="date"
                            name="date"
                            id="dateEnd"
                            className="border-0 text-2xl h-10"
                            required="dates" />
                    </div>
                </div>
                <div className="flex float-right" >
                    <button
                        onClick={toggleVisibilitySales}
                        className="bg-primary w-52 m-4 h-16 rounded-xl text-white hover:bg-gray-300 hover:text-primary font-bold py-2 px-4">
                        Cari
                    </button>
                </div>
            </div>
            <div className="w-full mt-16 mx-auto border-2 rounded-xl" style={{ boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px" }}>
                {isVisibleSales == true && (
                    <div id="NotaCetakSales" className="cover m-5">
                        <p className="pt-4 text-4xl font-semibold text-center text-primary">
                            Laporan Sales
                        </p>
                        <table
                            className="text-left text-2xl mt-5 font-light border rounded-xl w-full"
                            style={{ boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px" }}
                        >
                            <thead className="border-b font-medium dark:border-neutral-500">
                                <tr>
                                    <th scope="col" className="px-6 py-4">
                                        Id Transaksi
                                    </th>
                                    <th scope="col" className="px-6 py-4">
                                        Tanggal
                                    </th>
                                    <th scope="col" className="px-6 py-4">
                                        Nama Salesman
                                    </th>
                                    <th scope="col" className="px-6 py-4">
                                        Nama Toko
                                    </th>
                                    <th scope="col" className="px-6 py-4">
                                        Total Penjualan
                                    </th>
                                    <th scope="col" className="px-6 py-4">
                                        Pembayaran
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                
                            </tbody>
                        </table>
                        <p className="pr-2 pt-4 text-md italic text-primary">
                            *perhatikan data laporan sesuai dengan penjulan
                        </p>
                    </div>
                )}
            </div>
        </>
    )
}