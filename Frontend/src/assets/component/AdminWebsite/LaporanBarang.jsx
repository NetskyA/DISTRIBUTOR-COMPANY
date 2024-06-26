import { useEffect, useRef } from "react";
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

const LaporanBarang = () => {
    let data = useLoaderData();
    let table;
    const tableRef = useRef(null);
    const ExportExcel = () => {
        let Heading = [['ID Barang', 'Nama Brand', 'Nama Barang', 'Stok Karton', 'Stok Pcs', 'Harga Karton', 'Harga Pcs', 'Tanggal Masuk', 'Expired']];
        const wb = XLSX.utils.book_new();
        const ws = XLSX.utils.json_to_sheet(data.detailBarang);
        XLSX.utils.sheet_add_aoa(ws, Heading);

        //Starting in the second row to avoid overriding and skipping headers
        XLSX.utils.sheet_add_json(ws, data.detailBarang, { origin: 'A2', skipHeader: true });

        XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

        XLSX.writeFile(wb, 'filename.xlsx');
    };
    useEffect(() => {

        table = new $('#example').DataTable({
            dom: '<"top"lf>rt<"bottom"Bpi>', // Include the buttons in the DOM
            data: data.detailBarang,
            'columnDefs': [         // see https://datatables.net/reference/option/columns.searchable
                {
                    'searchable': true,
                    'targets': [2,3,4,5]
                },
            ],
            columns: [
                { title: "ID", data: "id_barang" },
                { title: "Nama Brand", data: "nama_brand" },
                { title: "Nama Barang", data: "nama_barang" },
                {
                    title: "Stok Karton", data: "stok_karton", render: function (data, type) {
                        var number = $.fn.dataTable.render
                            .number('.', '.', 0, '')
                            .display(data);

                        if (type === 'display') {

                            return `<span>${number} Karton</span>`;
                        }

                        return number;
                    }
                },
                {
                    title: "Stok Pcs", data: "stok_pcs", render: function (data, type) {
                        var number = $.fn.dataTable.render
                            .number('.', '.', 0,)
                            .display(data);

                        if (type === 'display') {

                            return `<span>${number} Pcs</span>`;
                        }

                        return number;
                    }
                },
                {
                    title: "Harga Karton", data: "harga_karton", render: function (data, type) {
                        var number = $.fn.dataTable.render
                            .number('.', '.', 0, 'Rp. ')
                            .display(data);

                        if (type === 'display') {

                            return `<span>${number}</span>`;
                        }

                        return number;
                    }
                },
                {
                    title: "Harga Pcs", data: "harga_pcs", render: function (data, type) {
                        var number = $.fn.dataTable.render
                            .number('.', '.', 0, 'Rp. ')
                            .display(data);

                        if (type === 'display') {

                            return `<span>${number}</span>`;
                        }

                        return number;
                    }
                },
                {title: "Tanggal Masuk", data: "tanggal_masuk"},
                {title: "Expired", data: "expired"},
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

    // Create a reference for the table
    return (
        <>
            {console.log(data.detailBarang)}
            <div className="cover flex">
                <div className="header lg:w-full md:w-1/2 text-primary text-4xl font-semibold">
                    <p>Laporan Barang</p>
                </div>
                <div className="rounded-xl lg:w-1/2 float-right mr-0 mx-auto text-2xl font-semibold">
                    {/* <ControlTarget /> */}
                </div>
            </div>
            <div className="cover mt-12 border-2 mb-28 rounded-xl" style={{ width: "100%", boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px" }}>
                <div className="flex mx-auto items-center justify-center">
                    <p className="pt-5 text-4xl font-semibold text-center text-primary">Data Barang</p>
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

export default LaporanBarang;
