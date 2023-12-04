import { useEffect, useState } from "react";
import LogoPrint from "../../images/image-navbar/printer.png";
import { useLoaderData } from "react-router-dom";
import formatter from "../../controller/formatter";

export default function DataLaporanOrderan() {
  const dataLaporan = useLoaderData();

  const [kelurahan, setKelurahan] = useState(dataLaporan.kelurahan);
  const [headerTransaksi, setHeaderTransaksi] = useState(
    dataLaporan.headerTransaksi
  );
  const [toko, setToko] = useState(dataLaporan.toko);
  const [user, setUser] = useState(dataLaporan.user);
  const [target, setTarget] = useState(dataLaporan.target);

  const [visibleData, setVisibleData] = useState(null);
  const [dataKelurahan, setDataKelurahan] = useState(null);
  const [refresh, setRefresh] = useState(true);
  const [totalTarget, setTotalTarget] = useState(0);
  const [averageSubtotal, setAverageSubtotal] = useState(0);

  useEffect(() => {
    setRefresh(!refresh);
  }, [totalTarget, averageSubtotal]);

  const Print = () => {
    //console.log('print');
    let printContents = document.getElementById("CetakLaporan").innerHTML;
    let originalContents = document.body.innerHTML;
    document.body.innerHTML = printContents;
    window.print();
    document.body.innerHTML = originalContents;
    window.location.reload(false);
  };

  const toggleVisibility = async (id_kel) => {
    let resultData = [];

    const tempKelurahan = kelurahan.find((kel) => kel.id_kelurahan == id_kel);
    setDataKelurahan(tempKelurahan);

    const listToko = toko.filter((t) => t.id_kelurahan == id_kel);

    const listHeaderTransaksi = headerTransaksi.filter(
      (h) => h.status_transaksi == 2
    );

    for (let i = 0; i < listHeaderTransaksi.length; i++) {
      const header = listHeaderTransaksi[i];
      const salesman = user.find((u) => u.id_user == header.id_user);

      for (let j = 0; j < listToko.length; j++) {
        const toko = listToko[j];
        if (header.id_toko == toko.id_toko) {
          const newData = {
            idOrder: header.id_transaksi,
            namaPelanggan: toko.nama_konsumen,
            namaToko: toko.nama_toko,
            namaSalesman: salesman.username,
            tanggal: header.tanggal_transaksi,
            subtotal: header.subtotal,
            status: header.status_transaksi,
            idKel: id_kel,
          };

          resultData.push(newData);
        }
      }
    }

    // console.log(resultData);

    // Total Target
    const listTarget = target.filter((t) => t.id_wilayah == id_kel);

    let totalTarget = 0;
    for (let i = 0; i < listTarget.length; i++) {
      const t = listTarget[i];
      totalTarget += t.target;
    }
    setTotalTarget(totalTarget);

    // Average Subtotal
    let grandtotal = 0;
    let countSubtotal = 0;
    let jan = 0,
      feb = 0,
      mar = 0,
      apr = 0,
      mei = 0,
      jun = 0,
      jul = 0,
      agu = 0,
      sep = 0,
      okt = 0,
      nov = 0,
      des = 0;
    for (let i = 0; i < listHeaderTransaksi.length; i++) {
      const hT = listHeaderTransaksi[i];

      for (let j = 0; j < listToko.length; j++) {
        const toko = listToko[j];
        if (hT.id_toko == toko.id_toko) {
          const tanggal = hT.tanggal_transaksi.split("-");
          const month = tanggal[1];

          if (month == 1) {
            jan += hT.subtotal;
          } else if (month == 2) {
            feb += hT.subtotal;
          } else if (month == 3) {
            mar += hT.subtotal;
          } else if (month == 4) {
            apr += hT.subtotal;
          } else if (month == 5) {
            mei += hT.subtotal;
          } else if (month == 6) {
            jun += hT.subtotal;
          } else if (month == 7) {
            jul += hT.subtotal;
          } else if (month == 8) {
            agu += hT.subtotal;
          } else if (month == 9) {
            sep += hT.subtotal;
          } else if (month == 10) {
            okt += hT.subtotal;
          } else if (month == 11) {
            nov += hT.subtotal;
          } else if (month == 12) {
            des += hT.subtotal;
          }
        }
      }
    }

    let recapMonth = [];
    recapMonth.push(jan);
    recapMonth.push(feb);
    recapMonth.push(mar);
    recapMonth.push(apr);
    recapMonth.push(mei);
    recapMonth.push(jun);
    recapMonth.push(jul);
    recapMonth.push(agu);
    recapMonth.push(sep);
    recapMonth.push(okt);
    recapMonth.push(nov);
    recapMonth.push(des);

    for (let i = 0; i < recapMonth.length; i++) {
      const month = recapMonth[i];

      if (month != 0) {
        grandtotal += month;
        countSubtotal++;
      }
    }
    // console.log(grandtotal + " / " + countSubtotal);

    let averageSubtotal = grandtotal / countSubtotal;

    // console.log(averageSubtotal);

    setAverageSubtotal(averageSubtotal);

    if (visibleData != null && tempKelurahan == dataKelurahan) {
      setVisibleData(null);
    } else {
      setVisibleData(resultData);
    }
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
      let dataTarget = [];

      if (tempDateStart != "" && tempDateEnd != "") {
        const dateStart = new Date(tempDateStart);
        const dateEnd = new Date(tempDateEnd);

        let tempHeader = [];
        for (let i = 0; i < listHeaderTransaksi.length; i++) {
          const hT = listHeaderTransaksi[i];

          //   console.log(createDate(hT.tanggal_transaksi).getTime());

          if (
            createDate(hT.tanggal_transaksi).getTime() >= dateStart.getTime() &&
            createDate(hT.tanggal_transaksi).getTime() <= dateEnd.getTime()
          ) {
            tempHeader.push(hT);
          }
        }
        dataHeaderTransaksi = tempHeader;

        let tempTarget = [];
        for (let i = 0; i < target.length; i++) {
          const t = target[i];
          //   console.log(t.tanggal_target);
          if (
            createDate(t.tanggal_target).getTime() >= dateStart.getTime() &&
            createDate(t.tanggal_target).getTime() <= dateEnd.getTime()
          ) {
            tempTarget.push(t);
          }
        }
        dataTarget = tempTarget;
      } else if (tempDateStart != "") {
        const dateStart = new Date(tempDateStart);

        let tempHeader = [];
        for (let i = 0; i < listHeaderTransaksi.length; i++) {
          const hT = listHeaderTransaksi[i];

          //   console.log(createDate(hT.tanggal_transaksi).getTime());

          if (
            createDate(hT.tanggal_transaksi).getTime() >= dateStart.getTime()
          ) {
            tempHeader.push(hT);
          }
        }
        dataHeaderTransaksi = tempHeader;

        let tempTarget = [];
        for (let i = 0; i < target.length; i++) {
          const t = target[i];
          if (createDate(t.tanggal_target).getTime() >= dateStart.getTime()) {
            tempTarget.push(t);
          }
        }
        dataTarget = tempTarget;
      } else if (tempDateEnd != "") {
        const dateEnd = new Date(tempDateEnd);

        let tempHeader = [];
        for (let i = 0; i < listHeaderTransaksi.length; i++) {
          const hT = listHeaderTransaksi[i];

          //   console.log(createDate(hT.tanggal_transaksi).getTime());

          if (createDate(hT.tanggal_transaksi).getTime() <= dateEnd.getTime()) {
            tempHeader.push(hT);
          }
        }
        dataHeaderTransaksi = tempHeader;

        let tempTarget = [];
        for (let i = 0; i < target.length; i++) {
          const t = target[i];
          if (createDate(t.tanggal_target).getTime() <= dateEnd.getTime()) {
            tempTarget.push(t);
          }
        }
        dataTarget = tempTarget;
      } else if (tempDateStart == "" && tempDateEnd == "") {
        dataHeaderTransaksi = listHeaderTransaksi;
        dataTarget = target;
      }

      let resultData = [];

      const listToko = toko.filter(
        (t) => t.id_kelurahan == dataKelurahan.id_kelurahan
      );

      for (let i = 0; i < dataHeaderTransaksi.length; i++) {
        const header = dataHeaderTransaksi[i];
        const salesman = user.find((u) => u.id_user == header.id_user);

        for (let j = 0; j < listToko.length; j++) {
          const toko = listToko[j];
          if (header.id_toko == toko.id_toko) {
            const newData = {
              idOrder: header.id_transaksi,
              namaPelanggan: toko.nama_konsumen,
              namaToko: toko.nama_toko,
              namaSalesman: salesman.username,
              tanggal: header.tanggal_transaksi,
              subtotal: header.subtotal,
              status: header.status_transaksi,
              idKel: dataKelurahan.id_kelurahan,
            };

            resultData.push(newData);
          }
        }
      }

      // console.log(resultData);

      // Total Target
      const listTarget = dataTarget.filter(
        (t) => t.id_wilayah == dataKelurahan.id_kelurahan
      );

      let totalTarget = 0;
      for (let i = 0; i < listTarget.length; i++) {
        const t = listTarget[i];
        totalTarget += t.target;
      }
      setTotalTarget(totalTarget);

      // Average Subtotal
      let grandtotal = 0;
      let countSubtotal = 0;
      let jan = 0,
        feb = 0,
        mar = 0,
        apr = 0,
        mei = 0,
        jun = 0,
        jul = 0,
        agu = 0,
        sep = 0,
        okt = 0,
        nov = 0,
        des = 0;
      for (let i = 0; i < dataHeaderTransaksi.length; i++) {
        const hT = dataHeaderTransaksi[i];

        for (let j = 0; j < listToko.length; j++) {
          const toko = listToko[j];
          if (hT.id_toko == toko.id_toko) {
            const tanggal = hT.tanggal_transaksi.split("-");
            const month = tanggal[1];

            if (month == 1) {
              jan += hT.subtotal;
            } else if (month == 2) {
              feb += hT.subtotal;
            } else if (month == 3) {
              mar += hT.subtotal;
            } else if (month == 4) {
              apr += hT.subtotal;
            } else if (month == 5) {
              mei += hT.subtotal;
            } else if (month == 6) {
              jun += hT.subtotal;
            } else if (month == 7) {
              jul += hT.subtotal;
            } else if (month == 8) {
              agu += hT.subtotal;
            } else if (month == 9) {
              sep += hT.subtotal;
            } else if (month == 10) {
              okt += hT.subtotal;
            } else if (month == 11) {
              nov += hT.subtotal;
            } else if (month == 12) {
              des += hT.subtotal;
            }
          }
        }
      }

      let recapMonth = [];
      recapMonth.push(jan);
      recapMonth.push(feb);
      recapMonth.push(mar);
      recapMonth.push(apr);
      recapMonth.push(mei);
      recapMonth.push(jun);
      recapMonth.push(jul);
      recapMonth.push(agu);
      recapMonth.push(sep);
      recapMonth.push(okt);
      recapMonth.push(nov);
      recapMonth.push(des);

      for (let i = 0; i < recapMonth.length; i++) {
        const month = recapMonth[i];

        if (month != 0) {
          grandtotal += month;
          countSubtotal++;
        }
      }
      // console.log(grandtotal + " / " + countSubtotal);

      let averageSubtotal = grandtotal / countSubtotal;

      // console.log(averageSubtotal);

      setAverageSubtotal(averageSubtotal);

      setVisibleData(resultData);
    }
  };

  return (
    <>
      <div className="cover selectdisable flex">
        {/* nanti digunakan memanggil nama sesuai akun*/}
        <div className="header lg:w-full md:w-1/2 text-primary text-4xl font-semibold">
          <p>Laporan Penjualan</p>
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
        <div id="CetakLaporan">
          <div
            className="selectdisable border-2 mt-10 flex border-gray-300 rounded-2xl lg:w-full h-full"
            style={{ boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px" }}
          >
            {/* berisi from retur */}
            <div className="w-full m-5">
              <table
                className="text-left text-2xl font-light border rounded-xl w-full"
                style={{ boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px" }}
              >
                <thead className="border-b font-medium dark:border-neutral-500">
                  <tr>
                    <th scope="col" className="px-6 py-4">
                      ID Order
                    </th>
                    <th scope="col" className="px-6 py-4">
                      Nama Konsumen
                    </th>
                    <th scope="col" className="px-6 py-4">
                      Nama Toko
                    </th>
                    <th scope="col" className="px-6 py-4">
                      Nama Salesman
                    </th>
                    <th scope="col" className="px-6 py-4">
                      Tanggal
                    </th>
                    <th scope="col" className="px-6 py-4">
                      Subtotal
                    </th>
                    <th scope="col" className="px-6 py-4">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {visibleData.map((data, index) => (
                    <tr
                      key={index}
                      className="border-b dark:border-neutral-500"
                    >
                      <td className="whitespace-nowrap px-6 py-4 font-medium">
                        {data.idOrder}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4">
                        {data.namaPelanggan}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4">
                        {data.namaToko}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4">
                        {data.namaSalesman}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4">
                        {data.tanggal}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4">
                        {formatter.format(data.subtotal)}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4 text-primary">
                        Lunas
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div
            id="infoTotal"
            className="cover bg-gray-200 w-5/12 mt-10 rounded-xl shadow-2xl"
          >
            <div className="m-5 mt-4">
              <div className="cover flex m-4 pt-4">
                <p className="text-2xl w-52">Target Penjualan : </p>
                <p className="text-primary text-2xl">
                  {formatter.format(totalTarget)}
                </p>
              </div>
              <div className="cover flex m-4 pb-4">
                <p className="text-2xl w-52">Average Bulanan : </p>
                <p className="text-primary text-2xl">
                  {formatter.format(averageSubtotal)}
                </p>
              </div>
              {/* <div className="cover flex m-4 pb-4">
                <div className="kiri w-full flex">
                  <p className="text-2xl w-52">Kekurangan : </p>
                  <p className="text-primary text-2xl">Rp. 0</p>
                </div>
              </div> */}
            </div>
          </div>
        </div>
      )}
      <div className="kanan w-1/3">
        <div className="prints">
          <div className="w-full border rounded-xl">
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
      </div>
      <hr className="h-px my-10 mt-18 mb-52" />
      <hr className="h-px my-10 mt-18 mb-52" />
    </>
  );
}
