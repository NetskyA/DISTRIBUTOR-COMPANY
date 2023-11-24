import ControlTarget from "../../controller/ControlTarget"
import { Radio } from "@material-tailwind/react";
import React, { useEffect, useRef } from "react";
import { useLoaderData,useNavigate} from "react-router-dom";
import dataSet from "../../component/Salesman/DataRetur";
import "datatables.net-dt/css/jquery.dataTables.min.css";
import $ from "jquery";
import formatter from "../../controller/formatter";

export default function DataDetailHistory (){
    let data = useLoaderData();
    let navigate = useNavigate()
    console.log(data)
    // let j = 0;
    // const Row = ({ data }) => {
    //     var temp = [];
    //     for (let i = 0; i < 6; i++) {
    //         temp.push(<td key={j}>{data[i]}</td>)
    //         j++
    //     }
    //     temp.push(<td key={j}>
    //         <input className="text-2xl text-primary border-0 bg-gray-200 rounded-lg" type="text" name={data[0]} defaultValue="0"/>
    //         </td>)
    //     return <>{temp}</>
    // }

    // const Tabel = () => {
    //     var cetak = [];
    //     let i = 0;
    //     dataSet.map((e) => {
    //         cetak.push(<tr key={i}><Row data={e} /></tr>)
    //         i++;
    //     })
    //     return <>{cetak}</>;
    // }
    // const tableRef = useRef();
    var table;

    // const test = ()=>{
    //     var data = table.$('input').serialize()
    //     console.log(data)
    // }

    useEffect(() => {
        // $(tableRef.current).DataTable({
        //     data: dataSet,
        //     columns: [
        //         { title: "Id Barang", field: "idbarang" },
        //         { title: "Nama Barang", field: "namabarang" },
        //         { title: "Harga Pcs", field: "hargapcs" },
        //         { title: "Harga Karton", field: "hargakarton" },
        //         { title: "Qty Gudang", field: "qtygudang" },
        //         { title: "Qty Pembelian", field: "qtypembelian" },
        //         { title: "Qty Retur", field: "qtyretur" },
        //     ],
        // });
        // table = new $('#example').DataTable({
        //     columnDefs: [
        //         {
        //             orderable: false,
        //             targets: [6]
        //         }
        //     ]
        // });
        table = new $("#example").DataTable({
            dom: '<"top"lf>rt<"bottom"pi>',
            data: data.detailTransaksi,
            columns: [
            //   { title: "Id Barang", data:"id_transaksi"},
              { title: "Nama Barang", data:"nama_barang"},
              { title: "Harga Karton", data:"harga_karton",render: function (data, type) {
                var number =  $.fn.dataTable.render
                    .number('.', '.', 0, 'Rp ')
                    .display(data);
 
                if (type === 'display') {
 
                    return `<span>${number}</span>`;
                }
 
                return number;
            }  },
            { title: "Harga Pcs", data:"harga_pcs",render: function (data, type) {
                var number =  $.fn.dataTable.render
                    .number('.', '.', 0, 'Rp ')
                    .display(data);
 
                if (type === 'display') {
 
                    return `<span>${number}</span>`;
                }
 
                return number;
            }  },
            { title: "Jumlah Karton", data:"jumlah_barang_karton",render: function (data, type) {
                var number =  $.fn.dataTable.render
                    .number('.', '.', 0, '')
                    .display(data);
 
                if (type === 'display') {
 
                    return `<span>${number}</span>`;
                }
 
                return number;
            }  },
            { title: "Jumlah Pcs", data:"jumlah_barang_pcs",render: function (data, type) {
                var number =  $.fn.dataTable.render
                    .number('.', '.', 0, '')
                    .display(data);
 
                if (type === 'display') {
 
                    return `<span>${number}</span>`;
                }
 
                return number;
            }  },
            { title: "Subtotal", data:"subtotal_barang",render: function (data, type) {
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
                    <p>Histori & Detail</p>
                </div>
                <div className="rounded-xl lg:w-1/2 float-right mr-0 mx-auto text-2xl font-semibold">
                    <ControlTarget />
                </div>
                {/* untuk memanggil function controller target salesman */}
        </div>
        <div className="selectdisable border-2 flex rounded-xl mt-10 w-full h-full">
                <div className="row ms-4 m-4 w-full rounded-2xl" style={{boxShadow:"rgba(0, 0, 0, 0.24) 0px 3px 8px"}}>
                        <div className="cover m-5">
                        <div className="noId flex text-primary font-semibold text-2xl md:text-2xl">
                            <p>Id Pemesanan: </p>
                            <p className="ms-4">{data.transaksi.header.id_transaksi}</p>
                        </div>
                        <div className="MSales flex mt-4 text-primary font-semibold text-2xl md:text-2xl">
                            <p>Nama Pelanggan : </p>
                            <p className="ms-4">{data.transaksi.toko.nama_konsumen}</p>
                        </div>
                        <div className="PhoneNumber flex mt-4 text-primary font-semibold text-2xl md:text-2xl">
                            <p>Nama Toko : </p>
                            <p className="ms-4">{data.transaksi.toko.nama_toko}</p>
                        </div>
                        <div className="Adress flex mt-4 text-primary font-semibold text-2xl md:text-2xl">
                        <p>Alamat : </p>
                            <p className="ms-4">{data.transaksi.toko.alamat_toko}</p>
                        </div>
                        <div className="Email flex mt-4 text-primary font-semibold text-2xl md:text-2xl">
                        <p>No. Hp : </p>
                            <p className="ms-4">{data.transaksi.toko.no_handphone1} / {data.transaksi.toko.no_handphone2}</p>
                        </div>
                        <div className="MngSales flex mt-4 text-primary font-semibold text-2xl md:text-2xl">
                            <p>Tanggal : </p>
                            <p className="ms-4">{data.transaksi.header.tanggal_transaksi}</p>
                        </div>
                        <div className="MngSales flex mt-4 text-primary font-semibold text-2xl md:text-2xl">
                            <p>Metode Pembayaran : </p>
                            <p className="ms-4">{(data.transaksi.header.jenis_transaksi==0)?"Tunai":"Transfer"}</p>
                        </div>
                        {/* <div className="MngSales flex mt-4 text-primary font-semibold text-2xl md:text-2xl">
                            <p>Batas bayar : </p>
                            <p className="ms-4">5 september 2023 </p>
                        </div> */}
                        </div>
                </div>
                <div className="row ms-4 m-4 w-5/12 rounded-xl" style={{boxShadow:"rgba(0, 0, 0, 0.24) 0px 3px 8px"}}>
                        <div className="cover m-5">
                        <div className="noId flex text-primary font-semibold text-2xl md:text-2xl">
                            <p>Total Harga : </p>
                            <p className="ms-4">{formatter.format(data.transaksi.header.subtotal)}</p>
                        </div>
                        <div className="MSales flex mt-4 text-primary font-semibold text-2xl md:text-2xl">
                            <p>Nama Sales : </p>
                            <p className="ms-4">{data.sales.username}</p>
                        </div>
                        
                        </div>
                </div>
        </div>
                <div className="MSales flex mt-4 m-6 float-right text-primary font-semibold text-2xl md:text-2xl">
                        <button onClick={()=>navigate("/Salesman/History")} className="bg-primary w-40 h-12 rounded-xl text-white hover:bg-gray-300 hover:text-primary font-bold py-2 px-4">
                            Kembali
                        </button>
                </div>

            <div className="cover mt-28 mb-5 border-2 rounded-xl" style={{ width: "100%",boxShadow:"rgba(0, 0, 0, 0.24) 0px 3px 8px" }}>
            <p className="pt-8 text-4xl font-semibold text-center text-primary">Data Barang</p>
                {/* <table className="border-2 border-gray rounded-lg" ref={tableRef}></table> */}
                <div className="cover m-2">
                <table id="example" className="display border-2 border-gray rounded-lg">
                    {/* <thead>
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
                    </tbody> */}
                </table>
                </div>
            </div>
            
            <div className="w-full mt-16 mb-28 mx-auto border-2 rounded-xl" style={{boxShadow:"rgba(0, 0, 0, 0.24) 0px 3px 8px"}}>
                <p className="pt-5 text-3xl font-semibold text-center text-primary">Barang Retur (JIKA ADA)</p>
                <div className="cover m-5">
                    <table className="text-left text-2xl font-light border rounded-xl w-full" style={{boxShadow:"rgba(0, 0, 0, 0.24) 0px 3px 8px"}}>
                        <thead className="border-b font-medium dark:border-neutral-500">
                        <tr>
                            <th scope="col" className="px-6 py-4">Nama Barang</th>
                            <th scope="col" className="px-6 py-4">Jumlah Retur Karton</th>
                            <th scope="col" className="px-6 py-4">Jumlah Retur Pcs</th>
                            <th scope="col" className="px-6 py-4">Jenis Retur</th>
                            <th scope="col" className="px-6 py-4">Tanggal Retur</th>
                        </tr>
                        </thead>
                        <tbody>
                            {data.detailTransaksi.map((e,index)=>{
                                if(e.status!==0){
                                return <tr key={index}className="border-b dark:border-neutral-500">
                                <td className="whitespace-nowrap px-6 py-4 font-medium">{e.nama_barang}</td>
                                <td className="whitespace-nowrap px-6 py-4 font-medium">{e.jumlah_retur_karton}</td>
                                <td className="whitespace-nowrap px-6 py-4">{e.jumlah_retur_pcs}</td>
                                <td className="whitespace-nowrap px-6 py-4">{(e.status=1)?"Barang":"Uang"}</td>
                                <td className="whitespace-nowrap px-6 py-4">{e.tanggal_retur}</td>
                                </tr>

                                }
                            })}
                        </tbody>
                    </table>
                    <p className="pr-2 pt-4 text-md italic text-primary">*cek kembali semua data apabila terdapat retur</p>
                </div>
            </div>
            <hr className="h-px my-8 rounded-xl bg-gray-400 border" />
        </>
    )
}