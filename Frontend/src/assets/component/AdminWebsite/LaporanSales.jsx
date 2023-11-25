import { useEffect, useRef, useState } from "react";
import { useLoaderData } from "react-router-dom";
import $ from "jquery";
import LogoPerusahaan from "../../images/image-login/icon.png"
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
// export default function LaporanSales() {
//     const [isVisibleSales, setIsVisibleSales] = useState(false);
//     const [dateStart, setDateStart] = useState("-");

//     const toggleVisibilitySales = () => {
//         setIsVisibleSales(!isVisibleSales);
//     };

export default function LaporanSales() {
    let data = useLoaderData();
    let table;
    const tableRef = useRef(null);
    const ExportExcel = () => {
        let Heading = [['ID Barang', 'Nama Principle', 'Nama Barang', 'Stok Karton', 'Stok Pcs', 'Harga Karton', 'Harga Pcs', 'HA. Karton', 'HA. Pcs', 'Expired']];
        const wb = XLSX.utils.book_new();
        const ws = XLSX.utils.json_to_sheet(dataSet);
        XLSX.utils.sheet_add_aoa(ws, Heading);

        //Starting in the second row to avoid overriding and skipping headers
        XLSX.utils.sheet_add_json(ws, dataSet, { origin: 'A2', skipHeader: true });

        XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

        XLSX.writeFile(wb, 'filename.xlsx');
    };
    useEffect(() => {
        // Initialize DataTables within the component
        // dataSet.map((e) => {
        //   let block = document.createElement('tr');
        //   for (let i = 0; i < 7; i++) {
        //     let block2 = document.createElement('td');
        //     block2.innerText = e[i];
        //     block.appendChild(block2);
        //   }
        //   document.getElementById("isi").appendChild(block)
        // })
        table = new $('#example').DataTable({
            dom: '<"top"lf>rt<"bottom"Bpi>', // Include the buttons in the DOM
            data: dataSet,
            'columnDefs': [         // see https://datatables.net/reference/option/columns.searchable
                {
                    'searchable': false,
                    'targets': [2, 3, 4, 5]
                },
            ],
            // columns: [
            //     {
            //         target: 0,
            //         visible: false,
            //         searchable: false
            //     },
            //     { title: "Id Transaksi", data: "id_transaksi" },
            //     { title: "Tanggal", data: "tanggal" },
            //     { title: "Nama Salesman", data: "nama_salesman" },
            //     { title: "Nama Toko", data: "nama_toko" },
            //     { title: "Total Penjualan", data: "total_penjualan" },
            //     { title: "Pembayaran", data: "pembayaran" }
            // ],
            destroy: true,
            "bDestroy": true,
            buttons: [
                "copy",
                "csv",
                {
                    text: "Ecxel",
                    action: ExportExcel,
                },
                "pdf",
                "print", // Specify which buttons to include
            ],
        });
    }, []);

    // Create a reference for the table
    return (
        <>
            <div className="cover flex">
                <div className="header lg:w-full md:w-1/2 text-primary text-4xl font-semibold">
                    <p>Laporan Sales Penjualan</p>
                </div>
                <div className="rounded-xl lg:w-1/2 float-right mr-0 mx-auto text-2xl font-semibold">
                    {/* <ControlTarget /> */}
                </div>
            </div>
            <div className="selectdisable border-2 mt-10 border-gray-300 rounded-2xl w-1/3 h-56" style={{ boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px" }}>
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
                </div>
                <div className="flex float-right" >
                    <button className="bg-primary w-52 m-4 h-16 rounded-xl text-white hover:bg-gray-300 hover:text-primary font-bold py-2 px-4">
                        Cari
                    </button>
                </div>
            </div>
            <div className="cover mt-12 border-2 mb-28 rounded-xl" style={{ width: "100%", boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px" }}>
                <div className="flex mx-auto items-center justify-center">
                    <p className="pt-5 text-4xl font-semibold text-center text-primary">Data Sales Penjualan</p>
                    <img src={LogoPerusahaan} className="w-32 h-32 mt-4" alt="logo perusahaan" />
                </div>
                <div className="cover mb-28">
                    <div className="covertable m-2">
                        <table ref={tableRef} id="example" className="border-2 border-gray rounded-lg">
                            <thead>
                                <tr>
                                    <th>Id Transaksi</th>
                                    <th>Tanggal</th>
                                    <th>Nama Salesman</th>
                                    <th>Nama Toko</th>
                                    <th>Total Penjualan</th>
                                    <th>Pembayaran</th>
                                </tr>
                            </thead>
                            <tbody id="isi">
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    );
};

