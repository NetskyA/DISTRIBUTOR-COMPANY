import { useEffect, useState, useRef } from "react";
import LogoPrint from "../../images/image-navbar/printer.png";
import { useLoaderData } from "react-router-dom";

export default function DataOrderanMasuk() {
  const data = useLoaderData();

  const [visibleData, setVisibleData] = useState(null);

  //   const [isVisible, setIsVisible] = useState(true);
  //   const toggleVisibility = () => {
  //     setIsVisible(!isVisible);
  //   };

  //   const [isVisible2, setIsVisible2] = useState(true);
  //   const toggleVisibility2 = () => {
  //     setIsVisible2(!isVisible2);
  //   };

  //   const [isVisible3, setIsVisible3] = useState(true);
  //   const toggleVisibility3 = () => {
  //     setIsVisible3(!isVisible3);
  //   };

  //   const [isVisible4, setIsVisible4] = useState(true);
  //   const toggleVisibility4 = () => {
  //     setIsVisible4(!isVisible4);
  //   };

  //   const [isVisible5, setIsVisible5] = useState(true);
  //   const toggleVisibility5 = () => {
  //     setIsVisible5(!isVisible5);
  //   };

  //   const [isVisible6, setIsVisible6] = useState(true);
  //   const toggleVisibility6 = () => {
  //     setIsVisible6(!isVisible6);
  //   };

  //   const [isVisible7, setIsVisible7] = useState(true);
  //   const toggleVisibility7 = () => {
  //     setIsVisible7(!isVisible7);
  //   };
  //   const [isVisible8, setIsVisible8] = useState(true);
  //   const toggleVisibility8 = () => {
  //     setIsVisible8(!isVisible8);
  //   };

  const toggleVisibility = (data) => {
    alert("change: " + data);
    if (visibleData == data) {
      setVisibleData(null);
      return;
    }

    setVisibleData(data);
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
              {data.kelurahan &&
                data.kelurahan.map((kel, index) => (
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
        {/* berisi form retur */}
      </div>
      <div className="w w-full mt-2 mb-2">
        <p className="pr-2 pt-4 text-md italic text-primary">
          *Maksimal memilih satu area berbeda!!!
        </p>
      </div>
      {visibleData != null && (
        <div className="mt-5 bg-gray-200 shadow-2xl rounded-xl">
          <p className="text-2xl ps-5 pt-2 font-semibold text-primary">
            SUB NAMA KELURAHAN
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
                <tr className="border-b dark:border-neutral-500">
                  <td className="whitespace-nowrap px-6 py-4">
                    <input
                      type="checkbox"
                      name="selectAll"
                      id="all"
                      className="border-2 border-primary w-7 h-7 rounded-lg"
                    />
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 font-medium">
                    ORD0001
                  </td>
                  <td className="whitespace-nowrap px-6 py-4">bude ayu</td>
                  <td className="whitespace-nowrap px-6 py-4">Hypermart</td>
                  <td className="whitespace-nowrap px-6 py-4">Alvin</td>
                  <td className="whitespace-nowrap px-6 py-4">11/11/2023</td>
                  <td className="whitespace-nowrap px-6 py-4">Rp. 1.230.000</td>
                  <td className="whitespace-nowrap px-6 py-4 text-primary">
                    Menunggu
                  </td>
                </tr>
                <tr className="border-b dark:border-neutral-500">
                  <td className="whitespace-nowrap px-6 py-4">
                    <input
                      type="checkbox"
                      name="selectAll"
                      id="all"
                      className="border-2 border-primary w-7 h-7 rounded-lg"
                    />
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 font-medium">
                    ORD0001
                  </td>
                  <td className="whitespace-nowrap px-6 py-4">bude ayu</td>
                  <td className="whitespace-nowrap px-6 py-4">Hypermart</td>
                  <td className="whitespace-nowrap px-6 py-4">Alvin</td>
                  <td className="whitespace-nowrap px-6 py-4">11/11/2023</td>
                  <td className="whitespace-nowrap px-6 py-4">Rp. 1.230.000</td>
                  <td className="whitespace-nowrap px-6 py-4 text-primary">
                    Menunggu
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}
      {/* {!isVisible3 && (
        <div className="mt-5 bg-gray-200 shadow-2xl rounded-xl">
          <p className="text-2xl ps-5 pt-2 font-semibold text-primary">
            SUB DARMO
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
                <tr className="border-b dark:border-neutral-500">
                  <td className="whitespace-nowrap px-6 py-4">
                    <input
                      type="checkbox"
                      name="selectAll"
                      id="all"
                      className="border-2 border-primary w-7 h-7 rounded-lg"
                    />
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 font-medium">
                    ORD0001
                  </td>
                  <td className="whitespace-nowrap px-6 py-4">bude ayu</td>
                  <td className="whitespace-nowrap px-6 py-4">Hypermart</td>
                  <td className="whitespace-nowrap px-6 py-4">Alvin</td>
                  <td className="whitespace-nowrap px-6 py-4">11/11/2023</td>
                  <td className="whitespace-nowrap px-6 py-4">Rp. 1.230.000</td>
                  <td className="whitespace-nowrap px-6 py-4 text-primary">
                    Menunggu
                  </td>
                </tr>
                <tr className="border-b dark:border-neutral-500">
                  <td className="whitespace-nowrap px-6 py-4">
                    <input
                      type="checkbox"
                      name="selectAll"
                      id="all"
                      className="border-2 border-primary w-7 h-7 rounded-lg"
                    />
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 font-medium">
                    ORD0001
                  </td>
                  <td className="whitespace-nowrap px-6 py-4">bude ayu</td>
                  <td className="whitespace-nowrap px-6 py-4">Hypermart</td>
                  <td className="whitespace-nowrap px-6 py-4">Alvin</td>
                  <td className="whitespace-nowrap px-6 py-4">11/11/2023</td>
                  <td className="whitespace-nowrap px-6 py-4">Rp. 1.230.000</td>
                  <td className="whitespace-nowrap px-6 py-4 text-primary">
                    Menunggu
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}
      {!isVisible2 && (
        <div className="mt-5 bg-gray-200 shadow-2xl rounded-xl">
          <p className="text-2xl ps-5 pt-2 font-semibold text-primary">
            SUB KUTISARI
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
                <tr className="border-b dark:border-neutral-500">
                  <td className="whitespace-nowrap px-6 py-4">
                    <input
                      type="checkbox"
                      name="selectAll"
                      id="all"
                      className="border-2 border-primary w-7 h-7 rounded-lg"
                    />
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 font-medium">
                    ORD0001
                  </td>
                  <td className="whitespace-nowrap px-6 py-4">bude ayu</td>
                  <td className="whitespace-nowrap px-6 py-4">Hypermart</td>
                  <td className="whitespace-nowrap px-6 py-4">Alvin</td>
                  <td className="whitespace-nowrap px-6 py-4">11/11/2023</td>
                  <td className="whitespace-nowrap px-6 py-4">Rp. 1.230.000</td>
                  <td className="whitespace-nowrap px-6 py-4 text-primary">
                    Menunggu
                  </td>
                </tr>
                <tr className="border-b dark:border-neutral-500">
                  <td className="whitespace-nowrap px-6 py-4">
                    <input
                      type="checkbox"
                      name="selectAll"
                      id="all"
                      className="border-2 border-primary w-7 h-7 rounded-lg"
                    />
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 font-medium">
                    ORD0001
                  </td>
                  <td className="whitespace-nowrap px-6 py-4">bude ayu</td>
                  <td className="whitespace-nowrap px-6 py-4">Hypermart</td>
                  <td className="whitespace-nowrap px-6 py-4">Alvin</td>
                  <td className="whitespace-nowrap px-6 py-4">11/11/2023</td>
                  <td className="whitespace-nowrap px-6 py-4">Rp. 1.230.000</td>
                  <td className="whitespace-nowrap px-6 py-4 text-primary">
                    Menunggu
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )} */}
      <div className="prints">
        <div className="m-4">
          <div className="noId flex text-primary text-2xl">
            <button className="w-52 h-14 m-2 items-end bg-primary rounded-xl hover:bg-gray-300 text-white hover:text-primary font-bold py-2 px-4">
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
