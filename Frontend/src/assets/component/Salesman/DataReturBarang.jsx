import ControlTarget from "../../controller/ControlTarget";
import { Radio } from "@material-tailwind/react";
import React, { useEffect, useRef, useState } from "react";
import "datatables.net-dt/css/jquery.dataTables.min.css";
import client from "../../controller/client";
import { useLoaderData, useNavigate } from "react-router-dom";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
} from "@nextui-org/react";
import $ from "jquery";
import DataHandler from "../../controller/DataHandler";
import formatter from "../../controller/formatter";
const { mergeDetail } = DataHandler;
export default function ReturnBarang() {
  let table;
  let user = useLoaderData();
  console.log(user);
  const [refresh, setRefresh] = useState(false);
  const [data, setdata] = useState({
    nama_pelanggan: "",
    nama_toko: "",
  });
  let listTable = useRef([]);
  console.log(listTable);

  const [selectedKeys, setSelectedKeys] = React.useState(new Set(["Pilih"]));
  const selectedValue = React.useMemo(
    () => Array.from(selectedKeys).join(", ").replaceAll("_", " "),
    [selectedKeys]
  );
  const navigate = useNavigate()

  const createTable = (data) => {
    table = new $("#example").DataTable({
      data: data,
      columns: [
        { title: "Id Barang", data: "id_barang" },
        { title: "Nama Barang", data: "nama_barang" },
        {
          title: "Harga Karton",
          data: "harga_karton",
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
          title: "Harga Pcs",
          data: "harga_pcs",
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
          title: "Qty Karton Gudang",
          data: "stok_karton",
          render: function (data, type) {
            var number = $.fn.dataTable.render
              .number(".", ".", 0, "")
              .display(data);

            if (type === "display") {
              return `<span>${number}</span>`;
            }

            return number;
          },
        },
        {
          title: "Qty Pcs Gudang",
          data: "stok_pcs",
          render: function (data, type) {
            var number = $.fn.dataTable.render
              .number(".", ".", 0, "")
              .display(data);

            if (type === "display") {
              return `<span>${number}</span>`;
            }

            return number;
          },
        },
        {
          title: "Qty Pembelian Karton",
          data: "jumlah_barang_karton",
          render: function (data, type) {
            var number = $.fn.dataTable.render
              .number(".", ".", 0, "")
              .display(data);

            if (type === "display") {
              return `<span>${number}</span>`;
            }

            return number;
          },
        },
        {
          title: "Qty Pembelian Pcs",
          data: "jumlah_barang_pcs",
          render: function (data, type) {
            var number = $.fn.dataTable.render
              .number(".", ".", 0, "")
              .display(data);

            if (type === "display") {
              return `<span>${number}</span>`;
            }

            return number;
          },
        },
        {
          title: "Subtotal",
          data: "subtotal_barang",
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
          title: "Qty Karton",
          data: null,
          render: function (data, type, row) {
            if (type === "display") {
              // Render an input text data with the data
              return `<input type="number" value="0" min="0" data-row-id="${row.id_barang}" class="data-input-karton"/>`;
            }
            return data;
          },
        },
        {
          title: "Qty Pcs",
          data: null,
          render: function (data, type, row) {
            if (type === "display") {
              // Render an input text data with the data
              return `<input type="number" value="0" min="0" data-row-id="${row.id_barang}" class="data-input-pcs" />`;
            }
            return data;
          },
        },
      ],
      columnDefs: [
        {
          orderable: false,
          targets: [8, 9],
        },
      ],
      destroy: true,
      bDestroy: true,
    });
  };
  useEffect(() => {
    $("#example").on("change", ".data-input-karton", function () {
      const newValue = $(this).val();
      const rowId = $(this).data("row-id");
      let data = "Barang";
      if (document.getElementsByName("flexRadioDefault")[0].checked) {
        data = "Uang"
      }
      if (newValue < 0) {
        $(this).val(0);
        return;
      }
      let dataTabel = listTable.current;
      let jmlstok =
        dataTabel[dataTabel.findIndex((e) => e.id_barang === rowId)]
          .stok_karton;
      let jmlorder =
        dataTabel[dataTabel.findIndex((e) => e.id_barang === rowId)]
          .jumlah_barang_karton;
      let max = 0;

      if (jmlstok > jmlorder || data === "Uang") {
        max = jmlorder;
      } else if (data === "Barang") {
        max = jmlstok;
      }
      if (newValue > max) {
        $(this).val(max);
        updateDataKarton(max, rowId);
        return;
      }
      updateDataKarton(newValue, rowId);
    });

    $("#example").on("change", ".data-input-pcs", function () {
      let data = "Barang";
      if (document.getElementsByName("flexRadioDefault")[0].checked) {
        data = "Uang"
      }
      const newValue = $(this).val();
      const rowId = $(this).data("row-id");
      if (newValue < 0) {
        $(this).val(0);
        return;
      }
      let dataTabel = listTable.current;
      let jmlstok =
        dataTabel[dataTabel.findIndex((e) => e.id_barang === rowId)].stok_pcs;
      let jmlorder =
        dataTabel[dataTabel.findIndex((e) => e.id_barang === rowId)]
          .jumlah_barang_pcs;
      let max = 0;
      if (jmlstok > jmlorder || data === "Uang") {
        max = jmlorder;
      } else if (data === "Barang") {
        max = jmlstok;
      }
      if (newValue > max) {
        $(this).val(max);
        updateDataPcs(max, rowId);
        return;
      }
      updateDataPcs(newValue, rowId);
    });
  }, [refresh]);
  function updateDataPcs(newValue, rowId) {
    // Handle the data update here
    // You can use the `newValue` and `rowId` to update your data source
    // For example, update `dataSet` or another state variable in your React component
    let data = listTable.current;
    data[data.findIndex((e) => e.id_barang === rowId)].jumlah_retur_pcs =
      newValue;
    listTable.current = data;
    setRefresh(!refresh);
  }
  function updateDataKarton(newValue, rowId) {
    // Handle the data update here
    // You can use the `newValue` and `rowId` to update your data source
    // For example, update `dataSet` or another state variable in your React component
    let data = listTable.current;
    data[data.findIndex((e) => e.id_barang === rowId)].jumlah_retur_karton =
      newValue;
    listTable.current = data;
    setRefresh(!refresh);
  }

  const submit = async () => {
    console.log(listTable.current);
    let date = document.getElementById("dates").value;
    if (date === "") {
      window.scrollTo(0, 0);

      document.getElementById("dates").focus();
      return;
    }
    const tempDate = date.split("-");
    const year = tempDate[0];
    const month = tempDate[1];
    const day = tempDate[2];
    let hasilDate = day + "-" + month + "-" + year;
    if (
      data.nama_pelanggan === "" ||
      data.nama_pelanggan === "Tidak Ditemukan"
    ) {
      window.scrollTo(0, 0);

      document.getElementById("idpemesanan").focus();
      return;
    }

    let tempBarang = listTable.current.filter(
      (e) =>
        parseInt(e.jumlah_retur_pcs) !== 0 ||
        parseInt(e.jumlah_retur_karton) != 0
    );
    if (tempBarang.length == 0) {
      window.scrollTo(0, 0);
    }
    let hasil = [];
    tempBarang.forEach((data) => {
      hasil.push(
        {
          id_transaksi: data.id_transaksi,
          id_detail_barang: data.id_detail_barang,
          jumlah_barang_pcs: data.jumlah_barang_pcs,
          jumlah_barang_karton: data.jumlah_barang_karton,
          jumlah_retur_pcs: parseInt(data.jumlah_retur_pcs),
          jumlah_retur_karton: parseInt(data.jumlah_retur_karton),
          status: (document.getElementsByName("flexRadioDefault")[0].checked) ? 2 : 1,
          tanggal_retur: hasilDate,
          id_barang: data.id_barang,
          harga_pcs: data.harga_pcs,
          harga_karton: data.harga_karton
        }
      );
    });
    console.log(hasil)
    await client.post("/api/retur", {
      data: hasil,
    });
    navigate(`/Salesman/Detail-History/${hasil[0].id_transaksi}`)
  };
  const search = async (e) => {
    if (e.key === "Enter") {
      let id = document.getElementById("idpemesanan").value;
      let radio = document.getElementsByName("flexRadioDefault");
      if (!radio[0].checked && !radio[1].checked) {
        window.scrollTo(0, 0);

        document.getElementsByName("flexRadioDefault")[0].focus();
        return;
      }
      radio[0].disabled = true;
      radio[1].disabled = true;
      try {
        let dataDetail = await client.post("/api/getDetail", {
          id: id,
          idSales: user.user.id_user,
        });
        console.log(dataDetail.data);
        setdata({
          nama_pelanggan: dataDetail.data.toko.nama_konsumen,
          nama_toko: dataDetail.data.toko.nama_toko,
        });
        let dataBarang = (await client.get("/api/barang")).data;
        console.log(dataBarang);
        let hasilmergedata = mergeDetail(dataDetail.data);
        console.log(hasilmergedata);
        let tempTable = [];
        hasilmergedata.forEach((e) => {
          let tempBarang = dataBarang.find(
            (b) => b.nama_barang === e.nama_barang
          );
          console.log(tempBarang);
          tempTable.push({
            ...e,
            harga_pcs: tempBarang.harga_pcs,
            harga_karton: tempBarang.harga_karton,
            stok_karton: tempBarang.stok_karton,
            stok_pcs: tempBarang.stok_pcs,
            id_barang: tempBarang.id_barang,
          });
          if (e.status !== 0) {
            throw new Exception();
          }
        });
        console.log(tempTable);
        listTable.current = tempTable;
        createTable(listTable.current);
        setRefresh(!refresh);
      } catch (error) {
        setdata({
          nama_pelanggan: "Tidak Ditemukan",
          nama_toko: "Tidak Ditemukan",
        });
      }
    }
  };
  return (
    <>
      <div className="cover selectdisable flex">
        {/* nanti digunakan memanggil nama sesuai akun*/}
        <div className="header lg:w-full md:w-1/2 text-primary text-4xl font-semibold">
          <p>Retur</p>
        </div>
        <div className="rounded-xl lg:w-1/2 float-right mr-0 mx-auto text-2xl font-semibold">
          <ControlTarget current={user.targetSekarang} target={user.currtarget} />
        </div>
        {/* untuk memanggil function controller target salesman */}
      </div>
      <div
        className="selectdisable border-2 mt-10 flex border-gray-300 rounded-2xl w-6/12 h-full"
        style={{ boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px" }}
      >
        {/* berisi from retur */}
        <div className="row ms-4 m-4 w-full">
          <div className="flex mt-3 text-primary  text-2xl">
            <p className="pt-1 pr-2">Nomer Order : </p>
            <input
              type="text"
              placeholder="No. pemesanan"
              className="border rounded-md border-primary w-72 text-2xl h-10"
              name="idpemesanan"
              id="idpemesanan"
              onKeyDown={(e) => {
                search(e);
              }}
            />
            {/* <button type="button" className="bg-primary ms-6 w-32 rounded-lg hover:bg-gray-300 hover:text-primary">Save</button> */}
          </div>
          <div className="flex mt-3 text-primary text-2xl">
            <p className="pt-1 pr-2">Tanggal retur : </p>
            <input
              type="date"
              name="date"
              id="dates"
              className="border-0 text-2xl h-10"
              required="dates"
            />
          </div>
          <div className="flex mt-3 text-primary  text-2xl">
            <p className="pt-1 pr-2">Nama Pelanggan : </p>
            <p className="pt-1 pr-2">{data.nama_pelanggan}</p>
            {/* <input type="text" placeholder="nama pelanggan" className="border-0 w-1/2 text-2xl h-10" name="pelanggan" id="pelanggan" /> */}
          </div>
          <div className="flex mt-3 text-primary  text-2xl">
            <p className="pt-1 pr-2">Nama Toko : </p>
            <p className="pt-1 pr-2">{data.nama_toko}</p>
            {/* <input type="text" placeholder="nama toko" className="border-0 w-1/2 text-2xl h-10" name="toko" id="toko" /> */}
          </div>
          <div className="flex mt-3 text-primary text-2xl">
            <p className="pt-2">Pengembalian : </p>
            <div className="Uang flex ms-5">
              <input
                className="relative float-left -ml-[1.5rem] mr-1 h-9 w-9 appearance-none rounded-full border-2 border-solid border-neutral-300 before:pointer-events-none before:absolute before:h-4 before:w-4 before:scale-0 before:rounded-full before:bg-transparent before:opacity-0 before:shadow-[0px_0px_0px_13px_transparent] before:content-[''] after:absolute after:z-[1] after:block after:h-4 after:w-4 after:rounded-full after:content-[''] checked:border-primary checked:before:opacity-[0.16] checked:after:absolute checked:after:left-1/2 checked:after:top-1/2 checked:after:h-[0.625rem] checked:after:w-[0.625rem] checked:after:rounded-full checked:after:border-primary checked:after:bg-primary checked:after:content-[''] checked:after:[transform:translate(-50%,-50%)] hover:cursor-pointer hover:before:opacity-[0.04] hover:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:shadow-none focus:outline-none focus:ring-0 focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] checked:focus:border-primary checked:focus:before:scale-100 checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] dark:border-neutral-600 dark:checked:border-primary dark:checked:after:border-primary dark:checked:after:bg-primary dark:focus:before:shadow-[0px_0px_0px_13px_rgba(255,255,255,0.4)] dark:checked:focus:border-primary dark:checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca]"
                type="radio"
                name="flexRadioDefault"
                id="radioDefault01"
                value="Uang"
              />
              <label
                className="mt-2 ms-2 inline-block pl-[0.15rem] hover:cursor-pointer"
                htmlFor="radioDefault01"
              >
                Uang
              </label>
            </div>
            <div className="Barang flex ms-10">
              <input
                className="relative float-left -ml-[1.5rem] mr-1 h-9 w-9 appearance-none rounded-full border-2 border-solid border-neutral-300 before:pointer-events-none before:absolute before:h-4 before:w-4 before:scale-0 before:rounded-full before:bg-transparent before:opacity-0 before:shadow-[0px_0px_0px_13px_transparent] before:content-[''] after:absolute after:z-[1] after:block after:h-4 after:w-4 after:rounded-full after:content-[''] checked:border-primary checked:before:opacity-[0.16] checked:after:absolute checked:after:left-1/2 checked:after:top-1/2 checked:after:h-[0.625rem] checked:after:w-[0.625rem] checked:after:rounded-full checked:after:border-primary checked:after:bg-primary checked:after:content-[''] checked:after:[transform:translate(-50%,-50%)] hover:cursor-pointer hover:before:opacity-[0.04] hover:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:shadow-none focus:outline-none focus:ring-0 focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] checked:focus:border-primary checked:focus:before:scale-100 checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] dark:border-neutral-600 dark:checked:border-primary dark:checked:after:border-primary dark:checked:after:bg-primary dark:focus:before:shadow-[0px_0px_0px_13px_rgba(255,255,255,0.4)] dark:checked:focus:border-primary dark:checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca]"
                type="radio"
                name="flexRadioDefault"
                id="radioDefault01"
                value="Barang"
              />
              <label
                className="mt-2 ms-2 inline-block pl-[0.15rem] hover:cursor-pointer"
                htmlFor="radioDefault01"
              >
                Barang
              </label>
            </div>
          </div>
        </div>
        {/* berisi form retur */}
      </div>
      <p className="pr-2 pt-4 text-md italic text-primary">
        *pastikan nomer orderan sama dengan histori penjualan & metode
        pengembalian
      </p>

      <div
        className="cover mt-12 mb-5 border-2 rounded-xl"
        style={{ width: "100%", boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px" }}
      >
        <p className="pt-8 text-4xl font-semibold text-center text-primary">
          Data Barang
        </p>
        {/* <table className="border-2 border-gray rounded-lg" ref={tableRef}></table> */}
        <div className="cover m-2">
          <table
            id="example"
            className="display border-2 border-gray rounded-lg"
          >

          </table>
        </div>
      </div>

      <div
        className="w-full mt-16 mx-auto border-2 rounded-xl"
        style={{ boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px" }}
      >
        <div className="cover m-5">
          <p className="text-primary text-4xl font-semibold pt-2 mb-2">Hasil</p>
          <table
            className="text-left text-2xl font-light border rounded-xl w-full"
            style={{ boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px" }}
          >
            <thead className="border-b font-medium dark:border-neutral-500">
              <tr>
                <th scope="col" className="px-6 py-4">
                  Id Barang
                </th>
                <th scope="col" className="px-6 py-4">
                  Nama Barang
                </th>
                <th scope="col" className="px-6 py-4">
                  Harga Karton
                </th>
                <th scope="col" className="px-6 py-4">
                  Harga Pcs
                </th>
                <th scope="col" className="px-6 py-4">
                  Qty Retur Karton
                </th>
                <th scope="col" className="px-6 py-4">
                  Qty Retur Pcs
                </th>
              </tr>
            </thead>
            <tbody>
              {listTable.current.map((e, index) => {
                if (
                  parseInt(e.jumlah_retur_karton) != 0 ||
                  parseInt(e.jumlah_retur_pcs) != 0
                ) {
                  return (
                    <tr
                      key={index}
                      className="border-b dark:border-neutral-500"
                    >
                      <td className="whitespace-nowrap px-6 py-4 font-medium">
                        {e.id_barang}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4 font-medium">
                        {e.nama_barang}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4">
                        {formatter.format(e.harga_karton)}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4">
                        {formatter.format(e.harga_pcs)}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4">
                        {e.jumlah_retur_karton}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4">
                        {e.jumlah_retur_pcs}
                      </td>
                    </tr>
                  );
                }
              })}
            </tbody>
          </table>
          <p className="pr-2 pt-4 text-md italic text-primary">
            *cek kembali semua form sebelum submit
          </p>
        </div>
      </div>
      <div className="flex mb-28">
        <div className="w w-full mt-10 mb-5">
          <button
            onClick={submit}
            className="bg-primary w-52 h-16 rounded-xl text-white hover:bg-gray-300 hover:text-primary font-bold py-2 px-4"
          >
            Submit
          </button>
        </div>
        <div className="w w-52 ms-14 mt-10 mb-5 float-right">
        </div>
      </div>
      <hr className="h-px my-8 rounded-xl bg-gray-400 border" />
    </>
  );
}
