import { useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";
import formatter from "../../controller/formatter";
import client from "../../controller/client";

export default function DataOrderanMasuk() {
  const dataOrder = useLoaderData();

  const [kelurahan, setKelurahan] = useState(dataOrder.kelurahan);
  const [headerTransaksi, setHeaderTransaksi] = useState(
    dataOrder.headerTransaksi
  );
  const [toko, setToko] = useState(dataOrder.toko);
  const [user, setUser] = useState(dataOrder.user);

  const [visibleData, setVisibleData] = useState(null);
  const [dataKelurahan, setDataKelurahan] = useState(null);
  const [refresh, setRefresh] = useState(true);
  const [submit, setSubmit] = useState(false);

  const forceRefresh = () => {
    setRefresh(!refresh);
  };

  useEffect(() => {
    forceRefresh();
  }, [visibleData, dataKelurahan]);

  const updateData = async () => {
    let tempHeaderTransaksi = await client.get(`/api/headertransaksi`);
    setHeaderTransaksi(tempHeaderTransaksi.data);
    setSubmit(true);
    forceRefresh();
  };

  useEffect(() => {
    if (visibleData) {
      let resultData = [];

      const listToko = toko.filter(
        (t) => t.id_kelurahan == dataKelurahan.id_kel
      );

      const listHeaderTransaksi = headerTransaksi.filter(
        (h) => h.status_transaksi == 1
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
              idKel: dataKelurahan.id_kel,
            };

            resultData.push(newData);
          }
        }
      }

      setVisibleData(resultData);
      setSubmit(false);
    }
  }, [submit]);

  const toggleVisibility = (id_kel) => {
    let resultData = [];

    const tempKelurahan = kelurahan.find((kel) => kel.id_kelurahan == id_kel);

    setDataKelurahan(tempKelurahan);

    const listToko = toko.filter((t) => t.id_kelurahan == id_kel);

    const listHeaderTransaksi = headerTransaksi.filter(
      (h) => h.status_transaksi == 1
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

    if (visibleData != null && tempKelurahan == dataKelurahan) {
      setVisibleData(null);
    } else {
      setVisibleData(resultData);
    }
  };

  const toogleSelect = (source) => {
    let checkboxes = document.getElementsByName("orderBox");
    for (let i = 0; i < checkboxes.length; i++) {
      checkboxes[i].checked = source.checked;
    }
  };

  const handleSubmit = async () => {
    let checkboxes = document.getElementsByName("orderBox");

    let orders = [];
    for (let i = 0; i < checkboxes.length; i++) {
      const cb = checkboxes[i];

      if (cb.checked == true) {
        let tempHeaderTransaksi = headerTransaksi.find(
          (h) => h.id_transaksi == cb.value
        );

        orders.push(tempHeaderTransaksi);
      }
    }

    let tempdetailTransaksi = await client.get(`/api/getAllDetailTransaksi`);

    let detailTransaksi = tempdetailTransaksi.data;

    let totalUang = 0;

    for (let i = 0; i < orders.length; i++) {
      const order = orders[i];

      totalUang += order.subtotal;

      // Update Status Transaksi
      let updateStatusOrder = await client.put(
        `/api/updateHeaderTransaksi/${order.id_transaksi}`,
        {
          status: 2,
        }
      );

      // Update Realisasi User
      let updateRealisasi = await client.put(
        `/api/realisasi/${order.id_user}`,
        {
          subtotal: order.subtotal,
        }
      );
    }

    // Insert Master Keuangan
    let updateKeuangan = await client.post(`/api/orderKeuangan`, {
      uangMasuk: totalUang,
    });

    updateData();
  };

  return (
    <>
      <div className="cover selectdisable flex">
        {/* nanti digunakan memanggil nama sesuai akun*/}
        <div className="header lg:w-full md:w-1/2 text-primary text-4xl font-semibold">
          <p>Verfikasi Pemesanan</p>
        </div>
        <div className="rounded-xl lg:w-1/2 float-right mr-0 mx-auto text-2xl font-semibold">
          {/* <ControlTarget /> */}
        </div>
      </div>
      <div
        className="selectdisable border-2 mt-10 mx-auto items-center flex border-gray-300 rounded-2xl lg:w-full h-full"
        style={{ boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px" }}
      >
        {/* berisi from retur */}
        <div className="mx-auto items-center">
          <p className="pt-8 text-4xl font-semibold text-center text-primary">
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
      <div className="w w-full mt-2 mb-2">
        <p className="pr-2 pt-4 text-md italic text-primary">
          *Maksimal memilih satu area berbeda!!!
        </p>
      </div>
      {visibleData != null && (
        <div className="mt-5 bg-gray-200 shadow-2xl rounded-xl">
          <p className="text-2xl ps-5 pt-2 font-semibold text-primary">
            SUB {dataKelurahan && dataKelurahan.nama_kelurahan.toUpperCase()}
          </p>
          <div className="cover m-5">
            <table
              className="text-left text-2xl mb-12 font-light border rounded-xl w-full"
              style={{ boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px" }}
            >
              <thead className="border-b font-medium dark:border-neutral-500">
                <tr>
                  <th scope="col" className="px-6 py-2 w-5">
                    <input
                      type="checkbox"
                      name="selectAll"
                      id="all"
                      className="border-2 border-primary w-7 h-7 rounded-lg"
                      onClick={(e) => toogleSelect(e.target)}
                    />
                  </th>
                  <th scope="col" className="px-6 py-4">
                    ID Order
                  </th>
                  <th scope="col" className="px-6 py-4">
                    Nama
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
                {visibleData.map((v, index) => (
                  <tr key={index} className="border-b dark:border-neutral-500">
                    <td className="whitespace-nowrap px-6 py-4">
                      <input
                        type="checkbox"
                        name="orderBox"
                        value={v.idOrder}
                        id="all"
                        className="border-2 border-primary w-7 h-7 rounded-lg"
                      />
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 font-medium">
                      {v.idOrder}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4">
                      {v.namaPelanggan}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4">
                      {v.namaToko}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4">
                      {v.namaSalesman}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4">{v.tanggal}</td>
                    <td className="whitespace-nowrap px-6 py-4">
                      {formatter.format(v.subtotal)}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-primary">
                      {v.status == 1 && "Menunggu"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
      <div className="prints">
        <div className="m-4">
          <div className="noId flex text-primary text-2xl">
            <button
              className="w-52 h-14 m-2 items-end bg-primary rounded-xl hover:bg-gray-300 text-white hover:text-primary font-bold py-2 px-4"
              onClick={handleSubmit}
            >
              Submit
            </button>
          </div>
        </div>
      </div>
      <div className="w w-full mt-2 mb-52">
        <p className="pr-2 pt-4 text-md italic text-primary">
          *jika terjadi kesalahan verifikasi hub admin website!!!
        </p>
      </div>
      <hr className="h-px my-10 mt-18 mb-52" />
    </>
  );
}
