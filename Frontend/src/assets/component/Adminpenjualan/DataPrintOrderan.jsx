import { useEffect, useState } from "react";
import Waktu from "../../controller/ControlWaktu";
import LogoPrint from "../../images/image-navbar/printer.png";
import { useLoaderData } from "react-router-dom";
import client from "../../controller/client";
import formatter from "../../controller/formatter";

export default function DataPrintOrderan() {
  const dataNota = useLoaderData();

  const [kelurahan, setKelurahan] = useState(dataNota.kelurahan);
  const [headerTransaksi, setHeaderTransaksi] = useState(
    dataNota.headerTransaksi
  );
  const [toko, setToko] = useState(dataNota.toko);

  const [visibleData, setVisibleData] = useState(null);
  const [dataKelurahan, setDataKelurahan] = useState(null);
  const [refresh, setRefresh] = useState(true);

  useEffect(() => {
    setRefresh(!refresh);
  }, [visibleData]);

  const Print = () => {
    //console.log('print');
    let printContents = document.getElementById("NotaCetak").innerHTML;
    let originalContents = document.body.innerHTML;
    document.body.innerHTML = printContents;
    window.print();
    document.body.innerHTML = originalContents;

    window.location.reload(false);
  };

  const createDate = (date) => {
    const temp = date.split("-");
    temp.reverse();
    const reversed = temp.join("-");
    const newDate = new Date(reversed);
    return newDate;
  };

  const handleSearch = async () => {
    if (dataKelurahan) {
      const tempDateStart = document.getElementById("dateStart").value;
      const tempDateEnd = document.getElementById("dateEnd").value;

      const listHeaderTransaksi = headerTransaksi.filter(
        (h) => h.status_transaksi == 2
      );

      let dataHeaderTransaksi = [];

      if (tempDateStart != "" && tempDateEnd != "") {
        const dateStart = new Date(tempDateStart);
        const dateEnd = new Date(tempDateEnd);

        let temp = [];
        for (let i = 0; i < listHeaderTransaksi.length; i++) {
          const hT = listHeaderTransaksi[i];

          console.log(createDate(hT.tanggal_transaksi).getTime());

          if (
            createDate(hT.tanggal_transaksi).getTime() >= dateStart.getTime() &&
            createDate(hT.tanggal_transaksi).getTime() <= dateEnd.getTime()
          ) {
            temp.push(hT);
          }
        }
        dataHeaderTransaksi = temp;
      } else if (tempDateStart != "") {
        const dateStart = new Date(tempDateStart);

        let temp = [];
        for (let i = 0; i < listHeaderTransaksi.length; i++) {
          const hT = listHeaderTransaksi[i];

          console.log(createDate(hT.tanggal_transaksi).getTime());

          if (
            createDate(hT.tanggal_transaksi).getTime() >= dateStart.getTime()
          ) {
            temp.push(hT);
          }
        }
        dataHeaderTransaksi = temp;
      } else if (tempDateEnd != "") {
        const dateEnd = new Date(tempDateEnd);

        let temp = [];
        for (let i = 0; i < listHeaderTransaksi.length; i++) {
          const hT = listHeaderTransaksi[i];

          console.log(createDate(hT.tanggal_transaksi).getTime());

          if (createDate(hT.tanggal_transaksi).getTime() <= dateEnd.getTime()) {
            temp.push(hT);
          }
        }
        dataHeaderTransaksi = temp;
      } else if (tempDateStart == "" && tempDateEnd == "") {
        alert("NOTHING");
        dataHeaderTransaksi = listHeaderTransaksi;
      }

      let resultData = [];

      const listToko = toko.filter(
        (t) => t.id_kelurahan == dataKelurahan.id_kelurahan
      );

      const tempDetailTransaksi = await client.get(
        `/api/getAllDetailTransaksi`
      );
      const listDetailTransaksi = tempDetailTransaksi.data;

      for (let i = 0; i < dataHeaderTransaksi.length; i++) {
        const header = dataHeaderTransaksi[i];
        const detail = listDetailTransaksi.filter(
          (dT) => dT.id_transaksi == header.id_transaksi
        );

        let dataBarang = [];
        let totalPcs = 0;
        let totalKarton = 0;

        for (let j = 0; j < detail.length; j++) {
          const detailBarang = detail[j];

          let tempBarang = await client.post(
            `/api/detailBarang/${detailBarang.id_detail_barang}`
          );
          let barang = tempBarang.data;

          dataBarang.push({
            ...barang,
            jumlahPcs: detailBarang.jumlah_barang_pcs,
            jumlahKarton: detailBarang.jumlah_barang_karton,
          });

          if (detailBarang.jumlah_barang_pcs) {
            totalPcs += detailBarang.jumlah_barang_pcs * barang.harga_pcs;
          }
          if (detailBarang.jumlah_barang_karton) {
            totalKarton +=
              detailBarang.jumlah_barang_karton * barang.harga_karton;
          }
        }

        for (let j = 0; j < listToko.length; j++) {
          const toko = listToko[j];
          if (header.id_toko == toko.id_toko) {
            const newData = {
              idOrder: header.id_transaksi,
              namaPelanggan: toko.nama_konsumen,
              namaToko: toko.nama_toko,
              alamat: toko.alamat_toko,
              tanggal: header.tanggal_transaksi,
              dataBarang: dataBarang,
              totalPcs: totalPcs,
              totalKarton: totalKarton,
              subtotal: header.subtotal,
              status: header.status_transaksi,
              idKel: dataKelurahan.id_kelurahan,
            };

            resultData.push(newData);
          }
        }
      }

      // console.log(resultData);

      setVisibleData(resultData);
    }
  };

  const toggleVisibility = async (id_kel) => {
    let resultData = [];

    const tempKelurahan = kelurahan.find((kel) => kel.id_kelurahan == id_kel);
    setDataKelurahan(tempKelurahan);

    const listToko = toko.filter((t) => t.id_kelurahan == id_kel);

    const listHeaderTransaksi = headerTransaksi.filter(
      (h) => h.status_transaksi == 2
    );

    const tempDetailTransaksi = await client.get(`/api/getAllDetailTransaksi`);
    const listDetailTransaksi = tempDetailTransaksi.data;

    for (let i = 0; i < listHeaderTransaksi.length; i++) {
      const header = listHeaderTransaksi[i];
      const detail = listDetailTransaksi.filter(
        (dT) => dT.id_transaksi == header.id_transaksi
      );

      let dataBarang = [];
      let totalPcs = 0;
      let totalKarton = 0;

      for (let j = 0; j < detail.length; j++) {
        const detailBarang = detail[j];

        let tempBarang = await client.post(
          `/api/detailBarang/${detailBarang.id_detail_barang}`
        );
        let barang = tempBarang.data;

        dataBarang.push({
          ...barang,
          jumlahPcs: detailBarang.jumlah_barang_pcs,
          jumlahKarton: detailBarang.jumlah_barang_karton,
        });

        if (detailBarang.jumlah_barang_pcs) {
          totalPcs += detailBarang.jumlah_barang_pcs * barang.harga_pcs;
        }
        if (detailBarang.jumlah_barang_karton) {
          totalKarton +=
            detailBarang.jumlah_barang_karton * barang.harga_karton;
        }
      }

      for (let j = 0; j < listToko.length; j++) {
        const toko = listToko[j];
        if (header.id_toko == toko.id_toko) {
          const newData = {
            idOrder: header.id_transaksi,
            namaPelanggan: toko.nama_konsumen,
            namaToko: toko.nama_toko,
            alamat: toko.alamat_toko,
            tanggal: header.tanggal_transaksi,
            dataBarang: dataBarang,
            totalPcs: totalPcs,
            totalKarton: totalKarton,
            subtotal: header.subtotal,
            status: header.status_transaksi,
            idKel: id_kel,
          };

          resultData.push(newData);
        }
      }
    }

    console.log(resultData);

    if (visibleData != null && tempKelurahan == dataKelurahan) {
      setVisibleData(null);
    } else {
      setVisibleData(resultData);
    }
  };

  return (
    <>
      <div className="cover selectdisable flex">
        {/* nanti digunakan memanggil nama sesuai akun*/}
        <div className="header lg:w-full md:w-1/2 text-primary text-4xl font-semibold">
          <p>Print Nota Pemesanan</p>
        </div>
        <div className="rounded-xl lg:w-1/2 float-right mr-0 mx-auto text-2xl font-semibold">
          {/* <ControlTarget /> */}
        </div>
      </div>
      <div
        className="isi border-2 mt-10 mx-auto items-center border-gray-300 rounded-2xl lg:w-full h-full"
        style={{ boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px" }}
      >
        <div className="row ms-4 m-4 w-5/12 rounded-xl border-2">
          <div className="m-4">
            <div className="flex text-primary text-2xl">
              <p className="pt-1 pr-2">Tanggal Awal : </p>
              <input
                type="date"
                placeholder="tanggal awal"
                className="border border-primary rounded-lg text-xl h-10"
                name="date"
                id="dateStart"
              />
            </div>
            <div className="flex mt-5 text-primary  text-2xl">
              <p className="pr-2 pt-1">Tanggal Akhir: </p>
              <input
                type="date"
                placeholder="tanggal akhir"
                className="border border-primary rounded-lg text-xl h-10"
                name="date2"
                id="dateEnd"
              />
            </div>
            <div className="flex mt-7 m-4 text-primary float-right text-2xl">
              <button
                className="w-52 h-14 items-end bg-primary rounded-xl hover:bg-gray-300 text-white hover:text-primary font-bold py-2 px-4"
                onClick={handleSearch}
              >
                Cari
              </button>
            </div>
          </div>
        </div>
        <hr className="h-px my-10 mt-1 mb-1 border-2 border-gray-300" />
        <div className="selectdisable flex mb-6">
          {/* berisi from retur */}
          <div className="mx-auto items-center">
            <p className="pt-3 text-4xl font-semibold text-center text-primary">
              Daftar Area
            </p>
            <div className="w-full\ items-center mx-auto m-6">
              <div className="grid grid-cols-6 lg:grid-cols-8 text-primary text-2xl">
                {kelurahan &&
                  kelurahan.map((kel, index) => (
                    <button
                      key={index}
                      onClick={() => toggleVisibility(kel.id_kelurahan)}
                      className="w-52 h-14 m-2 items-end bg-primary rounded-2xl hover:bg-gray-300 text-white hover:text-primary font-bold py-2 px-4"
                    >
                      {kel.nama_kelurahan.toUpperCase()}
                    </button>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {visibleData != null && (
        <div className="mt-5 bg-gray-200 shadow-2xl rounded-xl">
          <p className="text-3xl ps-5 pt-2 font-semibold text-primary">
            SUB {dataKelurahan && dataKelurahan.nama_kelurahan.toUpperCase()}
          </p>
          <div className="cover m-5">
            <div
              id="NotaCetak"
              className="text-2xl bg-yellow-100 mb-12 border-2 border-dashed border-gray-400 w-full"
              style={{ boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px" }}
            >
              {visibleData.map((data, index) => (
                <div key={index} className="m-3 mb-80">
                  <div className="kopNota flex">
                    <div className="kiri w-full text-base">
                      <div className="flex m-4">
                        <p className="w-44">No. Pemesanan : </p>
                        <p>{data.idOrder}</p>
                      </div>
                      <div className="flex m-4">
                        <p className="w-44">Alamat : </p>
                        <p>{data.alamat}</p>
                      </div>
                      <div className="flex m-4">
                        <p className="w-44">Tanggal : </p>
                        <p>{data.tanggal}</p>
                      </div>
                      <div className="flex m-4">
                        <p className="w-44">Waktu : </p>
                        <p>
                          <Waktu />
                        </p>
                      </div>
                      <div className="flex m-4">
                        <p className="w-44">Yth : </p>
                        <p>{data.namaPelanggan}, (Ditempat)</p>
                      </div>
                    </div>
                    <div className="kanan w-2/4">
                      <div className="m-2">
                        <p className="text-2xl text-end font-bold">
                          CV. LAJU JAYA CEMERLANG
                        </p>
                      </div>
                      <div className="m-2">
                        <p className="text-base text-end">
                          Jl. Ngagel Jaya Tengah No.73-77{" "}
                        </p>
                      </div>
                      <div className="m-2">
                        <p className="text-base text-end">
                          lajujayacemerlang@gmail.com{" "}
                        </p>
                      </div>
                      <div className="m-2">
                        <p className="text-base text-end">(021) 888</p>
                      </div>
                    </div>
                  </div>
                  <hr className="my-10 mt-18 border border-dashed border-gray-600" />
                  <div className="content">
                    <table className="text-left text-xl font-light w-full">
                      <thead className="border font-medium dark:border-neutral-200">
                        <tr>
                          <th scope="col" className="px-6 py-4">
                            No
                          </th>
                          <th scope="col" className="px-6 py-4">
                            Nama Produk
                          </th>
                          <th scope="col" className="px-6 py-4">
                            Jumlah
                          </th>
                          <th scope="col" className="px-6 py-4">
                            Harga Pcs
                          </th>
                          <th scope="col" className="px-6 py-4">
                            Harga Karton
                          </th>
                        </tr>
                      </thead>
                      {data.dataBarang.map((barang, index) => (
                        <tbody key={index}>
                          <tr className="border-b dark:border-neutral-500">
                            <td className="whitespace-nowrap px-6 py-4 font-medium">
                              {index + 1}
                            </td>
                            <td className="whitespace-nowrap px-6 py-4">
                              {barang.nama_barang}
                            </td>
                            <td className="whitespace-nowrap px-6 py-4 flex">
                              {barang.jumlahPcs != 0 && (
                                <>
                                  {barang.jumlahPcs}{" "}
                                  <span>
                                    <p className="ps-2">Pcs</p>
                                  </span>
                                </>
                              )}
                              <span className="mx-2"></span>
                              {barang.jumlahKarton != 0 && (
                                <>
                                  {barang.jumlahKarton}{" "}
                                  <span>
                                    <p className="ps-2">Karton</p>
                                  </span>
                                </>
                              )}
                            </td>
                            <td className="whitespace-nowrap px-6 py-4">
                              {formatter.format(barang.harga_pcs)}
                            </td>
                            <td className="whitespace-nowrap px-6 py-4">
                              {formatter.format(barang.harga_karton)}
                            </td>
                          </tr>
                        </tbody>
                      ))}
                    </table>
                  </div>
                  <hr className="my-3 mt-18 border border-dashed border-gray-600" />
                  <div className="text-lg mt-10 mb-10">
                    <div className="flex">
                      <div className="text-end float-right">Total Pcs : </div>
                      <span className="ms-5">
                        {formatter.format(data.totalPcs)}
                      </span>
                    </div>
                    <div className="flex">
                      <div className="text-end float-right">
                        Total Karton :{" "}
                      </div>
                      <span className="ms-5">
                        {formatter.format(data.totalKarton)}
                      </span>
                    </div>
                    <div className="flex">
                      <div className="text-end float-right">Subtotal : </div>
                      <span className="ms-5">
                        {formatter.format(data.subtotal)}
                      </span>
                    </div>
                  </div>
                  <hr className="my-3 mb-10 border border-dashed border-gray-600" />
                  <div className="kopNota flex float-right w-1/3">
                    <div className="kiri w-2/5 text-xl mr-20">
                      <div className="m-4">
                        <p className="w-44" style={{ fontSize: "15px" }}>
                          Hormat Kami,{" "}
                        </p>
                        <p className="mt-36 ms-9">...........</p>
                      </div>
                    </div>
                    <div className="kanan w-2/5">
                      <div className="m-2">
                        <p className="w-44">Pelanggan, </p>
                        <p className="mt-36 ms-5">...........</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      <div className="prints">
        <div
          className="w-full border rounded-xl "
          style={{ boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px" }}
        >
          <div className="m-4">
            <div className="noId flex text-primary text-2xl" onClick={Print}>
              <img src={LogoPrint} className="m-2 w-14 h-14" alt="" />
              <button className="w-52 h-14 m-2 items-end bg-primary rounded-xl hover:bg-gray-300 text-white hover:text-primary font-bold py-2 px-4">
                Print
              </button>
            </div>
          </div>
        </div>
      </div>
      <hr className="h-px my-10 mt-18 mb-52" />
      <hr className="h-px my-10 mt-18 mb-52" />
    </>
  );
}
