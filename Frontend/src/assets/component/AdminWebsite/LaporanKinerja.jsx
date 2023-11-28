import { useEffect, useRef } from "react";
import { useLoaderData } from "react-router-dom";
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


export default function LaporanKinerja() {
    let data = useLoaderData();
    let table;
    const tableRef = useRef(null);
    const ExportExcel = () => {
        let Heading = [['Id Karyawan', 'Nama Karyawan', 'Jabatan', 'Tanggal', 'Absen', 'Gaji Pokok', 'Potongan']];
        const wb = XLSX.utils.book_new();
        const ws = XLSX.utils.json_to_sheet(data.kinerja);
        XLSX.utils.sheet_add_aoa(ws, Heading);

        //Starting in the second row to avoid overriding and skipping headers
        XLSX.utils.sheet_add_json(ws, data.kinerja, { origin: 'A2', skipHeader: true });

        XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

        XLSX.writeFile(wb, 'filename.xlsx');
    };
    useEffect(() => {

        table = new $('#example').DataTable({
            dom: '<"top"lf>rt<"bottom"Bpi>', // Include the buttons in the DOM
            data: data.kinerja,
            'columnDefs': [         // see https://datatables.net/reference/option/columns.searchable
                {
                    'searchable': false,
                    'targets': [2, 3, 4, 5]
                },
            ],
            columns: [
                { title: "Id Karyawan", data: "id_karyawan"},
                { title: "Nama Karyawan", data: "nama_karyawan" },
                { title: "Jabatan", data: "jabatan" },
                { title: "Tanggal", data: "tanggal" },
                { title: "Absen", data: "absen" },
                { title: "Gaji Pokok", data: "gaji" },
                { title: "Potongan", data: "potongan" },
            ],
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
    return (
        <>
            <div className="cover selectdisable flex">
                <div className="header lg:w-full md:w-1/2 text-primary text-4xl font-semibold">
                    <p>Laporan Kinerja</p>
                </div>
                <div className="rounded-xl lg:w-1/2 float-right mr-0 mx-auto text-2xl font-semibold">
                    {/* <ControlTarget /> */}
                </div>
            </div>
            <div className="cover mt-12 border-2 mb-28 rounded-xl" style={{ width: "100%", boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px" }}>
                <div className="flex mx-auto items-center justify-center">
                    <p className="pt-5 text-4xl font-semibold text-center text-primary">Data Kinerja</p>
                    <img src={LogoPerusahaan} className="w-32 h-32 mt-4" alt="logo perusahaan" />
                </div>
                <div className="cover mb-28">
                    <div className="covertable m-2">
                        <table ref={tableRef} id="example" className="border-2 border-gray rounded-lg">
                            
                        </table>
                    </div>
                </div>
            </div>
        </>
    )
}