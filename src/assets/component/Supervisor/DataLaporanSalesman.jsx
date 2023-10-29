import DataTarget from "../../controller/ControlTarget"
import { Radio } from "@material-tailwind/react";
import React, { useEffect, useRef } from "react";
import "datatables.net-dt/css/jquery.dataTables.min.css";

export default function ReturnBarang() {

    return (
        <>
            <div className="cover selectdisable flex">

                {/* nanti digunakan memanggil nama sesuai akun*/}
                <div className="header lg:w-full md:w-1/2 text-primary text-4xl font-semibold">
                    <p>Retur</p>
                </div>
                <div className="rounded-xl lg:w-1/2 float-right mr-0 mx-auto text-2xl font-semibold">
                    {/* <DataTarget /> */}
                </div>
                {/* untuk memanggil function controller target salesman */}
            </div>
            <div className="selectdisable border-2 mt-10 border-gray-300 rounded-2xl w-1/3 h-full" style={{ boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px" }}>
                {/* berisi from retur */}
                <div className="row ms-4 m-4 w-full">
                    <div className="flex text-primary text-2xl">
                        <p className="pt-1 pr-2">Tanggal Awal : </p>
                        <input type="date" name="date" id="dates" className="border-0 text-2xl h-10" required="dates" />
                    </div>
                    <div className="flex text-primary mt-3 text-2xl">
                        <p className="pt-1 pr-2">Tanggal Akhir : </p>
                        <input type="date" name="date" id="dates" className="border-0 text-2xl h-10" required="dates" />
                    </div>
                </div>
                {/* berisi form retur */}
                <div className="flex items-center justify-center">
                    <button className="bg-primary m-4 w-full h-16 rounded-xl text-white hover:bg-gray-300 hover:text-primary font-bold py-2 px-4">
                        Supervisor
                    </button>
                    <button className="bg-primary w-full m-4 h-16 rounded-xl text-white hover:bg-gray-300 hover:text-primary font-bold py-2 px-4">
                        Salesman
                    </button>
                </div>
            </div>
            <p className="pr-2 pt-4 text-md italic text-primary">*pastikan memilih tanggal dan user sudah benar</p>
            <div className="w-full mt-16 mx-auto border-2 rounded-xl" style={{ boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px" }}>
                <div className="cover m-5">
                    <p className="pt-4 text-4xl font-semibold text-center text-primary">Laporan Penjualan Salesman</p>
                    <table className="text-left text-2xl mt-5 font-light border rounded-xl w-full" style={{ boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px" }}>
                        <thead className="border-b font-medium dark:border-neutral-500">
                            <tr>
                                <th scope="col" className="px-6 py-4">Id Salesman</th>
                                <th scope="col" className="px-6 py-4">Nama Salesman</th>
                                <th scope="col" className="px-6 py-4">Tanggal</th>
                                <th scope="col" className="px-6 py-4">Target</th>
                                <th scope="col" className="px-6 py-4">Realisasi</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="border-b dark:border-neutral-500">
                                <td className="whitespace-nowrap px-6 py-4 font-medium">SLS0001</td>
                                <td className="whitespace-nowrap px-6 py-4 font-medium">Abdur Rahman</td>
                                <td className="whitespace-nowrap px-6 py-4"><span>01/09/2023</span><span>31/09/2023</span> </td>
                                <td className="whitespace-nowrap px-6 py-4">Rp. <span>135.350.000</span></td>
                                <td className="whitespace-nowrap px-6 py-4 text-red-500">Rp. <span>90.150.000</span></td>
                            </tr>
                            <tr className="border-b dark:border-neutral-500">
                                <td className="whitespace-nowrap px-6 py-4 font-medium">SLS0002</td>
                                <td className="whitespace-nowrap px-6 py-4 font-medium">Abdur Rahman</td>
                                <td className="whitespace-nowrap px-6 py-4"><span>01/09/2023</span><span>31/09/2023</span> </td>
                                <td className="whitespace-nowrap px-6 py-4">Rp. <span>135.350.000</span></td>
                                <td className="whitespace-nowrap px-6 py-4 text-red-500">Rp. <span>90.150.000</span></td>
                            </tr>
                            <tr className="border-b dark:border-neutral-500">
                                <td className="whitespace-nowrap px-6 py-4 font-medium">SLS0003</td>
                                <td className="whitespace-nowrap px-6 py-4 font-medium">Abdur Rahman</td>
                                <td className="whitespace-nowrap px-6 py-4"><span>01/09/2023</span><span>31/09/2023</span> </td>
                                <td className="whitespace-nowrap px-6 py-4">Rp. <span>135.350.000</span></td>
                                <td className="whitespace-nowrap px-6 py-4 text-green-600">Rp. <span>135.150.000</span></td>
                            </tr>
                            <tr className="border-b dark:border-neutral-500">
                                <td className="whitespace-nowrap px-6 py-4 font-medium">SLS0004</td>
                                <td className="whitespace-nowrap px-6 py-4 font-medium">Abdur Rahman</td>
                                <td className="whitespace-nowrap px-6 py-4"><span>01/09/2023</span><span>31/09/2023</span> </td>
                                <td className="whitespace-nowrap px-6 py-4">Rp. <span>135.350.000</span></td>
                                <td className="whitespace-nowrap px-6 py-4 text-green-600">Rp. <span>135.150.000</span></td>
                            </tr>
                        </tbody>
                    </table>
                    <p className="pr-2 pt-4 text-md italic text-primary">*perhatikan data laporan sesuai dengan penjulan</p>
                </div>
            </div>

            <hr className="h-px my-8 rounded-xl bg-gray-400 border" />

        </>
    )
}