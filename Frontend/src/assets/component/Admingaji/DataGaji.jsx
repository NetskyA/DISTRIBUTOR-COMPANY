import DateControl from "../../controller/ControlTanggal"
import { useState, useRef, useEffect } from "react";
import $ from "jquery";
import "datatables.net-dt/css/jquery.dataTables.min.css";
import ComModal from "../../controller/ControlModalKeluar"
import Select from 'react-select';
import { useLoaderData, useNavigate } from "react-router-dom";
import FotoTolak from "../../images/image-modal/tolak.png"
import "datatables.net-buttons";
import "datatables.net-buttons-dt";
import "datatables.net-buttons-dt/css/buttons.dataTables.min.css";
import client from "../../controller/client";

export default function DataGaji() {
  const navigate = useNavigate()
  let jabatan = useLoaderData()
  var now = new Date();
  let date = now.getDate();
  console.log(jabatan)
  let table;
  let listGaji = useRef([]);
  const [refresh, setRefresh] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  let textJabatan = useRef("")
  const handleTogglePassword = async () => {
    // if(date!==1){
    //     handleOpenModal()
    //     return
    // }
    if (listGaji.current.length == 0) {
      document.getElementById("divisi").focus()
      return
    }
    await client.post("/api/kirimGaji",{
      listUser:listGaji.current
    })
    navigate("/AdminGaji/Laporan-Gaji-Karyawan")
  };
  console.log(listGaji)
  const search = async () => {
    let idJabatan = document.getElementById("divisi").value;
    if (parseInt(idJabatan) == 0) {
      document.getElementById("divisi").focus()
      return
    }
    let dataTable = (await client.get(`/api/dataGaji/${idJabatan}`)).data
    listGaji.current = dataTable;
    setRefresh(!refresh);
  }
  useEffect(() => {
    table = new $("#example").DataTable({
      data: listGaji.current,
      columns: [
        { title: "Id User", data: "id_user", },
        { title: "Nama", data: "username" },
        { title: "Email", data: "email" },
        {
          title: "Jabatan", data: null, render: () => {
            return textJabatan.current
          }
        },
        {
          title: "Target",
          data: "target",
          render: function (data, type) {
            var number = $.fn.dataTable.render
              .number(".", ".", 0, "Rp. ")
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
          render: function (data, type, row) {
            var number = $.fn.dataTable.render
              .number(".", ".", 0, "Rp. ")
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
          title: "Gaji",
          data: "gaji_pokok",
          render: function (data, type) {
            var number = $.fn.dataTable.render
              .number(".", ".", 0, "Rp. ")
              .display(data);

            if (type === "display") {
              return `<span>${number}</span>`;
            }

            return number;
          },
        },
        {
          title: "Komisi",
          data: "komisi",
          render: function (data, type) {
            var number = $.fn.dataTable.render
              .number(".", ".", 0, "Rp. ")
              .display(data);

            if (type === "display") {
              return `<span>${number}</span>`;
            }

            return number;
          },
        },
        {
          title: "Potongan",
          data: "potongan",
          render: function (data, type) {
            var number = $.fn.dataTable.render
              .number(".", ".", 0, "Rp. ")
              .display(data);

            if (type === "display") {
              return `<span>${number}</span>`;
            }

            return number;
          },
        },
        {
          title: "Total Gaji",
          data: "subtotal",
          render: function (data, type) {
            var number = $.fn.dataTable.render
              .number(".", ".", 0, "Rp. ")
              .display(data);

            if (type === "display") {
              return `<span>${number}</span>`;
            }

            return number;
          },
        },
      ],
      destroy: true,
      bDestroy: true,
    });
  }, [refresh]);
  return (
    <>
      <div className="cover selectdisable flex">
        {/* nanti digunakan memanggil nama sesuai akun*/}
        <div className="header lg:w-full md:w-1/2 text-primary text-4xl font-semibold">
          <p>Gaji</p>
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
            <select name="divisi" onChange={(e) => { textJabatan.current = (e.target.options[e.target.selectedIndex].text) }} id="divisi" className="border rounded-lg h-11 w-65 border-primary">
              <option value="0"></option>
              {jabatan.map((e, index) => {
                return <option value={e.id_jabatan}>{e.nama_jabatan}</option>
              })}
            </select>
          </div>

          <div className="flex mt-5 text-primary  text-2xl">
            <p className="pr-2">Tanggal : </p>
            <DateControl />
          </div>
          <div className="flex mt-7 text-primary float-right text-2xl">
            <button onClick={search} id="cari" className="w-36 h-12 items-end bg-primary rounded-xl hover:bg-gray-300 text-white hover:text-primary font-bold py-2 px-4">
              Search
            </button>
          </div>
        </div>
        {/* berisi form retur */}
      </div>
      <div className="isi">
        <div className="cover mt-12 border-2 rounded-xl" style={{ width: "100%", boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px" }}>
          <p className="pt-5 text-4xl font-semibold text-center text-primary">Data Karyawan</p>
          <div className="cover mb-28">
            <div className="covertable m-2">
              <table id="example" className="border-2 border-gray rounded-lg">
              </table>
            </div>
            <div className="flex text-primary m-4 float-right text-2xl">
              <button onClick={handleTogglePassword} className="w-52 h-14 items-end bg-primary rounded-2xl hover:bg-gray-300 text-white hover:text-primary font-bold py-2 px-4">
                Kirim
              </button>
            </div>
            {/* <div className="min-h-screen flex items-center justify-center"> */}
            {/* </div> */}
          </div>
        </div>
      </div>

      <hr className="h-px my-10 mt-18 mb-52 rounded-xl bg-gray-400 border" />
      <div className="cover">
        {isModalOpen && (
          <div className="modal">
            <div className="modal-content h-72 w-80">
              <span className="close" onClick={handleCloseModal}>&times;</span>
              <h2 className="text-center text-2xl">Gaji</h2>
              <h2 className="text-center text-2xl">Tanggal tidak sesuai</h2>
              <img src={FotoTolak} alt="" className="w-20 mx-auto m-6 h-20" />
              <div className="flex items-center mx-auto justify-center">
                <button className="bg-primary hover:bg-gray-400 m-2 w-32 rounded-lg" onClick={handleCloseModal}>
                  <p className="text-xl p-2">
                    Ok
                  </p>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  )
}