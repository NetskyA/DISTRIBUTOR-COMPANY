import ControlTarget from "../../controller/ControlTarget"
import { useEffect, useRef } from "react";
import { useLoaderData } from "react-router-dom";
import $ from "jquery";
import DataTables from "datatables.net";
import "datatables.net-dt/css/jquery.dataTables.min.css";
import dataSet from "../../component/Salesman/DataSet";
import * as XLSX from "xlsx";

import "datatables.net-buttons";
import "datatables.net-buttons-dt";
import "datatables.net-buttons-dt/css/buttons.dataTables.min.css";
import "datatables.net-buttons/js/buttons.html5.min.js";
import "datatables.net-buttons/js/buttons.print.min.js";
export default function DataToko() {
    let data = useLoaderData();
    let table;
    useEffect(() => {
        table = new $('#example').DataTable({
            dom: '<"top"lf>rt<"bottom"pi>', // Include the buttons in the DOM
            data: data,
            'columnDefs': [         // see https://datatables.net/reference/option/columns.searchable
                {
                    'searchable': false,
                    'targets': [2, 3, 4, 5]
                },
            ],
            columns: [
                // {
                //     target: 0,
                //     visible: false,
                //     searchable: false
                // },
                { title: "ID Toko", data: "id_toko" },
                { title: "ID Kelurahan", data: "id_kelurahan" },
                { title: "ID Kota", data: "id_kota" },
                { title: "Nama Toko", data: "nama_toko" },
                { title: "Nama Konsumen", data: "nama_konsumen" },
                { title: "Alamat Toko", data: "alamat_toko" },
                { title: "No Handphone 1", data: "no_handphone1"  },
                { title: "No Handphone 2", data: "no_handphone2"  },
                { title: "Tanggal Masuk", data: "tanggal_masuk" },
                { title: "Status", data: "status_toko"},
            ],
            destroy: true,
            "bDestroy": true
            // buttons: [
            //   "copy",
            //   "csv",
            //   {
            //     text: "Ecxel",
            //     action: ExportExcel,
            //   },
            //   "pdf",
            //   "print", // Specify which buttons to include
            // ],
        });
    }, []);
    return (
        <>
            <div className="cover selectdisable flex">
                {/* nanti digunakan memanggil nama sesuai akun*/}
                <div className="header lg:w-full md:w-1/2 text-primary text-4xl font-semibold">
                    <p>List Toko</p>
                </div>
                <div className="rounded-xl lg:w-1/2 float-right mr-0 mx-auto text-2xl font-semibold">
                    <ControlTarget />
                </div>
                {/* untuk memanggil function controller target salesman */}
            </div>
            <div className="cover mt-12 border-2 mb-28 rounded-xl" style={{ width: "100%", boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px" }}>
                <p className="pt-5 text-4xl font-semibold text-center text-primary">Data Toko</p>
                <div className="cover mb-28">
                    <div className="covertable m-2">
                        <table id="example" className="border-2 border-gray rounded-lg">
                            {/* <thead>
                <tr>
                  <th>ID Barang</th>
                  <th>Nama Barang</th>
                  <th>Stok Karton</th>
                  <th>Stok Pcs</th>
                  <th>Harga Karton</th>
                  <th>Harga Pcs</th>
                  <th>Expired</th>
                </tr>
              </thead>
              <tbody id="isi">
              </tbody> */}
                        </table>
                    </div>
                </div>
            </div>
        </>
    )
}