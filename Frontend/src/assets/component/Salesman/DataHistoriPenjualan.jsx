import ControlTarget from "../../controller/ControlTarget"
import { Radio } from "@material-tailwind/react";
import React, { useEffect, useRef } from "react";
import { useLoaderData,useNavigate} from "react-router-dom";
import DataDetailHistori from "../../component/Salesman/DataDetailHistori";
import "datatables.net-dt/css/jquery.dataTables.min.css";
import $ from "jquery";

export default function DataHistoriPenjualan() {
    let data = useLoaderData()
    let navigate = useNavigate()
    var table;
    useEffect(() => {
        // Initialize DataTables within the component
        table = new $("#example").DataTable({
            dom: '<"top"lf>rt<"bottom"Bpi>',
            data: data.history,
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
                    </table>
                </div>
            </div>

            {/* <DataDetailHistori/> */}
            <hr className="h-px my-8 mt-10 mb-10 rounded-xl bg-gray-400 border" />

        </>
    )
}