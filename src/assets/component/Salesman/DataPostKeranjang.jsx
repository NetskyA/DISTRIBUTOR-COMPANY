import ControlTarget from "../../controller/ControlTarget"
import { Radio } from "@material-tailwind/react";
import LogoShow from "../../images/image-modal/show.png"
import React, { useEffect, useState, useRef } from "react";
import dataSet from "../../component/Salesman/DataRetur";
import "datatables.net-dt/css/jquery.dataTables.min.css";

export default function PostKeranjang() {
    const [isVisible, setIsVisible] = useState(true);
    const [cancelOrder, setCancelOrder] = useState(true)
    const toggleVisibilityCancel =()=>{
        setCancelOrder(!cancelOrder)
    }
    const toggleVisibility = () => {
        setIsVisible(!isVisible);
    };
    return (
        <>
            <div className="cover flex">

                {/* nanti digunakan memanggil nama sesuai akun*/}
                <div className="header lg:w-full md:w-1/2 text-primary text-4xl font-semibold">
                    <p>Post Keranjang</p>
                </div>
                <div className="rounded-xl lg:w-1/2 float-right mr-0 mx-auto text-2xl font-semibold">
                    <ControlTarget />
                </div>
                {/* untuk memanggil function controller target salesman */}
            </div>

            <div className="w-full mt-16 mx-auto border-2 rounded-xl" style={{ boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px" }}>
                <p className="pt-8 text-4xl font-semibold text-center text-primary">Data Order</p>
                <div className="cover m-5 mb-6">
                    <table className="text-left text-2xl font-light border rounded-xl w-full" style={{ boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px" }}>
                        <thead className="border-b font-medium dark:border-neutral-500">
                            <tr>
                                <th scope="col" className="px-6 py-4">List</th>
                                <th scope="col" className="px-6 py-4">Id Order</th>
                                <th scope="col" className="px-6 py-4">Nama Toko</th>
                                <th scope="col" className="px-6 py-4">Wilayah</th>
                                <th scope="col" className="px-6 py-4">Area</th>
                                <th scope="col" className="px-6 py-4">Subtotal</th>
                                <th scope="col" className="px-6 py-4">Metode Pembayaran</th>
                                <th scope="col" className="px-6 py-4">Detail</th>
                                <th scope="col" className="px-6 py-4">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="border-b dark:border-neutral-500">
                                <td className="whitespace-nowrap px-6 py-4 font-medium">
                                    {/* check box untuk select semua data sebelum kirim admin penjualan */}
                                    <input type="checkbox" className="w-8 h-8 border-2 border-primary rounded-lg" id="" />
                                </td>
                                <td className="whitespace-nowrap px-6 py-4 font-medium">ORD0001</td>
                                <td className="whitespace-nowrap px-6 py-4 font-medium">TK .Sehat Selasa</td>
                                <td className="whitespace-nowrap px-6 py-4">Surabaya</td>
                                <td className="whitespace-nowrap px-6 py-4">Ngagel</td>
                                <td className="whitespace-nowrap px-6 py-4">Rp. 120.000</td>
                                <td className="whitespace-nowrap px-6 py-4">Transfer</td>
                                <td onClick={toggleVisibility} className="whitespace-nowrap px-6 py-4 font-semibold text-primary" style={{ cursor: "pointer" }}>{isVisible ? 'Buka' : 'Tutup'}</td>
                                <td className="whitespace-nowrap px-6 py-4" onClick={toggleVisibilityCancel}>
                                    {cancelOrder ? <button className="bg-primary w-36 h-12 rounded-lg"><p>Cancel</p></button> : <button className="bg-gray-300 w-36 h-12 rounded-lg"><p>Batal</p></button>}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                {!isVisible &&
                    <div className="ms ms-14 mt-5">
                        <p className="text-2xl ps-5 font-semibold text-primary">Detail</p>
                        <div className="cover m-5">
                            <table className="text-left text-2xl mb-16 font-light border rounded-xl w-full" style={{ boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px" }}>
                                <thead className="border-b font-medium dark:border-neutral-500">
                                    <tr>
                                        <th scope="col" className="px-6 py-4">Nama Barang</th>
                                        <th scope="col" className="px-6 py-4">Qty Pcs</th>
                                        <th scope="col" className="px-6 py-4">Qty Karton</th>
                                        <th scope="col" className="px-6 py-4">Harga</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr className="border-b dark:border-neutral-500">
                                        <td className="whitespace-nowrap px-6 py-4 font-medium">Kecap Manis Bango 12 ml</td>
                                        <td className="whitespace-nowrap px-6 py-4">0</td>
                                        <td className="whitespace-nowrap px-6 py-4">5</td>
                                        <td className="whitespace-nowrap px-6 py-4">Rp. 20.000</td>
                                    </tr>
                                    <tr className="border-b dark:border-neutral-500">
                                        <td className="whitespace-nowrap px-6 py-4 font-medium">Kecap Manis Bango 12 ml</td>
                                        <td className="whitespace-nowrap px-6 py-4">0</td>
                                        <td className="whitespace-nowrap px-6 py-4">5</td>
                                        <td className="whitespace-nowrap px-6 py-4">Rp. 20.000</td>
                                    </tr>
                                    <tr className="border-b dark:border-neutral-500">
                                        <td className="whitespace-nowrap px-6 py-4 font-medium">Kecap Manis Bango 12 ml</td>
                                        <td className="whitespace-nowrap px-6 py-4">0</td>
                                        <td className="whitespace-nowrap px-6 py-4">5</td>
                                        <td className="whitespace-nowrap px-6 py-4">Rp. 20.000</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>}

            </div>


            <div className="flex mb-28">
                <div className="w w-full mt-10 mb-5">
                    <p className="pr-2 pt-4 text-md italic text-primary">*Pastikan sebelum submit data benar!!!</p>
                </div>
                <div className="w w-52 ms-14 mt-10 mb-5 float-right">
                    <button className="bg-primary w-52 h-16 rounded-xl text-white hover:bg-gray-300 hover:text-primary font-bold py-2 px-4">
                        Submit
                    </button>
                </div>
            </div>


            <hr className="h-px my-8 rounded-xl bg-gray-400 border" />

        </>
    )
}