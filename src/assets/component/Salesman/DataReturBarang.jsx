import DataTarget from "../../component/Salesman/DataTarget"
import { Radio } from "@material-tailwind/react";
import React, { useEffect, useRef } from "react";
import dataSet from "../../component/Salesman/DataRetur";
import "datatables.net-dt/css/jquery.dataTables.min.css";
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button } from "@nextui-org/react";
import $ from "jquery";

export default function ReturnBarang(){

    let j = 0;
    const Row = ({ data }) => {
        var temp = [];
        for (let i = 0; i < 6; i++) {
            temp.push(<td key={j}>{data[i]}</td>)
            j++
        }
        temp.push(<td key={j}><input className="text-2xl text-primary border-0 bg-gray-200 rounded-lg" type="text" name={data[0]} defaultValue="0"/></td>)
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

    const test = ()=>{
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

    
    return(
        <>
            <div className="cover selectdisable flex">
                
                {/* nanti digunakan memanggil nama sesuai akun*/}
                <div className="header lg:w-full md:w-1/2 text-primary text-4xl font-semibold">
                    <p>Retur</p>
                </div>
                <div className="rounded-xl lg:w-1/2 float-right mr-0 mx-auto text-2xl font-semibold">
                    <DataTarget />
                </div>
                {/* untuk memanggil function controller target salesman */}
            </div>
            <div className="selectdisable border-2 mt-10 flex border-gray-300 rounded-2xl w-6/12 h-full" style={{boxShadow:"rgba(0, 0, 0, 0.24) 0px 3px 8px"}}>
                {/* berisi from retur */}
                <div className="row ms-4 m-4 w-full">
                    <div className="flex text-primary text-2xl">
                            <p className="pt-1 pr-2">Tanggal retur : </p>
                            <input type="date" name="date" id="dates" className="border-0 text-2xl h-10" required="dates" />
                        </div>
                        <div className="flex mt-3 text-primary  text-2xl">
                            <p className="pt-1 pr-2">Nomer pemesanan : </p>
                            <input type="text" placeholder="No. pemesanan" className="border rounded-md border-primary w-72 text-2xl h-10" name="idpemesanan" id="idpemesanan" />
                            <button type="button" className="bg-primary ms-6 w-32 rounded-lg hover:bg-gray-300 hover:text-primary">Save</button>
                        </div>
                        <div className="flex mt-3 text-primary  text-2xl">
                            <p className="pt-1 pr-2">Nama Pelanggan : </p>
                            <input type="text" placeholder="nama toko" className="border-0 w-1/2 text-2xl h-10" name="toko" id="toko" />
                        </div>
                        <div className="flex mt-3 text-primary  text-2xl">
                            <p className="pt-1 pr-2">Nama Toko : </p>
                            <input type="text" placeholder="nama pelanggan" className="border-0 w-1/2 text-2xl h-10" name="pelanggan" id="pelanggan" />
                        </div>
                        <div className="flex mt-3 text-primary  text-2xl">
                            <p className="pt-2">Pengembalian : </p>
                            <div className="Uang flex ms-5">
                                <input className="relative float-left -ml-[1.5rem] mr-1 h-9 w-9 appearance-none rounded-full border-2 border-solid border-neutral-300 before:pointer-events-none before:absolute before:h-4 before:w-4 before:scale-0 before:rounded-full before:bg-transparent before:opacity-0 before:shadow-[0px_0px_0px_13px_transparent] before:content-[''] after:absolute after:z-[1] after:block after:h-4 after:w-4 after:rounded-full after:content-[''] checked:border-primary checked:before:opacity-[0.16] checked:after:absolute checked:after:left-1/2 checked:after:top-1/2 checked:after:h-[0.625rem] checked:after:w-[0.625rem] checked:after:rounded-full checked:after:border-primary checked:after:bg-primary checked:after:content-[''] checked:after:[transform:translate(-50%,-50%)] hover:cursor-pointer hover:before:opacity-[0.04] hover:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:shadow-none focus:outline-none focus:ring-0 focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] checked:focus:border-primary checked:focus:before:scale-100 checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] dark:border-neutral-600 dark:checked:border-primary dark:checked:after:border-primary dark:checked:after:bg-primary dark:focus:before:shadow-[0px_0px_0px_13px_rgba(255,255,255,0.4)] dark:checked:focus:border-primary dark:checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca]"
                                    type="radio"
                                    name="flexRadioDefault"
                                    id="radioDefault01"/>
                                <label className="mt-2 ms-2 inline-block pl-[0.15rem] hover:cursor-pointer" htmlFor="radioDefault01">
                                    Uang
                                </label>
                            </div>
                            <div className="Barang flex ms-10">
                                <input className="relative float-left -ml-[1.5rem] mr-1 h-9 w-9 appearance-none rounded-full border-2 border-solid border-neutral-300 before:pointer-events-none before:absolute before:h-4 before:w-4 before:scale-0 before:rounded-full before:bg-transparent before:opacity-0 before:shadow-[0px_0px_0px_13px_transparent] before:content-[''] after:absolute after:z-[1] after:block after:h-4 after:w-4 after:rounded-full after:content-[''] checked:border-primary checked:before:opacity-[0.16] checked:after:absolute checked:after:left-1/2 checked:after:top-1/2 checked:after:h-[0.625rem] checked:after:w-[0.625rem] checked:after:rounded-full checked:after:border-primary checked:after:bg-primary checked:after:content-[''] checked:after:[transform:translate(-50%,-50%)] hover:cursor-pointer hover:before:opacity-[0.04] hover:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:shadow-none focus:outline-none focus:ring-0 focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] checked:focus:border-primary checked:focus:before:scale-100 checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] dark:border-neutral-600 dark:checked:border-primary dark:checked:after:border-primary dark:checked:after:bg-primary dark:focus:before:shadow-[0px_0px_0px_13px_rgba(255,255,255,0.4)] dark:checked:focus:border-primary dark:checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca]"
                                        type="radio"
                                        name="flexRadioDefault"
                                        id="radioDefault01"/>
                                <label className="mt-2 ms-2 inline-block pl-[0.15rem] hover:cursor-pointer" htmlFor="radioDefault01">
                                    Barang
                                </label>
                            </div>                       
                        </div>
                    </div>
                {/* berisi form retur */}
            </div>
            <p className="pr-2 pt-4 text-md italic text-primary">*pastikan nomer orderan sama dengan histori penjualan & metode pengembalian</p>

            <div className="cover mt-12 mb-5 border-2 rounded-xl" style={{ width: "100%",boxShadow:"rgba(0, 0, 0, 0.24) 0px 3px 8px" }}>
            <p className="pt-8 text-4xl font-semibold text-center text-primary">Data Barang</p>
                {/* <table className="border-2 border-gray rounded-lg" ref={tableRef}></table> */}
                <div className="cover m-2">
                <table id="example" className="display border-2 border-gray rounded-lg">
                    <thead>
                        <tr>
                            <th>Id Barang</th>
                            <th>Nama Barang</th>
                            <th>Harga Pcs</th>
                            <th>Harga Karton</th>
                            <th>Qty Gudang</th>
                            <th>Qty Pembelian</th>
                            <th>Qty Retur</th>
                        </tr>
                    </thead>
                    <tbody>
                        <Tabel /> 
                    </tbody>
                </table>
                </div>
            </div>

            <div className="w-full mt-16 mx-auto border-2 rounded-xl" style={{boxShadow:"rgba(0, 0, 0, 0.24) 0px 3px 8px"}}>
                <div className="cover m-5">
                    <p className="text-primary text-4xl font-semibold pt-2 mb-2">Hasil</p>
                    <table className="text-left text-2xl font-light border rounded-xl w-full" style={{boxShadow:"rgba(0, 0, 0, 0.24) 0px 3px 8px"}}>
                        <thead className="border-b font-medium dark:border-neutral-500">
                            <tr>
                            <th scope="col" className="px-6 py-4">Id Barang</th>
                            <th scope="col" className="px-6 py-4">Nama Barang</th>
                            <th scope="col" className="px-6 py-4">Harga</th>
                            <th scope="col" className="px-6 py-4">Qty Awal</th>
                            <th scope="col" className="px-6 py-4">Qty Retur</th>
                            <th scope="col" className="px-6 py-4">Metode</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="border-b dark:border-neutral-500">
                            <td className="whitespace-nowrap px-6 py-4 font-medium">BR0001</td>
                            <td className="whitespace-nowrap px-6 py-4 font-medium">Kecap Manis Bango 12 ml</td>
                            <td className="whitespace-nowrap px-6 py-4">Rp. 12.000</td>
                            <td className="whitespace-nowrap px-6 py-4">5</td>
                            <td className="whitespace-nowrap px-6 py-4">1</td>
                            <td className="whitespace-nowrap px-6 py-4">Barang</td>
                            </tr>
                        </tbody>
                    </table>
                    <p className="pr-2 pt-4 text-md italic text-primary">*cek kembali semua form sebelum submit</p>
                </div>
            </div>
                <div className="flex mb-28">
                    <div className="w w-full mt-10 mb-5">
                        <button onClick={test} className="bg-primary w-52 h-16 rounded-xl text-white hover:bg-gray-300 hover:text-primary font-bold py-2 px-4">
                            Submit
                        </button>
                    </div>
                    <div className="w w-52 ms-14 mt-10 mb-5 float-right">
                        <button onClick={test} className="w-52 h-16 bg-gray-300 rounded-xl hover:bg-slate-400 text-gray-600 hover:text-white font-bold py-2 px-4">
                            Close
                        </button>
                    </div>
                </div>
          
            <hr className="h-px my-8 rounded-xl bg-gray-400 border" />

        </>
    )
}