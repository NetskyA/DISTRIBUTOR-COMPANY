import React, { useEffect, useRef, useState } from "react";
import dataSet from "../../component/Salesman/DataOrder";
import DataTarget from "../../component/Salesman/DataTarget"
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button } from "@nextui-org/react";
import { useReactToPrint } from "react-to-print";
import "datatables.net-dt/css/jquery.dataTables.min.css";
import $ from "jquery";

export default function DataOrderBarang() {
    let j = 0;
    const Row = ({ data }) => {
        var temp = [];
        for (let i = 0; i < 5; i++) {
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
    var table=$('#example').DataTable({
        columnDefs: [
            {
                orderable: false,
                targets: [5]
            }
        ]
    });

    const test = ()=>{
        var data = table.$('input').serialize()
        console.log(data)
    }

    useEffect(() => {
        // Initialize DataTables within the component
        $(tableRef.current).DataTable({
            data: dataSet,
            columns: [
                { title: "Nama Barang", field: "namabarang" },
                { title: "Stok Karton", field: "stokkarton" },
                { title: "Harga Karton", field: "hargakarton" },
                { title: "Stok Pcs", field: "stopcs" },
                { title: "Harga Pcs", field: "hargapcs" },
                { title: "Qty", field: "qty" },
            ],
        });
        table = $('#example').DataTable({
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
                    <div className="rounded-xl lg:w-1/2 float-right mx-auto text-2xl font-semibold">
                        <DataTarget />
                    </div>
                </div>
                {/* navbaratas */}

                {/* form input order */}
                <div className="selectdisable border-2 mt-10 flex rounded-2xl w-5/12 h-full" style={{boxShadow:"rgba(0, 0, 0, 0.24) 0px 3px 8px"}}>
                    <div className="row ms-4 m-2 w-full">
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
                            <input type="number" placeholder="no 1" required="number" className="border-0 w-72 text-xl h-10" name="nohp" id="nohp" />
                            <p className="pt-1 pr-2 ps-2"> & </p>
                            <input type="number" placeholder="no 2" className="border-0 w-72 text-xl h-10" name="nohp" id="nohp" />
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
                            {/* <Dropdown>
                                <DropdownTrigger>
                                    <Button
                                        variant="bordered"
                                        className="capitalize w-32 h-10 border-0 "
                                    >
                                        {selectedValue}
                                    </Button>
                                </DropdownTrigger>
                                <DropdownMenu className="text-2xl"
                                    aria-label="Single selection example"
                                    variant="flat"
                                    disallowEmptySelection
                                    selectionMode="single"
                                    selectedKeys={selectedKeys}
                                    onSelectionChange={setSelectedKeys}
                                >
                                    <DropdownItem key="tunai">Tunai</DropdownItem>
                                    <DropdownItem key="transfer">Transfer</DropdownItem>
                                </DropdownMenu>
                            </Dropdown> */}
                        </div>

                    </div>
                </div>
            </form>
            {/* form input order */}

            <hr className="h-px my-8 rounded-xl bg-gray-500 border" />

            {/* datatable */}
            <div className="cover mt-16 border-2 rounded-xl mb-10" style={{ width: "100%" }}>
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
                            <th>Qty</th>
                        </tr>
                    </thead>
                    <tbody>
                        <Tabel /> 
                    </tbody>
                </table>
                </div>
            </div>
            {/* datatable */}

            <hr className="h-px my-8 rounded-2xl bg-gray-500 border-2" />

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
            <div className="w w-52 float-left mt-8 mb-5">
                <button onClick={test} className="bg-primary w-52 h-16 rounded-xl hover:bg-slate-400 text-white hover:text-primary font-bold py-2 px-4">
                    Submit
                </button>
            </div>
            {/* submit kirim kranjang */}

        </>

    )
}