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
    const [htrans, setHtrans] = useState(data.headerTransaksi);
    const [dateStart, setDateStart] = useState(null)
    const [dateEnd, setDateEnd] = useState(null)

    const toggleVisibility = () => {
        let tempHtrans = [];
        let temp = data.headerTransaksi;
        console.log(temp)
        for (let i = 0; i < temp.length; i++) {
            const t = temp[i];
            
            const tempDate = t.tanggal_transaksi.split("-");
            const day = tempDate[0];
            const month = tempDate[1];
            const year = tempDate[2];
            const result = year + "-" + month + "-" + day
            if(dateStart<=result && dateEnd>=result){
                tempHtrans.push(t);
            }
        }
        setHtrans(tempHtrans);
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
        let Heading = [['ID Transaksi', 'Tanggal Transaksi', 'Nama Salesman', 'Nama Toko', 'Total Penjualan', 'Pembayaran', 'Status']];
        const wb = XLSX.utils.book_new();
        const ws = XLSX.utils.json_to_sheet(htrans);
        XLSX.utils.sheet_add_aoa(ws, Heading);

        //Starting in the second row to avoid overriding and skipping headers
        XLSX.utils.sheet_add_json(ws, htrans, { origin: 'A2', skipHeader: true });

        XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

        XLSX.writeFile(wb, 'filename.xlsx');
    };
    useEffect(() => {
        table = new $('#example').DataTable({
            dom: '<"top"lf>rt<"bottom"Bpi>', // Include the buttons in the DOM
            data: htrans,
            'columnDefs': [         // see https://datatables.net/reference/option/columns.searchable
                {
                    'searchable': false,
                    'targets': [2, 3, 4, 5]
                },
            ],
            columns: [
                { title: "Id Transaksi", data: "id_transaksi" },
                { title: "Tanggal Transaksi", data: "tanggal_transaksi" },
                { title: "Nama Salesman", data: "salesman" },
                { title: "Nama Toko", data: "toko" },
                { title: "Total Penjualan", data: "total_penjualan", render: function (data, type) {
                    var number = $.fn.dataTable.render
                        .number('.', '.', 0, 'Rp ')
                        .display(data);

                    if (type === 'display') {

                        return `<span>${number}</span>`;
                    }

                    return number;
                }},
                { title: "Pembayaran", data: "pembayaran" },
                { title: "Status", data: "status", render: function (data, type) {
                    let color = 'green' 
                    if(type==="display"){
                        if (data === 'Ditolak') {
                            color = 'red';
                        }
                    }
                    return `<span style="color: ${color}">${data}</span>`;
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
    }, [htrans]);

    // Create a reference for the table
    return (
        <>
            {console.log(htrans)}
            <div className="cover flex">
                <div className="header lg:w-full md:w-1/2 text-primary text-4xl font-semibold">
                    <p>Laporan Sales Penjualan</p>
                </div>
                <div className="rounded-xl lg:w-1/2 float-right mr-0 mx-auto text-2xl font-semibold">
                    {/* <ControlTarget /> */}
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
                    <p className="pt-5 text-4xl font-semibold text-center text-primary">Data Sales Penjualan</p>
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
    );
};

