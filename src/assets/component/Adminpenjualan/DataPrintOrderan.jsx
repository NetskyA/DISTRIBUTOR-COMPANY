import React, { useEffect, useState, useRef } from "react";
import Waktu from "../../controller/ControlWaktu"
import LogoPrint from "../../images/image-navbar/printer.png"

export default function DataPrintOrderan() {
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
        let printContents = document.getElementById('NotaCetak').innerHTML;
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
                    <p>Print Nota Pemesanan</p>
                </div>
                <div className="rounded-xl lg:w-1/2 float-right mr-0 mx-auto text-2xl font-semibold">
                    {/* <ControlTarget /> */}
                </div>
            </div>
            <div className="selectdisable border-2 mt-10 mx-auto items-center flex border-gray-300 rounded-2xl lg:w-full h-full" style={{ boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px" }}>
                {/* berisi from retur */}
                <div className="mx-auto items-center">
                    <p className="pt-8 text-4xl font-semibold text-center text-primary">Daftar Area</p>
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
                        </div>
                    </div>
                </div>
            </div>
            {!isVisible &&
                <div className="mt-5 bg-gray-200 shadow-2xl rounded-xl">
                    <p className="text-3xl ps-5 pt-2 font-semibold text-primary">SUB NGAGEL</p>
                    <div className="cover m-5">
                        <div id="NotaCetak" className="text-2xl bg-yellow-100 mb-12 border-2 border-dashed border-gray-400 w-full" style={{ boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px" }}>
                            <div className="m-3 mb-80">
                                <div className="kopNota flex">
                                    <div className="kiri w-full text-base">
                                        <div className="flex m-4">
                                            <p className="w-44">No. Pemesanan : </p>
                                            <p>ORD0001</p>
                                        </div>
                                        <div className="flex m-4">
                                            <p className="w-44">Alamat : </p>
                                            <p>Ngagel....</p>
                                        </div>
                                        <div className="flex m-4">
                                            <p className="w-44">Tanggal : </p>
                                            <p>11/11/2023</p>
                                        </div>
                                        <div className="flex m-4">
                                            <p className="w-44">Waktu : </p>
                                            <p><Waktu /></p>
                                        </div>
                                        <div className="flex m-4">
                                            <p className="w-44">Yth : </p>
                                            <p>Pelangggan, (Ditempat)</p>
                                        </div>
                                    </div>
                                    <div className="kanan w-2/4">
                                        <div className="m-2">
                                            <p className="text-2xl text-end font-bold">CV. LAJU JAYA CEMERLANG</p>
                                        </div>
                                        <div className="m-2">
                                            <p className="text-base text-end">Jl. Ngagel Jaya Tengah No.73-77 </p>
                                        </div>
                                        <div className="m-2">
                                            <p className="text-base text-end">lajujayacemerlang@gmail.com </p>
                                        </div>
                                        <div className="m-2">
                                            <p className="text-base text-end">(021) 888</p>
                                        </div>
                                    </div>
                                </div>
                                <hr className="my-10 mt-18 border border-dashed border-gray-600" />
                                <div className="content">
                                    <table className="text-left text-xl font-light w-full">
                                        <thead className="border font-medium dark:border-neutral-200">
                                            <tr>
                                                <th scope="col" className="px-6 py-4">No</th>
                                                <th scope="col" className="px-6 py-4">Nama Produk</th>
                                                <th scope="col" className="px-6 py-4">Jumlah</th>
                                                <th scope="col" className="px-6 py-4">Harga Pcs</th>
                                                <th scope="col" className="px-6 py-4">Harga Karton</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr className="border-b dark:border-neutral-500">
                                                <td className="whitespace-nowrap px-6 py-4 font-medium">0001</td>
                                                <td className="whitespace-nowrap px-6 py-4">Kecap Manis Bango 12 ml</td>
                                                <td className="whitespace-nowrap px-6 py-4 flex">7 <span><p className="ps-2">Pcs</p></span></td>
                                                <td className="whitespace-nowrap px-6 py-4">Rp. 40.000</td>
                                                <td className="whitespace-nowrap px-6 py-4">0</td>
                                            </tr>
                                        </tbody>
                                        <tbody>
                                            <tr className="border-b dark:border-neutral-500">
                                                <td className="whitespace-nowrap px-6 py-4 font-medium">0002</td>
                                                <td className="whitespace-nowrap px-6 py-4">Susu UHT Ultra Milk 300 ml</td>
                                                <td className="whitespace-nowrap px-6 py-4 flex">5  <span><p className="ps-2">Karton</p></span></td>
                                                <td className="whitespace-nowrap px-6 py-4">Rp. 0</td>
                                                <td className="whitespace-nowrap px-6 py-4">Rp. 500.000</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                                <hr className="my-3 mt-18 border border-dashed border-gray-600" />
                                <div className="text-lg">
                                    <div className="flex">
                                        <div className="text-end float-right">Total Pcs : </div>
                                        <span className="ms-5">Rp. 40.000</span>
                                    </div>
                                    <div className="flex">
                                        <div className="text-end float-right">Total Karton : </div>
                                        <span className="ms-5">Rp. 500.000</span>
                                    </div>
                                    <div className="flex">
                                        <div className="text-end float-right">Subtotal : </div>
                                        <span className="ms-5">Rp. 540.000</span>
                                    </div>
                                </div>
                                <hr className="my-3 mb-10 border border-dashed border-gray-600" />
                                <div className="kopNota flex float-right w-1/3">
                                    <div className="kiri w-2/5 text-xl mr-20">
                                        <div className="m-4">
                                            <p className="w-44" style={{ fontSize: "15px" }}>Hormat Kami, </p>
                                            <p className="mt-36 ms-9">...........</p>
                                        </div>
                                    </div>
                                    <div className="kanan w-2/5">
                                        <div className="m-2">
                                            <p className="w-44">Pelanggan, </p>
                                            <p className="mt-36 ms-5">...........</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            }
            <div className="prints">
                <div className="w-full border rounded-xl " style={{ boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px" }}>
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
            <hr className="h-px my-10 mt-18 mb-52" />
            <hr className="h-px my-10 mt-18 mb-52" />

        </>
    )
}