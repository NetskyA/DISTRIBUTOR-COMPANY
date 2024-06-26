import React, { useEffect, useRef, useState } from "react";
import ControlTarget from "../../controller/ControlTarget"
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button } from "@nextui-org/react";
import { useLoaderData, useNavigate, useRevalidator } from "react-router-dom";
import { useReactToPrint } from "react-to-print";
import "datatables.net-dt/css/jquery.dataTables.min.css";
import $ from "jquery";
import { useForm } from "react-hook-form";
import formatter from "../../controller/formatter";
import client from "../../controller/client";

export default function DataOrderBarang() {
    let data = useLoaderData();
    let revalidator = useRevalidator();
    var now = new Date();
    const date = now.getDate().toString().padStart(2, "0") +
        "-" +
        (now.getMonth() + 1).toString().padStart(2, "0") +
        "-" +
        now.getFullYear().toString().padStart(4, "0");
    const [barang, setbarang] = useState(data.barang);
    const [metode, setmetode] = useState("Tunai")
    const [refresh, setrefresh] = useState(false)
    const [temp, setdata] = useState({
        nama: "",
        alamat: "",
        nohp1: "",
        nohp2: "",
    })
    let [total, settotal] = useState(0);
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({

    });
    let table;
    let navigate = useNavigate();
    useEffect(() => {
        table = new $("#example").DataTable({
            dom: '<"top"lf>rt<"bottom"pi>',
            data: barang,
            'columnDefs': [         // see https://datatables.net/reference/option/columns.searchable
                {
                    'searchable': false,
                    'targets': [2, 3, 4, 5]
                },
            ],
            columns: [
                { title: "Id Barang", data: "id_barang" },
                { title: "Nama Barang", data: "nama_barang" },
                {
                    title: "Stok Karton", data: "stok_karton", render: function (data, type) {
                        var number = $.fn.dataTable.render
                            .number('.', '.', 0, '')
                            .display(data);

                        if (type === 'display') {

                            return `<span>${number} Karton</span>`;
                        }

                        return number;
                    }
                },
                {
                    title: "Stok Pcs", data: "stok_pcs", render: function (data, type) {
                        var number = $.fn.dataTable.render
                            .number('.', '.', 0, '')
                            .display(data);

                        if (type === 'display') {

                            return `<span>${number}  Pcs</span>`;
                        }

                        return number;
                    }
                },
                {
                    title: "Harga Karton", data: "harga_karton", render: function (data, type) {
                        var number = $.fn.dataTable.render
                            .number('.', '.', 0, 'Rp ')
                            .display(data);

                        if (type === 'display') {

                            return `<span>${number}</span>`;
                        }

                        return number;
                    }
                },
                {
                    title: "Harga Pcs", data: "harga_pcs", render: function (data, type) {
                        var number = $.fn.dataTable.render
                            .number('.', '.', 0, 'Rp ')
                            .display(data);

                        if (type === 'display') {

                            return `<span>${number}</span>`;
                        }

                        return number;
                    }
                },
                {
                    title: "Qty Karton",
                    data: null,
                    render: function (data, type, row) {
                        if (type === 'display') {
                            // Render an input text data with the data
                            return `<input type="number" value="0" min="0" data-row-id="${row.id_barang}" class="data-input-karton w-40 text-xl"/>`
                        }
                        return data;
                    },
                },
                {
                    title: "Qty Pcs",
                    data: null,
                    render: function (data, type, row) {
                        if (type === 'display') {
                            // Render an input text data with the data
                            return `<input type="number" value="0" min="0" data-row-id="${row.id_barang}" class="data-input-pcs w-40 text-xl" />`
                        }
                        return data;
                    },
                }
            ],
            destroy: true,
            "bDestroy": true
        });

        $('#example').on('change', '.data-input-karton', function () {
            const newValue = $(this).val();
            const rowId = $(this).data('row-id');
            if (newValue < 0) {
                $(this).val(0);
                return;
            }
            let data = barang;
            let jml = data[data.findIndex(e => e.id_barang === rowId)].stok_karton;
            if (newValue > jml) {
                $(this).val(jml)
                updateDataKarton(jml, rowId);
                return;
            }

            updateDataKarton(newValue, rowId);
        });
        $('#example').on('change', '.data-input-pcs', function () {
            const newValue = $(this).val();
            const rowId = $(this).data('row-id');
            if (newValue < 0) {
                $(this).val(0);
                return;
            }
            let data = barang;
            let jml = data[data.findIndex(e => e.id_barang === rowId)].stok_pcs;
            if (newValue > jml) {
                $(this).val(jml)
                updateDataPcs(jml, rowId);
                return;
            }
            updateDataPcs(newValue, rowId);
        });
    }, [refresh]);

    const hitungTotal = (data) => {
        let harga = 0;
        for (let i = 0; i < data.length; i++) {
            harga += data[i].harga_pcs * parseInt(data[i].qty_pcs);
            harga += data[i].harga_karton * parseInt(data[i].qty_karton);
        }
        settotal(harga)
    }

    function updateDataPcs(newValue, rowId) {
        // Handle the data update here
        // You can use the `newValue` and `rowId` to update your data source
        // For example, update `dataSet` or another state variable in your React component
        let data = barang;
        data[data.findIndex(e => e.id_barang === rowId)].qty_pcs = newValue;
        setbarang(data);
        hitungTotal(data)
    }
    function updateDataKarton(newValue, rowId) {
        // Handle the data update here
        // You can use the `newValue` and `rowId` to update your data source
        // For example, update `dataSet` or another state variable in your React component
        let data = barang;
        data[data.findIndex(e => e.id_barang === rowId)].qty_karton = newValue;
        setbarang(data);
        hitungTotal(data)
    }
    const [selectedKeys, setSelectedKeys] = React.useState(new Set(["Pilih"]));
    const selectedValue = React.useMemo(
        () => Array.from(selectedKeys).join(", ").replaceAll("_", " "),
        [selectedKeys]
    );

    const order = async () => {
        console.log(barang)
        let radio = document.getElementsByName("flexRadioDefault");
        if ((!radio[0].checked && !radio[1].checked)) {
            window.scrollTo(0, 0);

            document.getElementsByName("flexRadioDefault")[0].focus();
            return
        }
        if ((document.getElementById("nama").value === "" || document.getElementById("nama").value === "Tidak Ditemukan")) {
            window.scrollTo(0, 0);

            document.getElementById("toko").focus();
            return
        }
        let temp = barang.filter(e => parseInt(e.qty_karton) !== 0 || parseInt(e.qty_pcs) != 0);
        if (temp.length == 0) {
            window.scrollTo(0, 0);
        }
        let toko = await client.post("/api/gettoko", {
            nama: document.getElementById("toko").value
        })
        let hasil = await client.post("/api/order", {
            toko: toko.data,
            user: data.sales,
            barang: temp,
            tanggal: document.getElementById("date").value,
            status: (metode === "Tunai") ? 0 : 1,
            total: total
        })
        setdata({
            nama: "",
            alamat: "",
            nohp1: "",
            nohp2: "",
        })
        settotal(0);
        document.getElementById("toko").value = "";
        window.scrollTo(0, 0);
        revalidator.revalidate();
        setrefresh(!refresh)
        navigate("/Salesman/Keranjang")
    }

    const search = async (e) => {
        if (e.key === "Enter") {
            let nama = document.getElementById("toko").value;
            try {
                let toko = await client.post("/api/gettoko", {
                    nama: nama
                })
                setdata({
                    nama: toko.data.nama_konsumen,
                    alamat: toko.data.alamat_toko,
                    nohp1: toko.data.no_handphone1,
                    nohp2: toko.data.no_handphone2,
                })
            } catch (error) {
                setdata({
                    nama: "Tidak Ditemukan",
                    alamat: "Tidak Ditemukan",
                    nohp1: 0,
                    nohp2: 0,
                })
            }
        }
    }
    return (
        <>

            {/* navbaratas */}
            <div className="cover flex" >
                <div className="header lg:w-full md:w-1/2 text-primary text-4xl font-semibold">
                    <p>Order</p>
                </div>
                <div className="rounded-xl lg:w-1/2 float-right mr-0 mx-auto text-2xl font-semibold">
                    <ControlTarget current={data.targetSekarang} target={data.currtarget} />
                </div>
            </div>
            {/* navbaratas */}

            {/* form input order */}
            <div className="selectdisable w-6/12 border-2 mt-10 flex rounded-2xl h-full" style={{ boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px" }}>
                <div className="row ms-4 m-4 w-full">
                    <div className="MSales flex text-primary  text-2xl">
                        <p className="pt-1 w-52 pr-2">Nama Toko : </p>
                        <input type="text" onKeyDown={(e) => { search(e) }} placeholder="nama toko" className="border border-primary rounded-lg w-1/2 text-xl h-10" name="toko" id="toko" />
                    </div>
                    <div className="noId flex  mt-3  text-primary text-2xl">
                        <p className="pt-1 w-52 pr-2">Nama Pelanggan : </p>
                        <input type="text" value={temp.nama} className="border border-primary rounded-lg w-1/2 text-2xl h-10" name="nama" id="nama" disabled />
                    </div>
                    <div className="Adress flex mt-3 text-primary  text-2xl">
                        <p className="pt-1 w-52 pr-2">Alamat : </p>
                        <input type="text" value={temp.alamat} className="border border-primary rounded-lg w-1/2 text-xl h-10" name="alamat" id="alamat" disabled />
                    </div>
                    <div className="PhoneNumber flex mt-3 text-primary  text-2xl">
                        <p className="pt-1 w-52 pr-2">No. Hp : </p>
                        <input type="number" value={temp.nohp1} required="number" className="border border-primary rounded-lg lg:w-64 text-xl h-10 sm:w-40" name="nohp" id="nohp" disabled />
                        <p className="pt-1 pr-2 ps-2"> & </p>
                        <input type="number" value={temp.nohp2} className="border border-primary rounded-lg lg:w-64 text-xl h-10 sm:w-40" name="nohp" id="nohp" disabled />
                    </div>
                    <div className="Email flex mt-3 bottom-0 text-primary text-2xl">
                        <p className="pt-1 w-52 pr-2">Tanggal : </p>
                        <input type="text" placeholder="tanggal" className="border border-primary rounded-lg 0 text-xl h-10" name="date" id="date" defaultValue={date} disabled />
                    </div>
                    <div className="MngSales flex mt-3 text-primary  text-2xl">
                        <p className="pt-1 w-48 pr-2">Pembayaran : </p>
                        <div className="Uang flex ms-5">
                            <input className="relative float-left -ml-[1.5rem] mr-1 h-9 w-9 appearance-none rounded-full border-2 border-solid border-neutral-300 before:pointer-events-none before:absolute before:h-4 before:w-4 before:scale-0 before:rounded-full before:bg-transparent before:opacity-0 before:shadow-[0px_0px_0px_13px_transparent] before:content-[''] after:absolute after:z-[1] after:block after:h-4 after:w-4 after:rounded-full after:content-[''] checked:border-primary checked:before:opacity-[0.16] checked:after:absolute checked:after:left-1/2 checked:after:top-1/2 checked:after:h-[0.625rem] checked:after:w-[0.625rem] checked:after:rounded-full checked:after:border-primary checked:after:bg-primary checked:after:content-[''] checked:after:[transform:translate(-50%,-50%)] hover:cursor-pointer hover:before:opacity-[0.04] hover:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:shadow-none focus:outline-none focus:ring-0 focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] checked:focus:border-primary checked:focus:before:scale-100 checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] dark:border-neutral-600 dark:checked:border-primary dark:checked:after:border-primary dark:checked:after:bg-primary dark:focus:before:shadow-[0px_0px_0px_13px_rgba(255,255,255,0.4)] dark:checked:focus:border-primary dark:checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca]"
                                type="radio"
                                name="flexRadioDefault"
                                id="radioDefault01" value="Tunai" onClick={(e) => setmetode(e.target.value)} />
                            <label className="mt-2 ms-2 inline-block pl-[0.15rem] hover:cursor-pointer" htmlFor="radioDefault01">
                                Tunai
                            </label>
                        </div>
                        <div className="Barang flex ms-10">
                            <input className="relative float-left -ml-[1.5rem] mr-1 h-9 w-9 appearance-none rounded-full border-2 border-solid border-neutral-300 before:pointer-events-none before:absolute before:h-4 before:w-4 before:scale-0 before:rounded-full before:bg-transparent before:opacity-0 before:shadow-[0px_0px_0px_13px_transparent] before:content-[''] after:absolute after:z-[1] after:block after:h-4 after:w-4 after:rounded-full after:content-[''] checked:border-primary checked:before:opacity-[0.16] checked:after:absolute checked:after:left-1/2 checked:after:top-1/2 checked:after:h-[0.625rem] checked:after:w-[0.625rem] checked:after:rounded-full checked:after:border-primary checked:after:bg-primary checked:after:content-[''] checked:after:[transform:translate(-50%,-50%)] hover:cursor-pointer hover:before:opacity-[0.04] hover:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:shadow-none focus:outline-none focus:ring-0 focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] checked:focus:border-primary checked:focus:before:scale-100 checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] dark:border-neutral-600 dark:checked:border-primary dark:checked:after:border-primary dark:checked:after:bg-primary dark:focus:before:shadow-[0px_0px_0px_13px_rgba(255,255,255,0.4)] dark:checked:focus:border-primary dark:checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca]"
                                type="radio"
                                name="flexRadioDefault"
                                id="radioDefault01" value="Transfer" onClick={(e) => setmetode(e.target.value)} />
                            <label className="mt-2 ms-2 inline-block pl-[0.15rem] hover:cursor-pointer" htmlFor="radioDefault01">
                                Transfer
                            </label>
                        </div>
                    </div>
                </div>
            </div>
            <p className="pr-2 pt-4 text-md italic text-primary">*perhatikan tanggal pemesanan & metode pembayaran</p>

            {/* form input order */}

            {/* datatable */}
            <div className="cover mt-16 border-2 rounded-xl mb-10" style={{ width: "100%", boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px" }}>
                <p className="pt-8 text-4xl font-semibold text-center text-primary">Data Barang</p>
                <div className="cover m-2">
                    <table id="example" className="display border-2 border-gray rounded-lg">
                    </table>
                </div>
            </div>
            {/* datatable */}

            {/* subtotal */}
            <div className="w-full mt-10 border rounded-xl " style={{ boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px" }}>
                <div className="m-2">
                    <div className="noId flex text-primary  text-2xl">
                        <p>Total harga : </p>
                        <p className="ms-4">{formatter.format(total)}</p>
                    </div>
                    <div className="MSales flex mt-4 text-primary  text-2xl">
                        <p>Metode Pembayaran : </p>
                        <p className="ms-4">{metode}</p>
                    </div>
                    <div className="MSales flex mt-4 text-primary  text-2xl">
                        <p>Nama Pelanggan : </p>
                        <p className="ms-4">{temp.nama}</p>
                    </div>
                    <div className="MSales flex mt-4 text-primary  text-2xl">
                        <p>Nama Sales : </p>
                        <p className="ms-4">{data.sales.nama}</p>
                    </div>
                </div>
            </div>
            {/* subtotal */}

            {/* submit kirim kranjang */}
            <div className="w w-52 mb-28 float-left mt-8">
                <button onClick={order} className="bg-primary w-52 h-16 rounded-xl text-white hover:bg-gray-300 hover:text-primary font-bold py-2 px-4">
                    Submit
                </button>
            </div>
            {/* submit kirim kranjang */}
        </>

    )
}