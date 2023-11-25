import { useEffect, useRef } from "react";
import $ from "jquery";
import DataTables from "datatables.net";
import ControlTarget from "../../controller/ControlTarget"
import "datatables.net-dt/css/jquery.dataTables.min.css";
import dataSet from "./DataSet2";
import * as XLSX from "xlsx";

import "datatables.net-buttons";
import "datatables.net-buttons-dt";
import "datatables.net-buttons-dt/css/buttons.dataTables.min.css";
import "datatables.net-buttons/js/buttons.html5.min.js";
import "datatables.net-buttons/js/buttons.print.min.js";
export default function DataLaporanGaji() {
    const tableRef = useRef();

    let table;
    const ExportExcel = () => {
        let Heading = [['ID Karyawan', 'Nama Karyawan', 'Email', 'Jabatan', 'Target Realisasi', 'Komisi', 'Potongan', 'Gaji Pokok', 'Total Bersih']];
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
        dataSet.map((e) => {
            let block = document.createElement('tr');
            for (let i = 0; i < 9; i++) {
                let block2 = document.createElement('td');
                block2.innerText = e[i];
                block.appendChild(block2);
            }
            document.getElementById("isi").appendChild(block)
        })
        table = new $('#example').DataTable({
            dom: '<"top"lf>rt<"bottom"Bpi>', // Include the buttons in the DOM
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
    return (
        <>
            <div className="cover selectdisable flex">
                {/* nanti digunakan memanggil nama sesuai akun*/}
                <div className="header lg:w-full md:w-1/2 text-primary text-4xl font-semibold">
                    <p>Laporan</p>
                </div>
                <div className="rounded-xl lg:w-1/2 float-right mr-0 mx-auto text-2xl font-semibold">
                    {/* <ControlTarget /> */}
                </div>
                {/* untuk memanggil function controller target salesman */}
            </div>
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
            <div className="cover mt-12 border-2 mb-28 rounded-xl" style={{ width: "100%", boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px" }}>
                <p className="pt-5 text-4xl font-semibold text-center text-primary">Data Karyawan</p>
                {/* <table className="border-2 border-gray rounded-lg" ref={tableRef}></table> */}
                <div className="cover mb-28">
                    <div className="covertable m-2">
                        <table id="example" className="border-2 border-gray rounded-lg">
                            <thead>
                                <tr>
                                    <th>ID Karyawan</th>
                                    <th>Nama Karyawan</th>
                                    <th>Email</th>
                                    <th>Jabatan</th>
                                    <th>Target Realisasi</th>
                                    <th>Komisi</th>
                                    <th>Potongan</th>
                                    <th>Gaji Pokok</th>
                                    <th>Total Bersih</th>
                                </tr>
                            </thead>
                            <tbody id="isi">
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    )
}