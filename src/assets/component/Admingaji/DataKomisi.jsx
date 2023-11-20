import DateControl from "../../controller/ControlTanggal"
import { useState } from "react";
import { Radio } from "@material-tailwind/react";
import React, { useEffect, useRef } from "react";
import dataSet from "../../component/Salesman/DataRetur";
import "datatables.net-dt/css/jquery.dataTables.min.css";
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button } from "@nextui-org/react";
import $ from "jquery";
export default function DataKomisi() {
    const [selectOp, setSelectOp] = useState(true)
    const toggleVisibilityCancel = () => {
        setSelectOp(!selectOp)
    }
    let j = 0;
    const Row = ({ data }) => {
        var temp = [];
        for (let i = 0; i < 6; i++) {
            temp.push(<td key={j}>{data[i]}</td>)
            j++
        }
        temp.push(<td key={j}><input className="text-2xl w-72 text-primary border-0 bg-gray-200 rounded-lg" type="text" name={data[0]} defaultValue="0" /></td>)
        return <>{temp}</>
    }

    const Tabel = () => {
        var cetak = [];
        let i = 0;
        dataSet.map((e) => {
            cetak.push(<tr key={i}><Row data={e} /></tr>)
            i++;
        })
        return <>{cetak}</>;
    }
    const tableRef = useRef();
    var table;

    const test = () => {
        var data = table.$('input').serialize()
        console.log(data)
    }

    useEffect(() => {
        // Initialize DataTables within the component
        $(tableRef.current).DataTable({
            data: dataSet,
            columns: [
                { title: "Id Barang", field: "idbarang" },
                { title: "Nama Barang", field: "namabarang" },
                { title: "Harga Pcs", field: "hargapcs" },
                { title: "Harga Karton", field: "hargakarton" },
                { title: "Qty Gudang", field: "qtygudang" },
                { title: "Qty Pembelian", field: "qtypembelian" },
                { title: "Qty Retur", field: "qtyretur" },
            ],
        });
        table = new $('#example').DataTable({
            columnDefs: [
                {
                    orderable: false,
                    targets: [6]
                }
            ]
        });
    }, []);

    const [selectedKeys, setSelectedKeys] = React.useState(new Set(["Pilih"]));
    const selectedValue = React.useMemo(
        () => Array.from(selectedKeys).join(", ").replaceAll("_", " "),
        [selectedKeys]
    );

    return (
        <>
            <div className="cover selectdisable flex">
                {/* nanti digunakan memanggil nama sesuai akun*/}
                <div className="header lg:w-full md:w-1/2 text-primary text-4xl font-semibold">
                    <p>Komisi</p>
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
                    <div className="flex mt-7 text-primary float-right text-2xl" onClick={toggleVisibilityCancel}>
                        <button className="w-36 h-12 items-end bg-primary rounded-xl hover:bg-gray-300 text-white hover:text-primary font-bold py-2 px-4">
                            Search
                        </button>
                    </div>
                </div>
                {/* berisi form retur */}
            </div>
            <div className="cover mt-12 mb-5 border-2 rounded-xl" style={{ width: "100%", boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px" }}>
                <p className="pt-5 text-4xl font-semibold text-center text-primary">Data Karyawan</p>               {/* <table className="border-2 border-gray rounded-lg" ref={tableRef}></table> */}
                <div className="cover m-2">
                    <div className="cover mb-28">
                        <div className="covertable m-2">
                            <table id="example" className="border-2 border-gray rounded-lg">
                                <thead>
                                    <tr>
                                        <th>ID Karyawan</th>
                                        <th>Nama Karyawan</th>
                                        <th>Jabatan</th>
                                        <th>Target</th>
                                        <th>Realisasi</th>
                                        <th>Komisi</th>
                                        <th>Komisi Harian</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <Tabel />
                                </tbody>
                            </table>
                            <div className="flex mt-10 mb-10 text-primary m-4 float-right text-2xl">
                                <button className="w-52 h-14 items-end bg-primary rounded-2xl hover:bg-gray-300 text-white hover:text-primary font-bold py-2 px-4">
                                    Simpan
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <hr className="h-px my-10 mt-18 mb-52 rounded-xl bg-gray-400 border" />
        </>
    )
}