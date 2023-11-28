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
    let jabatan = [{id:1,nama:"Jabatan 1"},{id:2,nama:"Jabatan 2"},{id:3,nama:"Jabatan 3"}]
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
            data: [{id_user:1,id_jabatan:2,username:"temp",password:"temp",no_handphone:"123",alamat:"halo",foto:"1.png",no_rekening:"12314",id_atasan:2}],
            // 'columnDefs': [         // see https://datatables.net/reference/option/columns.searchable
            //     {
            //         'searchable': false,
            //         'targets': [2, 3, 4, 5]
            //     },
            // ],
            columns: [
                { title: "ID User", data: "id_user" },
                {title:"Jabatan",
            data:"id_jabatan",
            render: function (data, type, row) {
                if (type === 'display') {
                    // Render an input text data with the data
                    let a = [];
                    {jabatan.forEach((br, idx) => {
                        console.log(data)
                        console.log(br)
                        data === br.id ? 
                        a.push(`<option selected="selected" value="${br.id}">${br.nama}</option>`) : 
                        a.push(`<option value="${br.id}">${br.nama}</option>`) 
                      
                    })}
                    console.log(a)
                    return  '<select>'+a+'</select>'
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
                { title: "Edit", data:null},
                { title: "Status", data:null},
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
            <div className="cover mt-12 border-2 mb-28 rounded-xl" style={{width: "97%",boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px" ,overflowX:"scroll"}}>
                {/* <div className="flex">
                    <div className="flex text-primary text-2xl">
                       
                    </div>
                </div> */}
                {/* {!isTambah &&
                    <div className="selectdisable border-2 ms-4 mt-1 mb-4 border-gray-300 rounded-2xl w-1/3 h-full" style={{ boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px" }}>
                        <div className="row ms-4 m-4 w-full" >
                            <div className="flex text-primary text-2xl">
                                <p className="pt-1 pr-2 w-52">ID Toko : </p>
                                <input
                                    type="text"
                                    name="ID Toko"
                                    className="border-primary rounded-lg w-60 text-2xl h-10"
                                    placeholder="KLR00001"
                                    required="text" />
                            </div>
                            <div className="flex text-primary mt-3 text-2xl">
                                <p className="pt-2 pr-2 w-52">ID Jabatan : </p>
                                <select name="brandId" id="selectIdbrand" className="w-60 text-primary border-primary rounded-lg h-12 text-2xl">
                                    <option value="id1">KLR00001</option>
                                    <option value="id2">2</option>
                                    <option value="id3">3</option>
                                    <option value="id4">4</option>
                                    <option value="id5">5</option>
                                </select>
                            </div>
                            <div className="flex text-primary mt-3 text-2xl">
                                <p className="pt-2 pr-2 w-52">ID Atasan : </p>
                                <select name="brandId" id="selectIdbrand" className="w-60 text-primary border-primary rounded-lg h-12 text-2xl">
                                    <option value="id1">KTR00001</option>
                                    <option value="id2">2</option>
                                    <option value="id3">3</option>
                                    <option value="id4">4</option>
                                    <option value="id5">5</option>
                                </select>
                            </div>
                            <div className="flex text-primary mt-3 text-2xl">
                                <p className="pt-1 pr-2 w-52">Nama Toko : </p>
                                <input
                                    type="text"
                                    name="JNama Toko"
                                    className="border-primary rounded-lg w-60 text-2xl h-10"
                                    placeholder="Nama Toko"
                                    required="text" />
                            </div>
                            <div className="flex text-primary mt-3 text-2xl">
                                <p className="pt-1 pr-2 w-52">Email : </p>
                                <input
                                    type="text"
                                    name="Email"
                                    className="border-primary rounded-lg w-60 text-2xl h-10"
                                    placeholder="Nama Toko"
                                    required="text" />
                            </div>
                            <div className="flex text-primary mt-3 text-2xl">
                                <p className="pt-1 pr-2 w-52">Username : </p>
                                <input
                                    type="text"
                                    name="Username"
                                    className="border-primary rounded-lg w-60 text-2xl h-10"
                                    placeholder="Username"
                                    required="text" />
                            </div>
                            <div className="flex text-primary mt-3 text-2xl">
                                <p className="pt-1 pr-2 w-52">Password: </p>
                                <input
                                    type="password"
                                    name="password"
                                    className="border-primary rounded-lg w-60 text-2xl h-10"
                                    placeholder="Password"
                                    required="text" />
                            </div>
                            <div className="flex text-primary mt-3 text-2xl">
                                <p className="pt-1 pr-2 w-52">No Hp : </p>
                                <input
                                    type="text"
                                    name="NO2"
                                    className="border-primary rounded-lg w-60 text-2xl h-10"
                                    placeholder="No. 2"
                                    required="text" />
                            </div>
                            <div className="flex text-primary mt-3 text-2xl">
                                <p className="pt-1 pr-2 w-52">Status Kelurahan : </p>
                                <input
                                    type="text"
                                    name="Jumlah Karton"
                                    className="border-primary rounded-lg w-60 text-2xl h-10"
                                    placeholder="Status Kelurahan 1"
                                    required="text" />
                            </div>
                            <div className="flex text-primary mt-3 text-2xl">
                                <p className="pt-1 pr-2 w-52">Tanggal Masuk : </p>
                                <input type="datetime-local" name="" id="" className="border-primary rounded-lg w-60 text-2xl h-10" />
                            </div>
                            <div className="flex float-right mr-4">
                                <button className="bg-primary w-40 m-4 h-14 rounded-xl text-white hover:bg-gray-300 hover:text-primary font-bold py-2 px-4">
                                    Simpan
                                </button>
                            </div>
                        </div>
                    </div>
                } */}
                <table 
                      className="text-left text-2xl mt-5 font-light border rounded-xl w-full"
                      style={{ boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px"}}
                    >
                      <thead className="border-b font-medium dark:border-neutral-500">
                        <tr>
                          <th scope="col" className="px-6 py-4">
                            Id User
                          </th>
                          <th scope="col" className="px-6 py-4">
                            Jabatan
                          </th>
                          <th scope="col" className="px-6 py-4">
                            username
                          </th>
                          <th scope="col" className="px-6 py-4">
                           password
                          </th>
                          <th scope="col" className="px-6 py-4">
                            No hp
                          </th>
                          <th scope="col" className="px-6 py-4">
                            Alamat
                          </th>
                          <th scope="col" className="px-6 py-4">
                           Foto
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
                        {/* {barang.map((b, idx) => { */}
                          {/* return ( */}
                            <tr
                            //   key={idx}
                              className="border-b dark:border-neutral-500"
                            >
                              <td className="whitespace-nowrap px-6 py-4 font-medium">
                                {/* <p>{b.id_barang}</p> */}
                              </td>
                              <td className="whitespace-nowrap px-6 py-4 font-medium">
                                <div>
                                  <select
                                    name="brandId"
                                    // id={`id_brand${b.id_barang}`}
                                    className="w-60 text-primary border-primary rounded-lg h-12 text-2xl"
                                  >
                                    {/* {data.brand.map((br, idx) => {
                                      return b.id_brand == br.id_brand ? (
                                        <option
                                          key={idx}
                                          value={br.id_brand}
                                          selected="selected"
                                        >
                                          {br.nama_brand}
                                        </option>
                                      ) : (
                                        <option key={idx} value={br.id_brand}>
                                          {br.nama_brand}
                                        </option>
                                      );
                                    })} */}
                                  </select>
                                </div>
                              </td>
                              <td className="whitespace-nowrap px-6 py-4">
                                <p>
                                  <input
                                    type="text"
                                    name=""
                                    className="border-primary rounded-lg text-2xl"
                                    // id={`nama_barang${b.id_barang}`}
                                    // value={b.nama_barang}
                                    // onChange={(e) =>
                                    //   handleInputChange(
                                    //     e,
                                    //     b.id_barang,
                                    //     "nama_barang"
                                    //   )
                                    // }
                                  />
                                </p>
                              </td>
                              <td className="whitespace-nowrap px-6 py-4">
                                <p>
                                  <input
                                    type="text"
                                    name=""
                                    className="border-primary rounded-lg text-2xl"
                                    // id={`harga_pcs${b.id_barang}`}
                                    // value={b.harga_pcs}
                                    // onChange={(e) =>
                                    //   handleInputChange(
                                    //     e,
                                    //     b.id_barang,
                                    //     "harga_pcs"
                                    //   )
                                    // }
                                  />
                                </p>
                              </td>
                              <td className="whitespace-nowrap px-6 py-4">
                                <p>
                                  <input
                                    type="text"
                                    name=""
                                    className="border-primary rounded-lg text-2xl"
                                    // id={`harga_karton${b.id_barang}`}
                                    // value={b.harga_karton}
                                    // onChange={(e) =>
                                    //   handleInputChange(
                                    //     e,
                                    //     b.id_barang,
                                    //     "harga_karton"
                                    //   )
                                    // }
                                  />
                                </p>
                              </td>
                              <td className="whitespace-nowrap px-6 py-4">
                                <button
                                //   onClick={() => editBarang(b.id_barang)}
                                  className="bg-primary w-36 h-12 rounded-xl text-white hover:bg-gray-300 hover:text-primary font-bold py-2 px-4"
                                >
                                  Edit
                                </button>
                              </td>
                              <td className="whitespace-nowrap px-6 py-4">
                                {/* {b.status_barang == 0 ? (
                                  <button
                                    // onClick={() => statusBarang(b.id_barang, 1)}
                                    className="bg-primary w-36 h-12 rounded-xl text-white hover:bg-gray-300 hover:text-primary font-bold py-2 px-4"
                                  >
                                    Aktif
                                  </button>
                                ) : (
                                  <button
                                    // onClick={() => statusBarang(b.id_barang, 0)}
                                    className="bg-gray-300 w-36 h-12 rounded-xl text-gray-600 hover:bg-gray-300 hover:text-primary font-bold py-2 px-4"
                                  >
                                    Non Aktif
                                  </button>
                                )} */}
                                                                  <button
                                    // onClick={() => statusBarang(b.id_barang, 0)}
                                    className="bg-gray-300 w-36 h-12 rounded-xl text-gray-600 hover:bg-gray-300 hover:text-primary font-bold py-2 px-4"
                                  >
                                    Non Aktif
                                  </button>
                              </td>
                            </tr>
                          {/* ); */}
                        {/* })} */}
                      </tbody>
                    </table>
                {/* <div className="cover mt-12 border-2 mb-28 rounded-xl" style={{ width: "100%", boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px" }}>
                    <div className="flex mx-auto items-center justify-center">
                        <p className="pt-5 text-4xl font-semibold text-center text-primary">Data User</p>
                        <img src={LogoPerusahaan} className="w-32 h-32 mt-4" alt="logo perusahaan" />
                    </div>
                    <div className="cover mb-28">
                        <div className="covertable m-2">
                            <table id="example" className="border-2 border-gray rounded-lg"> */}
                                {/* <thead>
                  <tr>
                    <th>ID User</th>
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
                            {/* </table>
                        </div>
                    </div>
                </div> */}
            </div>
            <hr className="h-px my-8 rounded-xl mb-28" />
        </>
    )
}