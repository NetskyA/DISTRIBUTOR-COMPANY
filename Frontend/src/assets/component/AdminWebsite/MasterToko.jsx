import { useEffect, useRef } from "react";
import { useLoaderData } from "react-router-dom";
import { useState } from "react";
import $ from "jquery";
import DataTables from "datatables.net";
import ControlTarget from "../../controller/ControlTarget"
import "datatables.net-dt/css/jquery.dataTables.min.css";
import dataSet from "../../component/Salesman/DataSet";
import * as XLSX from "xlsx";
import "datatables.net";
import "datatables.net-buttons";
import "datatables.net-buttons-dt";
import "datatables.net-buttons-dt/css/buttons.dataTables.min.css";
import "datatables.net-buttons/js/buttons.html5.min.js";
import "datatables.net-buttons/js/buttons.print.min.js";
import LogoPerusahaan from "../../images/image-login/icon.png"

export default function MasterJabatan() {
    // let data = useLoaderData();
    // let table;
    // const tableRef = useRef(null);
    // const ExportExcel = () => {
    //     let Heading = [['ID Barang', 'Nama Principle', 'Nama Barang', 'Stok Karton', 'Stok Pcs', 'Harga Karton', 'Harga Pcs', 'HA. Karton', 'HA. Pcs', 'Expired']];
    //     const wb = XLSX.utils.book_new();
    //     const ws = XLSX.utils.json_to_sheet(dataSet);
    //     XLSX.utils.sheet_add_aoa(ws, Heading);

    //     XLSX.utils.sheet_add_json(ws, dataSet, { origin: 'A2', skipHeader: true });

    //     XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    //     XLSX.writeFile(wb, 'filename.xlsx');
    // };
    // useEffect(() => {

    //     table = new $('#example').DataTable({
    //         dom: '<"top"lf>rt<"bottom"Bpi>',
    //         data: dataSet,
    //         'columnDefs': [ 
    //             {
    //                 'searchable': false,
    //                 'targets': [2, 3, 4, 5]
    //             },
    //         ],

    //         destroy: true,
    //         "bDestroy": true,
    //         buttons: [
    //             "copy",
    //             "csv",
    //             {
    //                 text: "Ecxel",
    //                 action: ExportExcel,
    //             },
    //             "pdf",
    //             "print",
    //         ],
    //     });
    // }, []);

    const [isTambah, setIsTambah] = useState(true);
    const toggleTambah = () => {
        setIsTambah(!isTambah);
    }


    return (
        <>
            <div className="cover mt-12 border-2 mb-28 rounded-xl" style={{ width: "100%", boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px" }}>
                <div className="flex">
                    <div className="flex text-primary text-2xl">
                        <button onClick={toggleTambah} className="bg-primary w-60 m-4 h-12 rounded-xl text-2xl text-white hover:bg-gray-300 hover:text-primary font-bold py-2 px-4">
                            +
                            Tambah Toko
                        </button>
                    </div>
                    {/* <div className="flex text-primary text-2xl">
                        <button onClick={toggleMasterToko} className="bg-primary w-60 m-4 h-12 rounded-xl text-2xl text-white hover:bg-gray-300 hover:text-primary font-bold py-2 px-4">
                            Master Toko
                        </button>
                    </div> */}
                </div>
                <p className="ps-4 pt-1 pb-2 text-md italic text-primary">
                    *Hanya boleh memilih satu pilihan
                </p>
                {!isTambah &&
                    <div className="selectdisable border-2 ms-4 mt-1 mb-4 border-gray-300 rounded-2xl w-1/3 h-full" style={{ boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px" }}>
                        <div className="row ms-4 m-4 w-full" >
                            <div className="flex text-primary text-2xl">
                                <p className="pt-1 pr-2 w-52">ID Toko : </p>
                                <input
                                    type="text"
                                    name="ID Toko"
                                    className="border-primary rounded-lg w-60 text-2xl h-10"
                                    placeholder="KLR00001"
                                    required="text" />
                            </div>
                            <div className="flex text-primary mt-3 text-2xl">
                                <p className="pt-2 pr-2 w-52">ID Kelurahan : </p>
                                <select name="brandId" id="selectIdbrand" className="w-60 text-primary border-primary rounded-lg h-12 text-2xl">
                                    <option value="id1">KLR00001</option>
                                    <option value="id2">2</option>
                                    <option value="id3">3</option>
                                    <option value="id4">4</option>
                                    <option value="id5">5</option>
                                </select>
                            </div>
                            <div className="flex text-primary mt-3 text-2xl">
                                <p className="pt-2 pr-2 w-52">ID Kota : </p>
                                <select name="brandId" id="selectIdbrand" className="w-60 text-primary border-primary rounded-lg h-12 text-2xl">
                                    <option value="id1">KTR00001</option>
                                    <option value="id2">2</option>
                                    <option value="id3">3</option>
                                    <option value="id4">4</option>
                                    <option value="id5">5</option>
                                </select>
                            </div>
                            <div className="flex text-primary mt-3 text-2xl">
                                <p className="pt-1 pr-2 w-52">Nama Toko: </p>
                                <input
                                    type="text"
                                    name="JNama Toko"
                                    className="border-primary rounded-lg w-60 text-2xl h-10"
                                    placeholder="Nama Toko"
                                    required="text" />
                            </div>
                            <div className="flex text-primary mt-3 text-2xl">
                                <p className="pt-1 pr-2 w-52">Nama Konsumen: </p>
                                <input
                                    type="text"
                                    name="Nama Konsumen"
                                    className="border-primary rounded-lg w-60 text-2xl h-10"
                                    placeholder="Nama Toko"
                                    required="text" />
                            </div>
                            <div className="flex text-primary mt-3 text-2xl">
                                <p className="pt-1 pr-2 w-52">Alamat Toko : </p>
                                <input
                                    type="text"
                                    name="Alamat Toko"
                                    className="border-primary rounded-lg w-60 text-2xl h-10"
                                    placeholder="Alamat Toko"
                                    required="text" />
                            </div>
                            <div className="flex text-primary mt-3 text-2xl">
                                <p className="pt-1 pr-2 w-52">No Hp 1: </p>
                                <input
                                    type="text"
                                    name="NO1"
                                    className="border-primary rounded-lg w-60 text-2xl h-10"
                                    placeholder="No. 1"
                                    required="text" />
                            </div>
                            <div className="flex text-primary mt-3 text-2xl">
                                <p className="pt-1 pr-2 w-52">No Hp 2 : </p>
                                <input
                                    type="text"
                                    name="NO2"
                                    className="border-primary rounded-lg w-60 text-2xl h-10"
                                    placeholder="No. 2"
                                    required="text" />
                            </div>
                            <div className="flex text-primary mt-3 text-2xl">
                                <p className="pt-1 pr-2 w-52">Status Kelurahan : </p>
                                <input
                                    type="text"
                                    name="Jumlah Karton"
                                    className="border-primary rounded-lg w-60 text-2xl h-10"
                                    placeholder="Status Kelurahan 1"
                                    required="text" />
                            </div>
                            <div className="flex text-primary mt-3 text-2xl">
                                <p className="pt-1 pr-2 w-52">Tanggal Masuk : </p>
                                <input type="datetime-local" name="" id="" className="border-primary rounded-lg w-60 text-2xl h-10" />
                            </div>
                            <div className="flex float-right mr-4">
                                <button className="bg-primary w-40 m-4 h-14 rounded-xl text-white hover:bg-gray-300 hover:text-primary font-bold py-2 px-4">
                                    Simpan
                                </button>
                            </div>
                        </div>
                    </div>
                }
                <div className="cover mt-12 border-2 mb-28 rounded-xl" style={{ width: "100%", boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px" }}>
                    <div className="flex mx-auto items-center justify-center">
                        <p className="pt-5 text-4xl font-semibold text-center text-primary">Master Toko</p>
                        <img src={LogoPerusahaan} className="w-32 h-32 mt-4" alt="logo perusahaan" />
                    </div>
                    <div className="cover mb-28">
                        <div className="covertable m-2">
                            {/* <table ref={tableRef} id="example" className="border-2 border-gray rounded-lg">
                                <thead>
                                    <tr>
                                        <th>Id Toko</th>
                                        <th>Id Kelurahan</th>
                                        <th>Id Kota</th>
                                        <th>Nama Toko</th>
                                        <th>Nama Konsumen</th>
                                        <th>Alamat Toko</th>
                                        <th>No Hp 1</th>
                                        <th>No Hp 2</th>
                                        <th>Alamat Toko</th>
                                        <th>Tanggal Masuk</th>
                                        <th>Status Toko</th>
                                    </tr>
                                </thead>
                                <tbody id="isi">
                                </tbody>
                            </table> */}
                        </div>
                    </div>
                </div>
            </div>
            <hr className="h-px my-8 rounded-xl mb-28" />
        </>
    )
}