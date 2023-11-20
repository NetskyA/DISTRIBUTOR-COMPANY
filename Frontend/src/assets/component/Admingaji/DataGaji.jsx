import DateControl from "../../controller/ControlTanggal"
import { useEffect, useRef } from "react";
import { useState } from "react";
import $ from "jquery";
import "datatables.net-dt/css/jquery.dataTables.min.css";
import dataSet from "../../component/Salesman/DataSet";
import ComModal from "../../controller/ControlModalKeluar"
import Select from 'react-select';

// import * as XLSX from "xlsx";

import "datatables.net-buttons";
import "datatables.net-buttons-dt";
import "datatables.net-buttons-dt/css/buttons.dataTables.min.css";

export default function DataGaji() {

    let table;
    const [showModal, setShowModal] = useState(false);
    const handleCloseModal = () => {
        setShowModal(false);
    }
    const handleTogglePassword = () => {
        setShowModal(true)
    };
    useEffect(() => {

        // Initialize DataTables within the component
        dataSet.map((e) => {
            let block = document.createElement('tr');
            for (let i = 0; i < 7; i++) {
                let block2 = document.createElement('td');
                block2.innerText = e[i];
                block.appendChild(block2);
            }
            document.getElementById("isi").appendChild(block)
        })
        table = new $('#example').DataTable({
            dom: '<"top"lf>rt<"bottom"Bpi>', // Include the buttons in the DOM
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
                    <p>Gaji</p>
                </div>
                <div className="rounded-xl lg:w-1/2 float-right mr-0 mx-auto text-2xl font-semibold">
                    {/* <ControlTarget /> */}
                </div>
                {/* untuk memanggil function controller target salesman */}
            </div>
            <div className="selectdisable border-2 mt-10 flex border-gray-300 rounded-2xl lg:w-2/6 h-full" style={{ boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px" }}>
                {/* berisi from retur */}
                <div className="row ms-4 m-4 w-full">
                    <div className="flex text-primary text-2xl">
                        <p className="pt-1 pr-2">Divisi : </p>
                        <select name="divisi" id="divisi" className="border rounded-lg h-11 w-65 border-primary">
                            <option value="koor">K. Supervisor</option>
                            <option value="supervisor">Supervisor</option>
                            <option value="salesman">Salesman</option>
                        </select>
                    </div>

                    <div className="flex mt-5 text-primary  text-2xl">
                        <p className="pr-2">Tanggal : </p>
                        <DateControl />
                    </div>
                    <div className="flex mt-7 text-primary float-right text-2xl">
                        <button className="w-36 h-12 items-end bg-primary rounded-xl hover:bg-gray-300 text-white hover:text-primary font-bold py-2 px-4">
                            Search
                        </button>
                    </div>
                </div>
                {/* berisi form retur */}
            </div>
            <div className="isi">
                <div className="cover mt-12 border-2 rounded-xl" style={{ width: "100%", boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px" }}>
                    <p className="pt-5 text-4xl font-semibold text-center text-primary">Data Karyawan</p>
                    <div className="cover mb-28">
                        <div className="covertable m-2">
                            <table id="example" className="border-2 border-gray rounded-lg">
                                <thead>
                                    <tr>
                                        <th>ID Karyawan</th>
                                        <th>Nama Karyawan</th>
                                        <th>Email</th>
                                        <th>Jabatan</th>
                                        <th>Target Realisasi</th>
                                        <th>Komisi</th>
                                        <th>Potongan</th>
                                    </tr>
                                </thead>
                                <tbody id="isi">
                                </tbody>
                            </table>
                        </div>
                        <div className="flex text-primary m-4 float-right text-2xl">
                            <button onClick={handleTogglePassword} className="w-52 h-14 items-end bg-primary rounded-2xl hover:bg-gray-300 text-white hover:text-primary font-bold py-2 px-4">
                                Kirim
                            </button>
                        </div>
                        {/* <div className="min-h-screen flex items-center justify-center"> */}
                        <ComModal show={showModal} handleClose={handleCloseModal} />
                        {/* </div> */}
                    </div>
                </div>
            </div>

            <hr className="h-px my-10 mt-18 mb-52 rounded-xl bg-gray-400 border" />

        </>
    )
}