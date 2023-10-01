import React, {useEffect,useRef,useState} from "react";
import dataSet from "../../component/Salesman/DataOrder";
import CheckBox from "./temps";
import DataTarget from "../../component/Salesman/DataTarget"
import {Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button} from "@nextui-org/react";
import { useReactToPrint } from "react-to-print";
import "datatables.net-dt/css/jquery.dataTables.min.css";
import $ from "jquery";

export default function DataOrderBarang(){
    // const conponentPDF= useRef();

    const tableRef = useRef();
    useEffect(() => {
      // Initialize DataTables within the component
      $(tableRef.current).DataTable({
        data: dataSet,
        columns: [
          { title: "Nama Barang", field:"namabarang"},
          { title: "Stok Karton", field:"stokkarton" },
          { title: "Harga Karton", field:"hargakarton" },
          { title: "Stok Pcs", field:"stopcs" },
          { title: "Harga Pcs", field:"hargapcs" },
          { title: "Qty", field:"qty" },
        ],
      });
    }, []);

    const [selectedKeys, setSelectedKeys] = React.useState(new Set(["Pilih"]));
    const selectedValue = React.useMemo(
        () => Array.from(selectedKeys).join(", ").replaceAll("_", " "),
        [selectedKeys]
    );
    // const generatePDF = useReactToPrint({
    //     content:() => conponentPDF.current,
    //     documentTitle:"Export Pdf",
    //     onBeforePrint:()=>alert("sure for download"),
    //     // onAfterPrint:()=> alert("Data saved in PDF")
    //   });
    return(
        <>
        <form action="" className="mb-16">
            {/* navbaratas */}
            <div className="cover flex">
                <div className="header lg:w-full md:w-1/2 text-primary text-4xl font-semibold">
                    <p>Order</p>
                </div>
                <div className="rounded-xlnpm lg:w-1/2 float-right mx-auto text-2xl font-semibold">
                    <DataTarget/>
                </div>
            </div>
            {/* navbaratas */}

            {/* form input order */}
            <div className="selectdisable border-2 mt-10 flex border-gray-400 rounded-2xl w-5/12 h-full">
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
                        <input type="email" placeholder="email" className="border-0 w-1/2 text-xl h-10"  name="email" id="email" />
                    </div>
                    <div className="Email flex mt-3 bottom-0 text-primary  text-2xl">
                        <p className="pt-1 pr-2">Tanggal : </p>
                        <input type="datetime-local" placeholder="tanggal" className="border-0 text-xl h-10" name="date" id="date" />
                    </div>
                    <div className="MngSales flex mt-3 text-primary  text-2xl">
                        <p className="pt-1 pr-2">Metode Pembayaran : </p>
                        <Dropdown>
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
                        </Dropdown>
                    </div>
                    
                </div>
            </div>
            </form>
            {/* form input order */}

            <hr className="h-px my-8 rounded-xl bg-gray-500 border"/>

            {/* datatable */}
            <div className="cover mt-16 mb-10" style={{width:"100%"}}>
                <table className="border-2 border-gray rounded-lg" ref={tableRef}></table>
            </div>
            {/* datatable */}

            <hr className="h-px my-8 rounded-2xl bg-gray-500 border-2"/>

            {/* subtotal */}
            <div className="w-full mt-10 border rounded-xl border-gray-500">
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
                <button className="bg-primary w-52 h-16 rounded-xl hover:bg-slate-400 text-white hover:text-primary font-bold py-2 px-4">
                Submit
                </button>
            </div>
            {/* submit kirim kranjang */}

        </>

    )
}