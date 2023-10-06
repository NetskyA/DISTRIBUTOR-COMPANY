import { useEffect, useRef } from "react";
import $ from "jquery";
import DataTables from "datatables.net";
import DataTarget from "../../component/Salesman/DataTarget";
import "datatables.net-dt/css/jquery.dataTables.min.css";
import dataSet from "../../component/Salesman/DataSet";
import * as XLSX from "xlsx";

import "datatables.net-buttons";
import "datatables.net-buttons-dt";
import "datatables.net-buttons-dt/css/buttons.dataTables.min.css";
import "datatables.net-buttons/js/buttons.html5.min.js";
import "datatables.net-buttons/js/buttons.print.min.js";

const Table = () => {
  const tableRef = useRef();
  const ExportExcel = () => {
    let Heading = [['ID Barang', 'Nama Barang', 'Stok Karton', 'Stok Pcs','Harga Karton', 'Harga Pcs','Expired']];
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet(dataSet);
    XLSX.utils.sheet_add_aoa(ws, Heading);

    //Starting in the second row to avoid overriding and skipping headers
    XLSX.utils.sheet_add_json(ws,  dataSet, { origin: 'A2', skipHeader: true });

    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    XLSX.writeFile(wb, 'filename.xlsx');
  };
  useEffect(() => {
    // Initialize DataTables within the component

    new $(tableRef.current).DataTable({
      data: dataSet,
      columns: [
        { title: "ID Barang" },
        { title: "Nama Barang" },
        { title: "Stok Karton" },
        { title: "Stok Pcs" },
        { title: "Harga Karton" },
        { title: "Harga Pcs" },
        { title: "Expired" },
      ],
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

  // Create a reference for the table
  return (
    <>
      <div className="cover flex">
        <div className="header lg:w-full md:w-1/2 text-primary text-4xl font-semibold">
          <p>Katalog</p>
        </div>
        <div className="rounded-xl lg:w-1/2 float-right mr-0 mx-auto text-2xl font-semibold">
          <DataTarget />
        </div>
      </div>
      <div className="cover mt-10 border-2 rounded-xl" style={{ width: "100%",boxShadow:"rgba(0, 0, 0, 0.24) 0px 3px 8px"}}>
      <p className="pt-5 text-4xl font-semibold text-center text-primary">Data Barang</p>
        <div className="cover mb-28">
          <div className="covertable m-2">
            <table className="border-2 border-gray rounded-lg" ref={tableRef}></table>
          </div>
        </div>
      </div>
    </>
  );
};

export default Table;
