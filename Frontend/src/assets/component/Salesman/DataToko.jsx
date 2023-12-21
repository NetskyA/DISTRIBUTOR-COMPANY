import ControlTarget from "../../controller/ControlTarget"
import { useEffect, useRef } from "react";
import { useLoaderData } from "react-router-dom";
import $ from "jquery";
import DataTables from "datatables.net";
import "datatables.net-dt/css/jquery.dataTables.min.css";
import * as XLSX from "xlsx";

import "datatables.net-buttons";
import "datatables.net-buttons-dt";
import "datatables.net-buttons-dt/css/buttons.dataTables.min.css";
import "datatables.net-buttons/js/buttons.html5.min.js";
import "datatables.net-buttons/js/buttons.print.min.js";
import { useSelector } from "react-redux";
export default function DataToko() {
    let data = useLoaderData();
    const listToko = useSelector((state)=>state.data.listToko);
    let table;
    useEffect(() => {
        table = new $('#example').DataTable({
            dom: '<"top"lf>rt<"bottom"Bpi>', // Include the buttons in the DOM
            data: listToko,
            'columnDefs': [         // see https://datatables.net/reference/option/columns.searchable
                {
                    'searchable': true,
                    'targets': [2, 3, 4, 5]
                },
            ],
            columns: [
                { title: "ID Toko", data: "id_toko" },
                { title: "Nama Toko", data: "nama_toko" },
                { title: "Kota", data: "kota" },
                { title: "Kelurahan", data: "kelurahan" },
                { title: "Nama Konsumen", data: "nama_konsumen" },
                { title: "Alamat Toko", data: "alamat_toko" },
                { title: "No Handphone 1", data: "no_handphone1" },
                { title: "No Handphone 2", data: "no_handphone2" },
            ],
            destroy: true,
            "bDestroy": true
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
                    <ControlTarget current={data.targetSekarang} target={data.currtarget} />
                </div>
                {/* untuk memanggil function controller target salesman */}
            </div>
            <div className="cover mt-12 border-2 mb-28 rounded-xl" style={{ width: "100%", boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px" }}>
                <p className="pt-5 text-4xl font-semibold text-center text-primary">Data Toko</p>
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