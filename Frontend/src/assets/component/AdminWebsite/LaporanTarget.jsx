import ControlTarget from "../../controller/ControlTarget"
import "datatables.net-dt/css/jquery.dataTables.min.css";
import LogoPrint from "../../images/image-navbar/printer.png";
import { useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";
import formatter from "../../controller/formatter";
import LogoPerusahaan from "../../images/image-login/icon.png"

export default function LaporanTarget() {
    const [isVisible, setIsVisible] = useState(true);
    const toggleVisibility = () => {
        setIsVisible(!isVisible);
    };
    const Print = () => {
        //console.log('print');  
        let printContents = document.getElementById('NotaCetakSales').innerHTML;
        let originalContents = document.body.innerHTML;
        document.body.innerHTML = printContents;
        window.print();
        document.body.innerHTML = originalContents;
    }
    return (
        <>
            <div className="cover selectdisable flex">
                <div className="header lg:w-full md:w-1/2 text-primary text-4xl font-semibold">
                    <p>Laporan Target & Realisasi</p>
                </div>
                <div className="rounded-xl lg:w-1/2 float-right mr-0 mx-auto text-2xl font-semibold">
                    {/* <ControlTarget /> */}
                </div>
            </div>
            <div className="selectdisable border-2 mt-10 border-gray-300 rounded-2xl w-1/3 h-72" style={{ boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px" }}>
                <div className="row ms-4 m-4 w-full" >
                    <div className="flex text-primary text-2xl">
                        <p className="pt-1 pr-2">Tanggal Awal : </p>
                        <input
                            type="date"
                            name="date"
                            id="dateStart"
                            className="border-0 text-2xl h-10"
                            required="dates" />
                    </div>
                    <div className="flex text-primary mt-3 text-2xl">
                        <p className="pt-1 pr-2">Tanggal Akhir :  </p>
                        <input
                            type="date"
                            name="date"
                            id="dateEnd"
                            className="border-0 text-2xl h-10"
                            required="dates" />
                    </div>
                    <div className="MngSales flex mt-3 text-primary text-2xl">
                        <p className="pt-1 w-40 pr-2">Divisi: </p>
                        <div className="Uang flex ms-5">
                            <input className="relative float-left -ml-[1.5rem] mr-1 h-9 w-9 appearance-none rounded-full border-2 border-solid border-neutral-300 before:pointer-events-none before:absolute before:h-4 before:w-4 before:scale-0 before:rounded-full before:bg-transparent before:opacity-0 before:shadow-[0px_0px_0px_13px_transparent] before:content-[''] after:absolute after:z-[1] after:block after:h-4 after:w-4 after:rounded-full after:content-[''] checked:border-primary checked:before:opacity-[0.16] checked:after:absolute checked:after:left-1/2 checked:after:top-1/2 checked:after:h-[0.625rem] checked:after:w-[0.625rem] checked:after:rounded-full checked:after:border-primary checked:after:bg-primary checked:after:content-[''] checked:after:[transform:translate(-50%,-50%)] hover:cursor-pointer hover:before:opacity-[0.04] hover:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:shadow-none focus:outline-none focus:ring-0 focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] checked:focus:border-primary checked:focus:before:scale-100 checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] dark:border-neutral-600 dark:checked:border-primary dark:checked:after:border-primary dark:checked:after:bg-primary dark:focus:before:shadow-[0px_0px_0px_13px_rgba(255,255,255,0.4)] dark:checked:focus:border-primary dark:checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca]"
                                type="radio"
                                name="flexRadioDefault"
                                id="radioDefault01" value="Tunai" />
                            <label className="mt-2 ms-2 inline-block pl-[0.15rem] hover:cursor-pointer" htmlFor="radioDefault01">
                                Salesman
                            </label>
                        </div>
                        <div className="Barang flex ms-10">
                            <input className="relative float-left -ml-[1.5rem] mr-1 h-9 w-9 appearance-none rounded-full border-2 border-solid border-neutral-300 before:pointer-events-none before:absolute before:h-4 before:w-4 before:scale-0 before:rounded-full before:bg-transparent before:opacity-0 before:shadow-[0px_0px_0px_13px_transparent] before:content-[''] after:absolute after:z-[1] after:block after:h-4 after:w-4 after:rounded-full after:content-[''] checked:border-primary checked:before:opacity-[0.16] checked:after:absolute checked:after:left-1/2 checked:after:top-1/2 checked:after:h-[0.625rem] checked:after:w-[0.625rem] checked:after:rounded-full checked:after:border-primary checked:after:bg-primary checked:after:content-[''] checked:after:[transform:translate(-50%,-50%)] hover:cursor-pointer hover:before:opacity-[0.04] hover:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:shadow-none focus:outline-none focus:ring-0 focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] checked:focus:border-primary checked:focus:before:scale-100 checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] dark:border-neutral-600 dark:checked:border-primary dark:checked:after:border-primary dark:checked:after:bg-primary dark:focus:before:shadow-[0px_0px_0px_13px_rgba(255,255,255,0.4)] dark:checked:focus:border-primary dark:checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca]"
                                type="radio"
                                name="flexRadioDefault"
                                id="radioDefault01" value="Transfer" />
                            <label className="mt-2 ms-2 inline-block pl-[0.15rem] hover:cursor-pointer" htmlFor="radioDefault01">
                                Supervisor
                            </label>
                        </div>
                    </div>
                </div>
                <div className="flex float-right" >
                    <button onClick={toggleVisibility} className="bg-primary w-52 m-4 h-16 rounded-xl text-white hover:bg-gray-300 hover:text-primary font-bold py-2 px-4">
                        Cari
                    </button>
                </div>
            </div>
            {!isVisible &&
                <>
                    <div id="NotaCetakSales" className="cover mt-12 border-2 mb-14 rounded-xl" style={{ width: "100%", boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px" }}>
                        <div className="flex mx-auto items-center justify-center">
                            <p className="pt-4 text-4xl font-semibold text-center text-primary">
                                Laporan Penjualan Salesman
                            </p>
                            <img src={LogoPerusahaan} className="w-32 h-32 mt-4" alt="logo perusahaan" />
                        </div>
                        <div className="cover mb-28">
                            <div className="covertable m-2">
                                <table className="text-left text-2xl mt-5 font-light border rounded-xl w-full" style={{ boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px" }}     >
                                    <thead className="border-b font-medium dark:border-neutral-500">
                                        <tr>
                                            <th scope="col" className="px-6 py-4">
                                                Id Salesman
                                            </th>
                                            <th scope="col" className="px-6 py-4">
                                                Nama Salesman
                                            </th>
                                            <th scope="col" className="px-6 py-4">
                                                Tanggal
                                            </th>
                                            <th scope="col" className="px-6 py-4">
                                                Target
                                            </th>
                                            <th scope="col" className="px-6 py-4">
                                                Realisasi
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>

                                        <tr className="border-b dark:border-neutral-500" >
                                            <td className="whitespace-nowrap px-6 py-4 font-medium">

                                            </td>
                                            <td className="whitespace-nowrap px-6 py-4 font-medium">

                                            </td>
                                            <td className="whitespace-nowrap px-6 py-4">

                                            </td>
                                            <td className="whitespace-nowrap px-6 py-4">

                                            </td>
                                            <td className="whitespace-nowrap px-6 py-4 text-red-500">

                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                                <p className="pr-2 pt-4 text-md italic text-primary">
                                    *perhatikan data laporan sesuai dengan penjulan
                                </p>
                            </div>
                        </div>
                    </div>
                </>
            }
            <div className="kanan w-1/3">
                <div className="prints">
                    <div className="w-full">
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
        </>
    )
}