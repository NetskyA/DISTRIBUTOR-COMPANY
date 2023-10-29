import React, { useEffect, useRef, useState } from "react";
import dataSet from "../../component/Salesman/DataOrder";
import DataTarget from "../../controller/ControlTarget"
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button } from "@nextui-org/react";
import { useReactToPrint } from "react-to-print";
import "datatables.net-dt/css/jquery.dataTables.min.css";
import $ from "jquery";

export default function DataOrderBarang() {
    let j = 0;
    let k=1;
    const Row = ({ data }) => {
        var temp = [];
        for (let i = 0; i < 5; i++) {
            temp.push(<td key={j}>{data[i]}</td>)
            j++
            k++;
        }
        temp.push(<td key={j}><input className="text-2xl text-primary border-0 bg-gray-200 rounded-lg" type="number" onKeyUp={(e)=>{if(e.target.value<0){
            e.target.value=0;
        }else if(parseInt(e.target.value)>parseInt(data[1])) {e.target.value = data[1];}
        }} min="0" max={data[1]} name={data[0]} defaultValue="0"/></td>)
        temp.push(<td key={k}><input className="text-2xl text-primary border-0 bg-gray-200 rounded-lg" type="number" min="0" onKeyUp={(e)=>{if(e.target.value<0){
            e.target.value=0;
        }else if(parseInt(e.target.value)>parseInt(data[3])) {e.target.value = data[3];}
        }} max={data[3]} name={data[0]} defaultValue="0"/></td>)
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
        
        table = new $('#example').DataTable({
            columnDefs: [
                {
                    orderable: false,
                    targets: [5]
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
            <form action="" className="mb-16">
                {/* navbaratas */}
                <div className="cover flex" >
                    <div className="header lg:w-full md:w-1/2 text-primary text-4xl font-semibold">
                        <p>Order</p>
                    </div>
                    <div className="rounded-xl lg:w-1/2 float-right mr-0 mx-auto text-2xl font-semibold">
                        <DataTarget />
                    </div>
                </div>
                {/* navbaratas */}

                {/* form input order */}
                <div className="selectdisable w-6/12 border-2 mt-10 flex rounded-2xl h-full" style={{boxShadow:"rgba(0, 0, 0, 0.24) 0px 3px 8px"}}>
                    <div className="row ms-4 m-4 w-full">
                        <div className="noId flex text-primary text-2xl">
                            <p className="pt-1 pr-2">Nama Pelanggan : </p>
                            <input type="text" placeholder="nama" className="border-0 w-1/2 text-2xl h-10" name="nama" id="nama" />
                        </div>
                        <div className="MSales flex mt-3 text-primary  text-2xl">
                            <p className="pt-1 pr-2">Nama Toko : </p>
                            <input type="text" placeholder="nama toko" className="border-0 w-1/2 text-xl h-10" name="toko" id="toko" />
                        </div>
                        <div className="Adress flex mt-3 text-primary  text-2xl">
                            <p className="pt-1 pr-2">Alamat : </p>
                            <input type="text" placeholder="alamat" className="border-0 w-1/2 text-xl h-10" name="alamat" id="alamat" />
                        </div>
                        <div className="PhoneNumber flex mt-3 text-primary  text-2xl">
                            <p className="pt-1 pr-2">No. Hp : </p>
                            <input type="number" placeholder="no 1" required="number" className="border-0 w-64 text-xl h-10" name="nohp" id="nohp" />
                            <p className="pt-1 pr-2 ps-2"> & </p>
                            <input type="number" placeholder="no 2" className="border-0 w-64 text-xl h-10" name="nohp" id="nohp" />
                        </div>
                        <div className="Email flex mt-3 text-primary  text-2xl">
                            <p className="pt-1 pr-2">Email : </p>
                            <input type="email" placeholder="email" className="border-0 w-1/2 text-xl h-10" name="email" id="email" />
                        </div>
                        <div className="Email flex mt-3 bottom-0 text-primary text-2xl">
                            <p className="pt-1 pr-2">Tanggal : </p>
                            <input type="datetime-local" placeholder="tanggal" className="border-0 text-xl h-10" name="date" id="date" />
                        </div>
                        <div className="MngSales flex mt-3 text-primary  text-2xl">
                            <p className="pt-1 pr-2">Metode Pembayaran : </p>
                            <div className="Uang flex ms-5">
                                <input className="relative float-left -ml-[1.5rem] mr-1 h-9 w-9 appearance-none rounded-full border-2 border-solid border-neutral-300 before:pointer-events-none before:absolute before:h-4 before:w-4 before:scale-0 before:rounded-full before:bg-transparent before:opacity-0 before:shadow-[0px_0px_0px_13px_transparent] before:content-[''] after:absolute after:z-[1] after:block after:h-4 after:w-4 after:rounded-full after:content-[''] checked:border-primary checked:before:opacity-[0.16] checked:after:absolute checked:after:left-1/2 checked:after:top-1/2 checked:after:h-[0.625rem] checked:after:w-[0.625rem] checked:after:rounded-full checked:after:border-primary checked:after:bg-primary checked:after:content-[''] checked:after:[transform:translate(-50%,-50%)] hover:cursor-pointer hover:before:opacity-[0.04] hover:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:shadow-none focus:outline-none focus:ring-0 focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] checked:focus:border-primary checked:focus:before:scale-100 checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] dark:border-neutral-600 dark:checked:border-primary dark:checked:after:border-primary dark:checked:after:bg-primary dark:focus:before:shadow-[0px_0px_0px_13px_rgba(255,255,255,0.4)] dark:checked:focus:border-primary dark:checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca]"
                                    type="radio"
                                    name="flexRadioDefault"
                                    id="radioDefault01"/>
                                <label className="mt-2 ms-2 inline-block pl-[0.15rem] hover:cursor-pointer" htmlFor="radioDefault01">
                                    Tunai
                                </label>
                            </div>
                            <div className="Barang flex ms-10">
                                <input className="relative float-left -ml-[1.5rem] mr-1 h-9 w-9 appearance-none rounded-full border-2 border-solid border-neutral-300 before:pointer-events-none before:absolute before:h-4 before:w-4 before:scale-0 before:rounded-full before:bg-transparent before:opacity-0 before:shadow-[0px_0px_0px_13px_transparent] before:content-[''] after:absolute after:z-[1] after:block after:h-4 after:w-4 after:rounded-full after:content-[''] checked:border-primary checked:before:opacity-[0.16] checked:after:absolute checked:after:left-1/2 checked:after:top-1/2 checked:after:h-[0.625rem] checked:after:w-[0.625rem] checked:after:rounded-full checked:after:border-primary checked:after:bg-primary checked:after:content-[''] checked:after:[transform:translate(-50%,-50%)] hover:cursor-pointer hover:before:opacity-[0.04] hover:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:shadow-none focus:outline-none focus:ring-0 focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] checked:focus:border-primary checked:focus:before:scale-100 checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] dark:border-neutral-600 dark:checked:border-primary dark:checked:after:border-primary dark:checked:after:bg-primary dark:focus:before:shadow-[0px_0px_0px_13px_rgba(255,255,255,0.4)] dark:checked:focus:border-primary dark:checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca]"
                                        type="radio"
                                        name="flexRadioDefault"
                                        id="radioDefault01"/>
                                <label className="mt-2 ms-2 inline-block pl-[0.15rem] hover:cursor-pointer" htmlFor="radioDefault01">
                                    Transfer
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
            <p className="pr-2 pt-4 text-md italic text-primary">*perhatikan tanggal pemesanan & metode pembayaran</p>
            </form>

            {/* form input order */}

            {/* datatable */}
            <div className="cover mt-16 border-2 rounded-xl mb-10" style={{ width: "100%",boxShadow:"rgba(0, 0, 0, 0.24) 0px 3px 8px" }}>
                {/* <table className="border-2 border-gray rounded-lg" ref={tableRef}></table> */}
                <p className="pt-8 text-4xl font-semibold text-center text-primary">Data Barang</p>
                <div className="cover m-2">
                <table id="example" className="display border-2 border-gray rounded-lg">
                    <thead>
                        <tr>
                            <th>Nama Barang</th>
                            <th>Stok Karton</th>
                            <th>Harga Karton</th>
                            <th>Stok Pcs</th>
                            <th>Harga Pcs</th>
                            <th>Qty Karton</th>
                            <th>Qty PCS</th>
                        </tr>
                    </thead>
                    <tbody>
                        <Tabel /> 
                    </tbody>
                </table>
                </div>
            </div>
            {/* datatable */}

            {/* subtotal */}
            <div className="w-full mt-10 border rounded-xl " style={{boxShadow:"rgba(0, 0, 0, 0.24) 0px 3px 8px"}}>
                <div className="m-2">
                    <div className="noId flex text-primary  text-2xl">
                        <p>Total harga : </p>
                        <p className="ms-4">Rp. 1.000.000</p>
                    </div>
                    <div className="MSales flex mt-4 text-primary  text-2xl">
                        <p>Metode Pembayaran : </p>
                        <p className="ms-4">Transfer</p>
                    </div>
                    <div className="MSales flex mt-4 text-primary  text-2xl">
                        <p>Nama Pelanggan : </p>
                        <p className="ms-4">Aldi</p>
                    </div>
                    <div className="MSales flex mt-4 text-primary  text-2xl">
                        <p>Nama Sales : </p>
                        <p className="ms-4">Avin</p>
                    </div>
                </div>
            </div>
            {/* subtotal */}

            {/* submit kirim kranjang */}
            <div className="w w-52 mb-28 float-left mt-8">
                <button onClick={test} className="bg-primary w-52 h-16 rounded-xl text-white hover:bg-gray-300 hover:text-primary font-bold py-2 px-4">
                    Submit
                </button>
            </div>
            {/* submit kirim kranjang */}   
        </>

    )
}