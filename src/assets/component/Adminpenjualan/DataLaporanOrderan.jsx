import React, { useEffect, useState, useRef } from "react";
import LogoPrint from "../../images/image-navbar/printer.png"

export default function DataLaporanOrderan() {
    const [isVisible, setIsVisible] = useState(true);
    const toggleVisibility = () => {
        setIsVisible(!isVisible);
    };

    const [isVisible2, setIsVisible2] = useState(true);
    const toggleVisibility2 = () => {
        setIsVisible2(!isVisible2);
    };

    const [isVisible3, setIsVisible3] = useState(true);
    const toggleVisibility3 = () => {
        setIsVisible3(!isVisible3);
    };
    const Print = () => {
        //console.log('print');  
        let printContents = document.getElementById('CetakLaporan').innerHTML;
        let originalContents = document.body.innerHTML;
        document.body.innerHTML = printContents;
        window.print();
        document.body.innerHTML = originalContents;
    }
    return (
        <>
            <div className="cover selectdisable flex">
                {/* nanti digunakan memanggil nama sesuai akun*/}
                <div className="header lg:w-full md:w-1/2 text-primary text-4xl font-semibold">
                    <p>Laporan Penjualan</p>
                </div>
                <div className="rounded-xl lg:w-1/2 float-right mr-0 mx-auto text-2xl font-semibold">
                    {/* <ControlTarget /> */}
                </div>
            </div>
            <div className="isi border-2 mt-10 mx-auto items-center border-gray-300 rounded-2xl lg:w-full h-full" style={{ boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px" }}>
                <div className="row ms-4 m-4 w-5/12 rounded-xl border-2">
                    <div className="m-4">
                        <div className="flex text-primary text-2xl">
                            <p className="pt-1 pr-2">Tanggal Awal : </p>
                            <input type="datetime-local" placeholder="tanggal awal" className="border border-primary rounded-lg text-xl h-10" name="date" id="date" />
                        </div>
                        <div className="flex mt-5 text-primary  text-2xl">
                            <p className="pr-2 pt-1">Tanggal Akhir: </p>
                            <input type="datetime-local" placeholder="tanggal akhir" className="border border-primary rounded-lg text-xl h-10" name="date2" id="date2" />
                        </div>
                        <div className="flex mt-7 m-4 text-primary float-right text-2xl" >
                            <button className="w-52 h-14 items-end bg-primary rounded-xl hover:bg-gray-300 text-white hover:text-primary font-bold py-2 px-4">
                                Cari
                            </button>
                        </div>
                    </div>
                </div>
                <hr className="h-px my-10 mt-1 mb-1 border-2 border-gray-300" />
                <div className="selectdisable flex mb-6">
                    {/* berisi from retur */}
                    <div className="mx-auto items-center">
                        <p className="pt-3 text-4xl font-semibold text-center text-primary">Daftar Area</p>
                        <div className="w-full\ items-center mx-auto m-6">
                            <div className="grid grid-cols-6 lg:grid-cols-8 text-primary text-2xl" >
                                <button onClick={toggleVisibility} className="w-52 h-14 m-2 items-end bg-primary rounded-2xl hover:bg-gray-300 text-white hover:text-primary font-bold py-2 px-4">
                                    NGAGEL
                                </button>
                                <button onClick={toggleVisibility2} className="w-52 h-14 m-2 items-end bg-primary rounded-2xl hover:bg-gray-300 text-white hover:text-primary font-bold py-2 px-4">
                                    KUTISARI
                                </button>
                                <button onClick={toggleVisibility3} className="w-52 h-14 m-2 items-end bg-primary rounded-2xl hover:bg-gray-300 text-white hover:text-primary font-bold py-2 px-4">
                                    DARMO
                                </button>
                                <button className="w-52 h-14 m-2 items-end bg-primary rounded-2xl hover:bg-gray-300 text-white hover:text-primary font-bold py-2 px-4">
                                    KERTAJAYA
                                </button>
                                <button className="w-52 h-14 m-2 items-end bg-primary rounded-2xl hover:bg-gray-300 text-white hover:text-primary font-bold py-2 px-4">
                                    KETINTANG
                                </button>
                                <button className="w-52 h-14 m-2 items-end bg-primary rounded-2xl hover:bg-gray-300 text-white hover:text-primary font-bold py-2 px-4">
                                    SIER
                                </button>
                                <button className="w-52 h-14 m-2 items-end bg-primary rounded-2xl hover:bg-gray-300 text-white hover:text-primary font-bold py-2 px-4">
                                    G. SARI
                                </button>
                                <button className="w-52 h-14 m-2 items-end bg-primary rounded-2xl hover:bg-gray-300 text-white hover:text-primary font-bold py-2 px-4">
                                    MERR
                                </button>
                                <button className="w-52 h-14 m-2 items-end bg-primary rounded-2xl hover:bg-gray-300 text-white hover:text-primary font-bold py-2 px-4">
                                    MERR
                                </button>
                                <button className="w-52 h-14 m-2 items-end bg-primary rounded-2xl hover:bg-gray-300 text-white hover:text-primary font-bold py-2 px-4">
                                    MERR
                                </button>
                                <button className="w-52 h-14 m-2 items-end bg-primary rounded-2xl hover:bg-gray-300 text-white hover:text-primary font-bold py-2 px-4">
                                    MERR
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {!isVisible &&
                <div id="CetakLaporan">
                    <div className="selectdisable border-2 mt-10 flex border-gray-300 rounded-2xl lg:w-full h-full" style={{ boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px" }}>
                        {/* berisi from retur */}
                        <div className="w-full m-5">
                            <table className="text-left text-2xl font-light border rounded-xl w-full" style={{ boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px" }}>
                                <thead className="border-b font-medium dark:border-neutral-500">
                                    <tr>
                                        <th scope="col" className="px-6 py-4">ID Order</th>
                                        <th scope="col" className="px-6 py-4">Nama Konsumen</th>
                                        <th scope="col" className="px-6 py-4">Nama Toko</th>
                                        <th scope="col" className="px-6 py-4">Nama Salesman</th>
                                        <th scope="col" className="px-6 py-4">Tanggal</th>
                                        <th scope="col" className="px-6 py-4">Subtotal</th>
                                        <th scope="col" className="px-6 py-4">Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr className="border-b dark:border-neutral-500">
                                        <td className="whitespace-nowrap px-6 py-4 font-medium">ORD0001</td>
                                        <td className="whitespace-nowrap px-6 py-4">bude ayu</td>
                                        <td className="whitespace-nowrap px-6 py-4">Hypermart</td>
                                        <td className="whitespace-nowrap px-6 py-4">Alvin</td>
                                        <td className="whitespace-nowrap px-6 py-4">11/11/2023</td>
                                        <td className="whitespace-nowrap px-6 py-4">Rp. 1.230.000</td>
                                        <td className="whitespace-nowrap px-6 py-4 text-primary">Lunas</td>
                                    </tr>
                                    <tr className="border-b dark:border-neutral-500">
                                        <td className="whitespace-nowrap px-6 py-4 font-medium">ORD0002</td>
                                        <td className="whitespace-nowrap px-6 py-4">bude ayu</td>
                                        <td className="whitespace-nowrap px-6 py-4">Hypermart</td>
                                        <td className="whitespace-nowrap px-6 py-4">Alvin</td>
                                        <td className="whitespace-nowrap px-6 py-4">11/11/2023</td>
                                        <td className="whitespace-nowrap px-6 py-4">Rp. 1.230.000</td>
                                        <td className="whitespace-nowrap px-6 py-4 text-primary">Lunas</td>
                                    </tr>
                                    <tr className="border-b dark:border-neutral-500">
                                        <td className="whitespace-nowrap px-6 py-4 font-medium">ORD0003</td>
                                        <td className="whitespace-nowrap px-6 py-4">bude ayu</td>
                                        <td className="whitespace-nowrap px-6 py-4">Hypermart</td>
                                        <td className="whitespace-nowrap px-6 py-4">Alvin</td>
                                        <td className="whitespace-nowrap px-6 py-4">11/11/2023</td>
                                        <td className="whitespace-nowrap px-6 py-4">Rp. 1.230.000</td>
                                        <td className="whitespace-nowrap px-6 py-4 text-primary">Lunas</td>
                                    </tr>
                                    <tr className="border-b dark:border-neutral-500">
                                        <td className="whitespace-nowrap px-6 py-4 font-medium">ORD0004</td>
                                        <td className="whitespace-nowrap px-6 py-4">bude ayu</td>
                                        <td className="whitespace-nowrap px-6 py-4">Hypermart</td>
                                        <td className="whitespace-nowrap px-6 py-4">Alvin</td>
                                        <td className="whitespace-nowrap px-6 py-4">11/11/2023</td>
                                        <td className="whitespace-nowrap px-6 py-4">Rp. 1.230.000</td>
                                        <td className="whitespace-nowrap px-6 py-4 text-primary">Lunas</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div >
                    <div id="infoTotal" className="cover bg-gray-200 w-5/12 mt-10 rounded-xl shadow-2xl">
                        <div className="m-5 mt-4">
                            <div className="cover flex m-4 pt-4">
                                <p className="text-2xl w-52">Target Penjualan : </p>
                                <p className="text-primary text-2xl">Rp. 118.500.000</p>
                            </div>
                            <div className="cover flex m-4">
                                <p className="text-2xl w-52">Average Bulanan : </p>
                                <p className="text-primary text-2xl">Rp. 80.500.000</p>
                            </div>
                            <div className="cover flex m-4 pb-4">
                                <div className="kiri w-full flex">
                                    <p className="text-2xl w-52">Kekurangan : </p>
                                    <p className="text-primary text-2xl">Rp. 0</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            }
            <div className="kanan w-1/3">
                <div className="prints">
                    <div className="w-full border rounded-xl">
                        <div className="m-4">
                            <div className="noId flex text-primary text-2xl" onClick={Print}>
                                <img src={LogoPrint} className="m-2 w-14 h-14" alt="" />
                                <button className="w-52 h-14 m-2 items-end bg-primary rounded-xl hover:bg-gray-300 text-white hover:text-primary font-bold py-2 px-4">
                                    Print
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <hr className="h-px my-10 mt-18 mb-52" />
            <hr className="h-px my-10 mt-18 mb-52" />

        </>
    )
}