import { useEffect, useRef,useState } from "react";
import $ from "jquery";
import DataTables from "datatables.net";
import ControlTarget from "../../controller/ControlTarget"
import "datatables.net-dt/css/jquery.dataTables.min.css";
import * as XLSX from "xlsx";
import { useLoaderData, useNavigate } from "react-router-dom";
import "datatables.net-buttons";
import "datatables.net-buttons-dt";
import "datatables.net-buttons-dt/css/buttons.dataTables.min.css";
import "datatables.net-buttons/js/buttons.html5.min.js";
import "datatables.net-buttons/js/buttons.print.min.js";
export default function DataLaporanGaji() {
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
        // Initialize DataTables within the component
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
                        .number('.', '.', 0, 'Rp ')
                        .display(data);

                    if (type === 'display') {

                        return `<span>${number}</span>`;
                    }

                    return number;
                }},
                { title: "Komisi", data: "komisi", render: function (data, type) {
                    var number = $.fn.dataTable.render
                        .number('.', '.', 0, 'Rp ')
                        .display(data);

                    if (type === 'display') {

                        return `<span>${number}</span>`;
                    }

                    return number;
                }},
                { title: "Tanggal Gaji", data: "tanggal_gaji" },
                { title: "Total Gaji", data: "total_gaji", render: function (data, type) {
                    var number = $.fn.dataTable.render
                        .number('.', '.', 0, 'Rp ')
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
                        <input type="date" className="border border-primary rounded-lg text-xl h-10" name="date"
                            id="dateStart" required="dates"
                            onChange={() => extractDate("dateStart")}/>
                    </div>
                    <div className="flex mt-5 text-primary  text-2xl">
                        <p className="pr-2 pt-1">Tanggal Akhir: </p>
                        <input type="date" className="border border-primary rounded-lg text-xl h-10"  name="date"
                            id="dateEnd"  required="dates"
                            onChange={() => extractDate("dateEnd")}/>
                    </div>
                    <div className="flex mt-7 m-4 text-primary float-right text-2xl" >
                        <button className="w-52 h-14 items-end bg-primary rounded-xl hover:bg-gray-300 text-white hover:text-primary font-bold py-2 px-4" onClick={()=>toggleVisibility()}>
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
                        </table>
                    </div>
                </div>
            </div>
        </>
    )
}