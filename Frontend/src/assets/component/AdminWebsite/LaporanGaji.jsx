import { useEffect, useRef, useState } from "react";
import { useLoaderData } from "react-router-dom";
import $ from "jquery";
import DataTables from "datatables.net";
import ControlTarget from "../../controller/ControlTarget"
import "datatables.net-dt/css/jquery.dataTables.min.css";
import * as XLSX from "xlsx";
import "datatables.net";
import "datatables.net-buttons";
import "datatables.net-buttons-dt";
import "datatables.net-buttons-dt/css/buttons.dataTables.min.css";
import "datatables.net-buttons/js/buttons.html5.min.js";
import "datatables.net-buttons/js/buttons.print.min.js";
import LogoPerusahaan from "../../images/image-login/icon.png"

export default function LaporanGaji() {
    let data = useLoaderData();
    let table;
    const [gaji, setGaji] = useState(data.historyGaji);
    const [dateStart, setDateStart] = useState(null)
    const [dateEnd, setDateEnd] = useState(null)

    const toggleVisibility = () => {
        let tempGaji = [];
        let temp = data.historyGaji;
        for (let i = 0; i < temp.length; i++) {
            const t = temp[i];
            
            const tempDate = t.tanggal_gaji.split("-");
            const day = tempDate[0];
            const month = tempDate[1];
            const year = tempDate[2];
            const result = year + "-" + month + "-" + day
            if(dateStart<=result && dateEnd>=result){
                tempGaji.push(t);
            }
        }
        setGaji(tempGaji);
    }

    const extractDate = (id) => {
        const date = document.getElementById(id).value;
    
        if (date) {
          const tempDate = date.split("-");
          const year = tempDate[0];
          const month = tempDate[1];
          const day = tempDate[2];
    
          if (id == "dateStart") {
            setDateStart(year + "-" + month + "-" + day);
          } else {
            setDateEnd(year + "-" + month + "-" + day);
          }
        } else {
          if (id == "dateStart") {
            setDateStart();
          } else {
            setDateEnd();
          }
        }
    };
    const tableRef = useRef(null);
    const ExportExcel = () => {
        let Heading = [['ID Gaji', 'Nama Karyawan', 'Email', 'Jabatan', 'Gaji Pokok', 'Komisi', 'Tanggal Gaji', 'Total Gaji']];
        const wb = XLSX.utils.book_new();
        const ws = XLSX.utils.json_to_sheet(gaji);
        XLSX.utils.sheet_add_aoa(ws, Heading);

        //Starting in the second row to avoid overriding and skipping headers
        XLSX.utils.sheet_add_json(ws, gaji, { origin: 'A2', skipHeader: true });

        XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

        XLSX.writeFile(wb, 'filename.xlsx');
    };
    useEffect(() => {

        table = new $('#example').DataTable({
            dom: '<"top"lf>rt<"bottom"Bpi>', // Include the buttons in the DOM
            data: gaji,
            'columnDefs': [         // see https://datatables.net/reference/option/columns.searchable
                {
                    'searchable': false,
                    'targets': [2, 3, 4, 5]
                },
            ],
            columns: [
                { title: "Id Gaji", data: "id_gaji" },
                { title: "Nama Karyawan", data: "nama_karyawan" },
                { title: "Email", data: "email" },
                { title: "Jabatan", data: "jabatan" },
                { title: "Gaji Pokok", data: "gaji_pokok", render: function (data, type) {
                    var number = $.fn.dataTable.render
                        .number('.', '.', 0, 'Rp. ')
                        .display(data);

                    if (type === 'display') {

                        return `<span>${number}</span>`;
                    }

                    return number;
                }},
                { title: "Komisi", data: "komisi", render: function (data, type) {
                    var number = $.fn.dataTable.render
                        .number('.', '.', 0, 'Rp. ')
                        .display(data);

                    if (type === 'display') {

                        return `<span>${number}</span>`;
                    }

                    return number;
                }},
                { title: "Tanggal Gaji", data: "tanggal_gaji" },
                { title: "Total Gaji", data: "total_gaji", render: function (data, type) {
                    var number = $.fn.dataTable.render
                        .number('.', '.', 0, 'Rp. ')
                        .display(data);

                    if (type === 'display') {

                        return `<span>${number}</span>`;
                    }

                    return number;
                }},
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
    }, [gaji]);
    return (
        <>
            <div className="cover selectdisable flex" > <div className="header lg:w-full md:w-1/2 text-primary text-4xl font-semibold">
                <p>Laporan Gaji Karyawan</p>
            </div>
            </div>
            <div className="selectdisable border-2 mt-10 border-gray-300 rounded-2xl w-1/3 h-56" style={{ boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px" }}>
                <div className="row ms-4 m-4 w-full">
                    <div className="flex text-primary text-2xl">
                        <p className="pt-1 pr-2">Tanggal Awal : </p>
                        <input
                            type="date"
                            name="date"
                            id="dateStart"
                            className="border-0 text-2xl h-10"
                            required="dates"
                            onChange={() => extractDate("dateStart")}
                        />
                    </div>
                    <div className="flex text-primary mt-3 text-2xl">
                        <p className="pt-1 pr-2">Tanggal Akhir : </p>
                        <input
                            type="date"
                            name="date"
                            id="dateEnd"
                            className="border-0 text-2xl h-10"
                            required="dates"
                            onChange={() => extractDate("dateEnd")}
                        />
                    </div>
                </div>
                <div className="flex float-right" >
                    <button className="bg-primary w-52 m-4 h-16 rounded-xl text-white hover:bg-gray-300 hover:text-primary font-bold py-2 px-4" onClick={()=>toggleVisibility()}>
                        Cari
                    </button>
                </div>
            </div>
            <div className="cover mt-12 border-2 mb-28 rounded-xl" style={{ width: "100%", boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px" }}>
                <div className="flex mx-auto items-center justify-center">
                    <p className="pt-5 text-4xl font-semibold text-center text-primary">Data Gaji Karyawan</p>
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