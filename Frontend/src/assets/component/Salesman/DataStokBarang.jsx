import { useEffect, useRef } from "react";
import { useLoaderData } from "react-router-dom";
import $ from "jquery";
import DataTables from "datatables.net";
import ControlTarget from "../../controller/ControlTarget"
import "datatables.net-dt/css/jquery.dataTables.min.css";
import * as XLSX from "xlsx";

import "datatables.net-buttons";
import "datatables.net-buttons-dt";
import "datatables.net-buttons-dt/css/buttons.dataTables.min.css";
import "datatables.net-buttons/js/buttons.html5.min.js";
import "datatables.net-buttons/js/buttons.print.min.js";
import { useSelector } from "react-redux";

const Catalog = () => {
  const listBarang = useSelector((state)=>state.data.listBarang);
  let data = useLoaderData();
  let table;
  useEffect(() => {
    table = new $('#example').DataTable({
      dom: '<"top"lf>rt<"bottom"Bpi>', // Include the buttons in the DOM
      data: listBarang,
      'columnDefs': [         // see https://datatables.net/reference/option/columns.searchable
        {
          'searchable': false,
          'targets': [2, 3, 4, 5]
        },
      ],
      columns: [
        { title: "ID", data: "id_barang" },
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
              .number('.', '.', 0, '')
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
              .number('.', '.', 0, 'Rp ')
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
              .number('.', '.', 0, 'Rp ')
              .display(data);

            if (type === 'display') {

              return `<span>${number}</span>`;
            }

            return number;
          }
        },
      ],
      destroy: true,
      "bDestroy": true
    });
  }, []);

  // Create a reference for the table
  return (
    <>
      <div className="cover flex">
        <div className="header lg:w-full md:w-1/2 text-primary text-4xl font-semibold">
          <p>Katalog</p>
        </div>
        <div className="rounded-xl lg:w-1/2 float-right mr-0 mx-auto text-2xl font-semibold">
          <ControlTarget current={data.targetSekarang} target={data.currtarget} />
        </div>
      </div>
      <div className="cover mt-12 border-2 mb-28 rounded-xl" style={{ width: "100%", boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px" }}>
        <p className="pt-5 text-4xl font-semibold text-center text-primary">Data Barang</p>
        <div className="cover mb-28">
          <div className="covertable m-2">
            <table id="example" className="border-2 border-gray rounded-lg">
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default Catalog;
