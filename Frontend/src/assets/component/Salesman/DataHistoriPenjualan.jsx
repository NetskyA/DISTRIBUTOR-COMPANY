import ControlTarget from "../../controller/ControlTarget"
import { Radio } from "@material-tailwind/react";
import React, { useEffect, useRef } from "react";
import { useLoaderData,useNavigate} from "react-router-dom";
import dataSet from "../../component/Salesman/DataRetur";
import DataDetailHistori from "../../component/Salesman/DataDetailHistori";
import "datatables.net-dt/css/jquery.dataTables.min.css";
import $ from "jquery";

export default function DataHistoriPenjualan() {
    let data = useLoaderData()
    let navigate = useNavigate()
    // let j = 0;
    // const Row = ({ data }) => {
    //     var temp = [];
    //     for (let i = 0; i < 6; i++) {
    //         temp.push(<td key={j}>{data[i]}</td>)
    //         j++
    //     }
    //     temp.push(<td key={j}>
    //         <a href={"Detail-History/1"}>
    //             <button onClick={test} className="bg-primary w-40 h-11 rounded-xl text-white hover:bg-gray-300 hover:text-primary font-bold py-2 px-4">
    //                 Detail
    //             </button>
    //         </a>
    //     </td>)
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

    // const test = () => {
    //     var data = table.$('input').serialize()
    //     console.log(data)
    // }

    useEffect(() => {
        // Initialize DataTables within the component
        table = new $("#example").DataTable({
            dom: '<"top"lf>rt<"bottom"Bpi>',
            data: data.history,
            // 'columnDefs'        : [         // see https://datatables.net/reference/option/columns.searchable
            //     { 
            //         'searchable'    : false, 
            //         'targets'       : [2,3,4,5] 
            //     },
            // ],
            columns: [
              { title: "Id Order", data:"id_transaksi"},
              { title: "Nama Konsumen", data:"nama_konsumen"},
              { title: "Nama Toko", data:"nama_toko"},
              { title: "Tanggal Transaksi", data:"tanggal_transaksi"},
              { title: "Total Transaksi", data:"subtotal",render: function (data, type) {
                var number =  $.fn.dataTable.render
                    .number('.', '.', 0, 'Rp ')
                    .display(data);
 
                if (type === 'display') {
 
                    return `<span>${number}</span>`;
                }
 
                return number;
            }  },
            //   { title: "Qty", data:"qty" },
            { title: "Status Transaksi", data:"status_transaksi"},
            {title:"Detail Penjualan",
            data:null,
            render: function (data, type, row) {
                if (type === 'display') {
                    // Render an input text data with the data
                    return `<button class="bg-primary w-40 h-11 rounded-xl text-white hover:bg-gray-300 hover:text-primary font-bold py-2 px-4 klikbutton" data-row-id="${row.id_transaksi}">Detail</button>`
                }
                return data;
            },   
            }
            ],
            destroy:true,
            "bDestroy": true          
        });
        $('#example').on('click', '.klikbutton', function () {
            navigate(`/Salesman/Detail-History/${parseInt($(this).data('row-id'))}`)
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
                <div className="header lg:w-full md:w-1/2 text-primary text-4xl font-semibold">
                    <p>Histori Penjualan</p>
                </div>
                <div className="rounded-xl lg:w-1/2 float-right mr-0 mx-auto text-2xl font-semibold">
                <ControlTarget current={data.targetSekarang} target={data.currtarget}/>
                </div>
            </div>

            <div className="cover mt-12 border-2 mb-28 rounded-xl" style={{ width: "100%", boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px" }}>
                <p className="pt-8 text-4xl font-semibold text-center text-primary">Histori Penjualan</p>
                <div className="cover m-2">
                    <table id="example" className="display border-2 border-gray rounded-lg">
                        {/* <thead>
                            <tr>
                                <th>Id Order</th>
                                <th>Nama Konsumen</th>
                                <th>Nama Toko</th>
                                <th>Tanggal</th>
                                <th>Jumlah Transaksi</th>
                                <th>Status</th>
                                <th>Detail Penjualan</th>
                            </tr>
                        </thead>
                        <tbody>
                            <Tabel />
                        </tbody> */}
                    </table>
                </div>
            </div>

            {/* <DataDetailHistori/> */}
            <hr className="h-px my-8 mt-10 mb-10 rounded-xl bg-gray-400 border" />

        </>
    )
}