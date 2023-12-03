import ControlTarget from "../../controller/ControlTarget"
import { Radio } from "@material-tailwind/react";
import LogoShow from "../../images/image-modal/show.png"
import React, { useEffect, useState, useRef } from "react";
import dataSet from "../../component/Salesman/DataRetur";
import "datatables.net-dt/css/jquery.dataTables.min.css";
import { useLoaderData, useRevalidator } from "react-router-dom";
import formatter from "../../controller/formatter";
import client from "../../controller/client"
import { fromJSON } from "postcss";
export default function PostKeranjang() {
    const [isLoading, setLoading] = useState(false);
    const [cancelOrder, setCancelOrder] = useState(true)
    let revalidator = useRevalidator();
    const [refresh, setrefresh] = useState(false)
    const toggleVisibilityCancel = () => {
        setCancelOrder(!cancelOrder)
    }
    let temp = [];
    let tempData = useLoaderData()
    let tempDetail = tempData.post.detailTransaksi;
    for (let i = 0; i < tempData.post.headerTransaksi.length; i++) {
        temp.push(false);
    }

    const [isVisible, setIsVisible] = useState(temp);
    const [data, setdata] = useState(null)
    const toggleVisibility = (idx) => {
        let temp2 = isVisible;
        temp2[idx] = !temp2[idx];
        let tempvisible = temp2;
        if (temp2[idx]) {
            tempvisible = temp2.map((e, index) => (index != idx) ? false : true)
        }
        setIsVisible(tempvisible);
        setdata(null)
        if (!temp2[idx]) {
            setdata(null)
        } else {
            let tempdataDetail = tempDetail.filter((e) => e.id_transaksi === tempData.post.headerTransaksi[idx].id_transaksi)
            let dataDetail = [];
            for (let i = 0; i < tempdataDetail.length; i++) {
                let duplikat = false;
                for (let j = 0; j < dataDetail.length; j++) {
                    let idbarang1 = (tempData.post.listbarang[(tempdataDetail[i].id_detail_barang - 1)]);
                    // console.log(idbarang1);
                    let idbarang2 = (tempData.post.listbarang[dataDetail[j].id_detail_barang - 1]);
                    // console.log(idbarang2);
                    if (idbarang1.id_barang === idbarang2.id_barang) {
                        duplikat = true;
                        dataDetail[j].jumlah_barang_pcs += tempdataDetail[i].jumlah_barang_pcs
                        dataDetail[j].jumlah_barang_karton += tempdataDetail[i].jumlah_barang_karton
                        dataDetail[j].subtotal_barang += tempdataDetail[i].subtotal_barang
                    }
                }
                if (!duplikat) {
                    dataDetail.push({
                        id_transaksi: tempdataDetail[i].id_transaksi,
                        id_detail_barang: tempdataDetail[i].id_detail_barang,
                        jumlah_barang_pcs: tempdataDetail[i].jumlah_barang_pcs,
                        jumlah_barang_karton: tempdataDetail[i].jumlah_barang_karton,
                        subtotal_barang: tempdataDetail[i].subtotal_barang,
                        nama_barang: tempdataDetail[i].nama_barang
                    })
                }
            }
            setdata(dataDetail);
        }
        setrefresh(!refresh)
    };


    const post = async () => {
        setLoading(true)
        let checkbox = document.getElementsByName("check");
        let listid = []
        let tidakadacheck = true;
        checkbox.forEach(e => {
            if (e.checked) {
                tidakadacheck = false;
                listid.push(parseInt(e.value))
            }
        })
        if (!tidakadacheck) {
            await client.post("/api/updatePost", {
                cmd: "Send",
                id: listid
            })
        }
        for (let i = 0; i < checkbox.length; i++) {
            checkbox[i].checked = false;
        }
        revalidator.revalidate();
        setrefresh(!refresh);
        setTimeout(() => {
            setLoading(false),
                setrefresh(!refresh)
        }, 2000);
    }

    const cancel = async (id) => {
        let iddelete = tempData.post.headerTransaksi[id].id_transaksi
        console.log(iddelete)
        if (document.getElementsByName("check")[id].checked) {
            await client.post("/api/updatePost", {
                cmd: "Delete",
                id: [iddelete]
            })
        }
        for (let i = 0; i < checkbox.length; i++) {
            checkbox[i].checked = false;
        }
        revalidator.revalidate();
        setrefresh(!refresh);
    }
    return (
        <>
            {isLoading == true &&
                <div className="flex items-center bg-slate-200 rounded-xl h-screen">
                    <span className="loader"></span>
                </div>
            }
            {isLoading == false &&
                <>
                    <div className="cover flex">

                        {/* nanti digunakan memanggil nama sesuai akun*/}
                        <div className="header lg:w-full md:w-1/2 text-primary text-4xl font-semibold">
                            <p>Post Keranjang</p>
                        </div>
                        <div className="rounded-xl lg:w-1/2 float-right mr-0 mx-auto text-2xl font-semibold">
                            <ControlTarget current={tempData.targetSekarang} target={tempData.currtarget} />
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
                                    {tempData.post.headerTransaksi.map((e, index) => {

                                        return <tr key={index} className="border-b dark:border-neutral-500">
                                            <td className="whitespace-nowrap px-6 py-4 font-medium">
                                                {/* check box untuk select semua data sebelum kirim admin penjualan */}
                                                <input type="checkbox" className="w-8 h-8 border-2 border-primary rounded-lg" id="" value={e.id_transaksi} name="check" />
                                            </td>
                                            <td className="whitespace-nowrap px-6 py-4 font-medium">{e.id_transaksi}</td>
                                            <td className="whitespace-nowrap px-6 py-4 font-medium">{e.nama_toko}</td>
                                            <td className="whitespace-nowrap px-6 py-4">{e.kota}</td>
                                            <td className="whitespace-nowrap px-6 py-4">{e.kelurahan}</td>
                                            <td className="whitespace-nowrap px-6 py-4">{formatter.format(e.subtotal)}</td>
                                            <td className="whitespace-nowrap px-6 py-4">{(e.jenis_transaksi === 0) ? "Tunai" : "Transfer"}</td>
                                            <td onClick={() => toggleVisibility(index)} className="whitespace-nowrap px-6 py-4 font-semibold text-primary" style={{ cursor: "pointer" }}>{!isVisible[index] ? 'Buka' : 'Tutup'}</td>
                                            <td className="whitespace-nowrap px-6 py-4">
                                                <button className="bg-primary w-36 h-12 rounded-lg" onClick={() => cancel(index)}><p>Cancel</p></button>
                                            </td>
                                        </tr>
                                    })}

                                </tbody>
                            </table>
                        </div>

                        {data &&
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
                                            {data.map((e, index) => {
                                                return <tr key={index} className="border-b dark:border-neutral-500">
                                                    <td className="whitespace-nowrap px-6 py-4 font-medium">{e.nama_barang}</td>
                                                    <td className="whitespace-nowrap px-6 py-4">{e.jumlah_barang_pcs}</td>
                                                    <td className="whitespace-nowrap px-6 py-4">{e.jumlah_barang_karton}</td>
                                                    <td className="whitespace-nowrap px-6 py-4">{formatter.format(e.subtotal_barang)}</td>
                                                </tr>
                                            })}
                                        </tbody>
                                    </table>
                                </div>
                            </div>}

                    </div>
                    <div className="flex mb-28">
                        <div className="w w-full mt-5 mb-5">
                            <p className="pr-2 pt-4 text-md italic text-primary">*Wajib pilih satu kolom untuk membuka detail</p>
                        </div>
                        <div className="w w-52 ms-14 mt-10 mb-5 float-right">
                            <button onClick={post} className="bg-primary w-52 h-16 rounded-xl text-white hover:bg-gray-300 hover:text-primary font-bold py-2 px-4">
                                Submit
                            </button>
                        </div>
                    </div>
                    <hr className="h-px my-8 rounded-xl bg-white border" />
                </>
            }
        </>
    )
}