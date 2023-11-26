import DateControl from "../../controller/ControlTanggal"
import { Radio } from "@material-tailwind/react";
import React, { useEffect, useRef,useState } from "react";
import dataSet from "../../component/Salesman/DataRetur";
import "datatables.net-dt/css/jquery.dataTables.min.css";
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button } from "@nextui-org/react";
import $ from "jquery";
import client from "../../controller/client";
import { useLoaderData, useNavigate } from "react-router-dom";
export default function DataKomisi() {
    let jabatan = useLoaderData()
    let table;
    let textJabatan = useRef("")
    const [selectOp, setSelectOp] = useState(true)
    const toggleVisibilityCancel = () => {
        setSelectOp(!selectOp)
    }    
    let listGaji = useRef([]);
    const [refresh,setRefresh] = useState(false)
   console.log(listGaji.current)
    useEffect(() => {
        table = new $("#example").DataTable({
            data: listGaji.current,
            columns: [
              { title: "Id User", data: "id_user" },
              { title: "Nama", data: "username" },
              { title: "Email", data: "email" },
              { title: "Jabatan", data: null,render:()=>{
                return textJabatan.current
              } },
              {
                title: "Target",
                data: "target",
                render: function (data, type) {
                  var number = $.fn.dataTable.render
                    .number(".", ".", 0, "Rp ")
                    .display(data);
      
                  if (type === "display") {
                    return `<span>${number}</span>`;
                  }
      
                  return number;
                },
              },
              {
                title: "Realisasi",
                data: "target_sekarang",
                render: function (data, type,row) {
                  var number = $.fn.dataTable.render
                    .number(".", ".", 0, "Rp ")
                    .display(data);
                  if (type === "display") {
                    let color = 'limegreen';
                    if (data < row.target) {
                        color = 'red';
                    }
                    else if (data < 500000) {
                        color = 'orange';
                    }
                    return `<span style="font-weight: bold;color:${color}">${number}</span>`;
                  }
      
                  return number;
                },
              },
              {
                  title: "Komisi",
                  data: "gaji_komisi",
                  render: function (data, type) {
                    var number = $.fn.dataTable.render
                      .number(".", ".", 0, "Rp ")
                      .display(data);
        
                    if (type === "display") {
                      return `<span>${number}</span>`;
                    }
        
                    return number;
                  },
              },
              {
                title: "Komisi Baru",
                data: null,
                render: function (data, type, row) {
                  if (type === "display") {
                    // Render an input text data with the data
                    return `<input type="number" value="0" min="0" data-row-id="${row.id_user}" class="data-komisi"/>`;
                  }
                  return data;
                },
              },
            ],
            destroy: true,
            bDestroy: true,
          });
          $("#example").on("change", ".data-komisi", function () {
            const newValue = $(this).val();
            const rowId = $(this).data("row-id");
            if (newValue < 0) {
              $(this).val(0);
              return;
            }
            updateDataKomisi(newValue, rowId);
          });
      }, [refresh]);
      function updateDataKomisi(newValue, rowId) {
        // Handle the data update here
        // You can use the `newValue` and `rowId` to update your data source
        // For example, update `dataSet` or another state variable in your React component
        let data = listGaji.current;
        data[data.findIndex((e) => e.id_user === rowId)].komisi_update =
          newValue;
        listGaji.current = data;
      }
    const [selectedKeys, setSelectedKeys] = React.useState(new Set(["Pilih"]));
    const selectedValue = React.useMemo(
        () => Array.from(selectedKeys).join(", ").replaceAll("_", " "),
        [selectedKeys]
    );
    const search = async()=>{
        let idJabatan = document.getElementById("divisi").value;
        if(parseInt(idJabatan) ==0){
            document.getElementById("divisi").focus()
            return
        }
        let dataTable = (await client.get(`/api/dataGaji/${idJabatan}`)).data
        for (let i = 0; i < dataTable.length; i++) {
            dataTable[i] = {...dataTable[i],komisi_update:0};
        }
        listGaji.current = dataTable;
        setRefresh(!refresh);
    }

    const send = async()=>{
        if(listGaji.current.length==0){
            document.getElementById("divisi").focus()
            return
        }
        let tempGaji= listGaji.current.filter(
            (e) =>
              parseInt(e.komisi_update) !== 0
          );
        await client.post("/api/updateKomisi",{
            update:tempGaji
        })
        listGaji.current = [];
        document.getElementById("divisi").value=0
        setRefresh(!refresh);
    }
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
                        <select name="divisi" onChange={(e)=>{textJabatan.current=(e.target.options[e.target.selectedIndex].text)}} id="divisi" className="border rounded-lg h-11 w-65 border-primary">
                            <option value="0"></option>
                            {jabatan.map((e,index)=>{
                                return <option value={e.id_jabatan}>{e.nama_jabatan}</option>
                            })}
                        </select>
                    </div>
                    <div className="flex mt-5 text-primary  text-2xl">
                        <p className="pr-2">Tanggal : </p>
                        <DateControl />
                    </div>
                    <div className="flex mt-7 text-primary float-right text-2xl" >
                        <button onClick={search} className="w-36 h-12 items-end bg-primary rounded-xl hover:bg-gray-300 text-white hover:text-primary font-bold py-2 px-4">
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
                               
                            </table>
                            <div className="flex mt-10 mb-10 text-primary m-4 float-right text-2xl">
                                <button onClick={send} className="w-52 h-14 items-end bg-primary rounded-2xl hover:bg-gray-300 text-white hover:text-primary font-bold py-2 px-4">
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