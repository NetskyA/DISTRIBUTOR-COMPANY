import { useEffect, useRef } from "react";
import { useLoaderData } from "react-router-dom";
import { useState } from "react";
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

export default function MasterJabatan() {


  // const [isTambah, setIsTambah] = useState(true);
  // const toggleTambah = () => {
  //     setIsTambah(!isTambah);
  // }
  let data = useLoaderData();
  let table;
  let jabatan = [{ id: 1, nama: "Jabatan 1" }, { id: 2, nama: "Jabatan 2" }, { id: 3, nama: "Jabatan 3" }];
  const [isMasterBarang, setIsMasterBarang] = useState(true);
  const toggleMasterBarang = () => {
    setIsMasterBarang(!isMasterBarang);
  };

  const ExportExcel = () => {
    let Heading = [['ID User', 'Nama Principle', 'Nama Barang', 'Stok Karton', 'Stok Pcs', 'Harga Karton', 'Harga Pcs', 'HA. Karton', 'HA. Pcs', 'Expired']];
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet(dataSet);
    XLSX.utils.sheet_add_aoa(ws, Heading);

    //Starting in the second row to avoid overriding and skipping headers
    XLSX.utils.sheet_add_json(ws, dataSet, { origin: 'A2', skipHeader: true });

    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    XLSX.writeFile(wb, 'filename.xlsx');
  };
  useEffect(() => {

    table = new $('#example').DataTable({
      dom: '<"top"lf>rt<"bottom"Bpi>', // Include the buttons in the DOM
      data: [{ id_user: 1, id_jabatan: 2, username: "temp", password: "temp", no_handphone: "123", alamat: "halo", foto: "1.png", no_rekening: "12314", id_atasan: 2 }],
      // 'columnDefs': [         // see https://datatables.net/reference/option/columns.searchable
      //     {
      //         'searchable': false,
      //         'targets': [2, 3, 4, 5]
      //     },
      // ],
      columns: [
        { title: "ID User", data: "id_user" },
        {
          title: "Jabatan",
          data: "id_jabatan",
          render: function (data, type, row) {
            if (type === 'display') {
              // Render an input text data with the data
              let a = [];
              {
                jabatan.forEach((br, idx) => {
                  console.log(data)
                  console.log(br)
                  data === br.id ?
                    a.push(`<option selected="selected" value="${br.id}">${br.nama}</option>`) :
                    a.push(`<option value="${br.id}">${br.nama}</option>`)

                })
              }
              console.log(a)
              return '<select>' + a + '</select>'
              return `<input type="number" value="0" min="0" data-row-id="${row.id_barang}" class="data-input-karton"/>`
            }
            return data;
          },
        },
        { title: "ID Atasan", data: "id_atasan" },
        // { title: "Email", data: "nama_konsumen" },
        { title: "Username", data: "username" },
        { title: "Password", data: "password" },
        { title: "No Hp", data: "no_handphone" },
        { title: "Alamat", data: "alamat" },
        // { title: "Tanggal Masuk", data: "tanggal_masuk" },
        { title: "Foto", data: "foto" },
        // { title: "Target Sekarang", data: "target_sekarang" },
        // { title: "Absen", data: "absen_user" },
        { title: "No Rekening", data: "no_rekening" },
        // { title: "Status User", data:"status_user" },
        { title: "Edit", data: null },
        { title: "Status", data: null },
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
      <div className="cover mt-12 border-2 mb-28 rounded-xl" style={{ width: "100%", boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px" }}>
        <div className="flex">
          <div className="flex text-primary text-2xl">
            <button onClick={toggleMasterBarang} className="bg-primary w-60 m-4 h-12 rounded-xl text-2xl text-white hover:bg-gray-300 hover:text-primary font-bold py-2 px-4">
              Master User
            </button>
          </div>
        </div>
        {!isMasterBarang &&
          <>
            <div className="flex mx-auto items-center justify-center">
              <p className="pt-5 text-4xl font-semibold text-center text-primary">Master Detail Barang</p>
              <img src={LogoPerusahaan} className="w-32 h-32 mt-4" alt="logo perusahaan" />
            </div>
            <div className="cover mb-28">
              <p className="text-primary text-2xl pt-1 ps-4">Search :</p>
              <div className="flex ms-4">
                <input type="text" className="border-primary text-xl rounded-lg" />
                <button className="bg-primary ms-3 w-40 h-12 rounded-xl text-white hover:bg-gray-300 hover:text-primary font-bold py-2 px-4">
                  Cari
                </button>
              </div>
              <div className="covertable m-2">
                <div className="cover mb-28">
                  <div className="covertable m-2 w-full">
                    <table className="text-left text-2xl mt-5 font-light border rounded-xl w-full" style={{ boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px" }}>
                      <thead className="border-b font-medium dark:border-neutral-500">
                        <tr>
                          <th scope="col" className="px-6 py-4">
                            Jabatan
                          </th>
                          <th scope="col" className="px-6 py-4">
                            Atasan
                          </th>
                          <th scope="col" className="px-6 py-4">
                            Email
                          </th>
                          <th scope="col" className="px-6 py-4">
                            username
                          </th>
                          <th scope="col" className="px-6 py-4">
                            password
                          </th>
                          <th scope="col" className="px-6 py-4">
                            Alamat
                          </th>
                          <th scope="col" className="px-6 py-4">
                            No rekening
                          </th>
                          <th scope="col" className="px-6 py-4">
                            Edit
                          </th>
                          <th scope="col" className="px-6 py-4">
                            Status
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b dark:border-neutral-500">
                          <td className="whitespace-nowrap px-6 py-4 font-medium">
                            <div>
                              <select name="brandId" className=" text-primary w-52 border-primary rounded-lg h-12 text-2xl">
                              </select>
                            </div>
                          </td>
                          <td className="whitespace-nowrap px-6 py-4 font-medium">
                            <div>
                              <select name="brandId" className=" text-primary w-52 border-primary rounded-lg h-12 text-2xl"   >
                              </select>
                            </div>
                          </td>
                          <td className="whitespace-nowrap px-6 py-4">
                            <p>
                              <input type="text" name="" className="border-primary w-52 rounded-lg text-2xl" />
                            </p>
                          </td>
                          <td className="whitespace-nowrap px-6 py-4">
                            <p>
                              <input type="text" name="" className="border-primary w-52 rounded-lg text-2xl"
                              />
                            </p>
                          </td>
                          <td className="whitespace-nowrap px-6 py-4">
                            <p>
                              <input type="text" name="" className="border-primary w-52 rounded-lg text-2xl"
                              />
                            </p>
                          </td>
                          <td className="whitespace-nowrap px-6 py-4">
                            <p>
                              <input type="text" name="" className="border-primary w-52 rounded-lg text-2xl"
                              />
                            </p>
                          </td>
                          <td className="whitespace-nowrap px-6 py-4">
                            <p>
                              <input type="text" name="" className="border-primary w-52 rounded-lg text-2xl"
                              />
                            </p>
                          </td>
                          <td className="whitespace-nowrap px-6 py-4">
                            <button className="bg-primary w-36 h-12 rounded-xl text-white hover:bg-gray-300 hover:text-primary font-bold py-2 px-4">
                              Edit
                            </button>
                          </td>
                          <td className="whitespace-nowrap px-6 py-4">
                            <button className="bg-gray-300 w-36 h-12 rounded-xl text-gray-600 hover:bg-gray-300 hover:text-primary font-bold py-2 px-4">
                              Non Aktif
                            </button>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </>
        }

      </div>

      <hr className="h-px my-8 rounded-xl mb-28" />
    </>
  )
}