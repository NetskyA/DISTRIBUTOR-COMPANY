/* eslint-disable*/
import DataTarget from "../../controller/ControlTarget"
import { Radio } from "@material-tailwind/react";
import React, { useEffect, useRef } from "react";
import dataSet from "../Salesman/DataRetur";
import "datatables.net-dt/css/jquery.dataTables.min.css";
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button } from "@nextui-org/react";
import $ from "jquery";
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
                {/* nanti digunakan memanggil nama sesuai akun*/}
                <div className="header lg:w-full md:w-1/2 text-primary text-4xl font-semibold">
                    <p>Target Salesman</p>
                </div>
                <div className="rounded-xl lg:w-1/2 float-right mr-0 mx-auto text-2xl font-semibold">
                    {/* <DataTarget /> */}
                </div>
                {/* untuk memanggil function controller target salesman */}
            </div>
            <div className="cover mt-12 border-2 mb-16 rounded-xl" style={{ width: "100%", boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px" }}>
                <p className="pt-8 text-4xl font-semibold text-center text-primary">Data Target</p>
                <div className="cover m-2 mt-5">
                    <table className="text-left text-2xl font-light border rounded-xl w-full" style={{ boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px" }}>
                        <thead className="border-b font-medium dark:border-neutral-500">
                            <tr>
                                <th scope="col" className="px-6 py-4">Id Salesman</th>
                                <th scope="col" className="px-6 py-4">Nama Salesman</th>
                                <th scope="col" className="px-6 py-4">Target Terakhir</th>
                                <th scope="col" className="px-6 py-4">Realisasi Target</th>
                                <th scope="col" className="px-6 py-4">Target</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="border-b dark:border-neutral-500">
                                <td className="whitespace-nowrap px-6 py-4 font-medium">SLS0001</td>
                                <td className="whitespace-nowrap px-6 py-4 font-medium">Abdur Rahman</td>
                                <td className="whitespace-nowrap px-6 py-4">Rp. <span>120.000.000</span></td>
                                <td className="whitespace-nowrap px-6 py-4 text-green-600">Rp. <span>135.350.000</span></td>
                                <td className="whitespace-nowrap px-6 py-4 text-primary">
                                    <input type="number" className="text-2xl text-primary border-0 bg-gray-200 rounded-lg" placeholder="0" />
                                </td>
                            </tr>
                            <tr className="border-b dark:border-neutral-500">
                                <td className="whitespace-nowrap px-6 py-4 font-medium">SLS0002</td>
                                <td className="whitespace-nowrap px-6 py-4 font-medium">Ahmad Madsory</td>
                                <td className="whitespace-nowrap px-6 py-4">Rp. <span>110.500.000</span></td>
                                <td className="whitespace-nowrap px-6 py-4 text-red-600">Rp. <span>90.150.000</span></td>
                                <td className="whitespace-nowrap px-6 py-4 text-primary">
                                    <input type="number" className="text-2xl text-primary border-0 bg-gray-200 rounded-lg" placeholder="0" />
                                </td>
                            </tr>
                            <tr className="border-b dark:border-neutral-500">
                                <td className="whitespace-nowrap px-6 py-4 font-medium">SLS0003</td>
                                <td className="whitespace-nowrap px-6 py-4 font-medium">Ahmad Madsory</td>
                                <td className="whitespace-nowrap px-6 py-4">Rp. <span>110.500.000</span></td>
                                <td className="whitespace-nowrap px-6 py-4 text-red-600">Rp. <span>90.150.000</span></td>
                                <td className="whitespace-nowrap px-6 py-4 text-primary">
                                    <input type="number" className="text-2xl text-primary border-0 bg-gray-200 rounded-lg" placeholder="0" />
                                </td>
                            </tr>
                            <tr className="border-b dark:border-neutral-500">
                                <td className="whitespace-nowrap px-6 py-4 font-medium">SLS0004</td>
                                <td className="whitespace-nowrap px-6 py-4 font-medium">Ahmad Madsory</td>
                                <td className="whitespace-nowrap px-6 py-4">Rp. <span>110.500.000</span></td>
                                <td className="whitespace-nowrap px-6 py-4 text-red-600">Rp. <span>90.150.000</span></td>
                                <td className="whitespace-nowrap px-6 py-4 text-primary">
                                    <input type="number" className="text-2xl text-primary border-0 bg-gray-200 rounded-lg" placeholder="0" />
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <div className="flex mb-10">
                <div className="w w-full mb-5">
                    <p className="pr-2 pt-4 text-md italic text-primary">*Pastikan data sama dengan perhitungan laporan !!!</p>
                </div>
                <div className="w w-52 ms-14 mb-5 float-right">
                    <button className="bg-primary w-52 h-16 rounded-xl text-white hover:bg-gray-300 hover:text-primary font-bold py-2 px-4">
                        Submit
                    </button>
                </div>
            </div>
            <hr className="h-px my-8 rounded-xl bg-gray-400 border" />
            {/* <DataDetailHistori/> */}
            {/* <hr className="h-px my-8 mt-10 mb-10 rounded-xl bg-gray-400 border" /> */}


        </>
    );
}