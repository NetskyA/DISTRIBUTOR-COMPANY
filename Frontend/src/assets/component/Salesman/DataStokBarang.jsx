import { useEffect, useRef } from "react";
import { useLoaderData } from "react-router-dom";
import $ from "jquery";
import DataTables from "datatables.net";
import ControlTarget from "../../controller/ControlTarget"
import "datatables.net-dt/css/jquery.dataTables.min.css";
import dataSet from "../../component/Salesman/DataSet";
import * as XLSX from "xlsx";

import "datatables.net-buttons";
import "datatables.net-buttons-dt";
import "datatables.net-buttons-dt/css/buttons.dataTables.min.css";
import "datatables.net-buttons/js/buttons.html5.min.js";
import "datatables.net-buttons/js/buttons.print.min.js";

const Catalog = () => {
  let data = useLoaderData();
  let table;
  // const ExportExcel = () => {
  //   let Heading = [['ID Barang', 'Nama Barang', 'Stok Karton', 'Stok Pcs', 'Harga Karton', 'Harga Pcs', 'Expired']];
  //   const wb = XLSX.utils.book_new();
  //   const ws = XLSX.utils.json_to_sheet(dataSet);
  //   XLSX.utils.sheet_add_aoa(ws, Heading);

  //   //Starting in the second row to avoid overriding and skipping headers
  //   XLSX.utils.sheet_add_json(ws, dataSet, { origin: 'A2', skipHeader: true });

  //   XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

  //   XLSX.writeFile(wb, 'filename.xlsx');
  // };
  useEffect(() => {
    // Initialize DataTables within the component
    // dataSet.map((e) => {
    //   let block = document.createElement('tr');
    //   for (let i = 0; i < 7; i++) {
    //     let block2 = document.createElement('td');
    //     block2.innerText = e[i];
    //     block.appendChild(block2);
    //   }
    //   document.getElementById("isi").appendChild(block)
    // })
    table = new $('#example').DataTable({
      dom: '<"top"lf>rt<"bottom"Bpi>', // Include the buttons in the DOM
      data: data,
      'columnDefs'        : [         // see https://datatables.net/reference/option/columns.searchable
                { 
                    'searchable'    : false, 
                    'targets'       : [2,3,4,5] 
                },
            ],
            columns: [
                // {
                //     target: 0,
                //     visible: false,
                //     searchable: false
                // },
              { title: "ID", data:"id_barang"},
              { title: "Nama Barang", data:"nama_barang"},
              { title: "Stok Karton", data:"stok_karton",render: function (data, type) {
                var number =  $.fn.dataTable.render
                    .number('.', '.', 0, '')
                    .display(data);
 
                if (type === 'display') {
 
                    return `<span>${number} Karton</span>`;
                }
 
                return number;
            }   },
              { title: "Stok Pcs", data:"stok_pcs",render: function (data, type) {
                var number =  $.fn.dataTable.render
                    .number('.', '.', 0, '')
                    .display(data);
 
                if (type === 'display') {
 
                    return `<span>${number} Pcs</span>`;
                }
 
                return number;
            }  },
              { title: "Harga Karton",data:"harga_karton",render: function (data, type) {
                var number =  $.fn.dataTable.render
                    .number('.', '.', 0, 'Rp ')
                    .display(data);
 
                if (type === 'display') {
 
                    return `<span>${number}</span>`;
                }
 
                return number;
            } },
              { title: "Harga Pcs", data:"harga_pcs",render: function (data, type) {
                var number =  $.fn.dataTable.render
                    .number('.', '.', 0, 'Rp ')
                    .display(data);
 
                if (type === 'display') {
 
                    return `<span>${number}</span>`;
                }
 
                return number;
            }  },
            ],
            destroy:true,
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

  // Create a reference for the table
  return (
    <>
      <div className="cover flex">
        <div className="header lg:w-full md:w-1/2 text-primary text-4xl font-semibold">
          <p>Katalog</p>
        </div>
        <div className="rounded-xl lg:w-1/2 float-right mr-0 mx-auto text-2xl font-semibold">
          <ControlTarget />
        </div>
      </div>
      <div className="cover mt-12 border-2 mb-28 rounded-xl" style={{ width: "100%", boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px" }}>
        <p className="pt-5 text-4xl font-semibold text-center text-primary">Data Barang</p>
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
  );
};

export default Catalog;
