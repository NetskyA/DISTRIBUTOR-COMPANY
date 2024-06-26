import DataTarget from "../../controller/ControlTarget";
import { Radio } from "@material-tailwind/react";
import React, { useEffect, useRef, useState } from "react";
import "datatables.net-dt/css/jquery.dataTables.min.css";
import LogoPrint from "../../images/image-navbar/printer.png";
import { useLoaderData } from "react-router";
import formatter from "../../controller/formatter";
import LogoPerusahaan from "../../images/image-login/icon.png";
import ControlTarget from "../../controller/ControlTarget";
import { data } from "jquery";

export default function ReturnBarang() {
  const dataSupervisor = useLoaderData();
  const [isVisible, setIsVisible] = useState(true);
  const [targetSalesman, setTargetSalesman] = useState(dataSupervisor.target);
  const [dateStart, setDateStart] = useState(null);
  const [dateEnd, setDateEnd] = useState(null);
  const toggleVisibility = () => {
    if (dateStart != null && dateEnd != null) {
      let tempTargetSalesman = [];
      let temp = dataSupervisor.target;
      for (let i = 0; i < temp.length; i++) {
        const t = temp[i];
        const tempDate = t.tanggal_target.split("-");
        const day = tempDate[0].padStart(2,0);
        const month = tempDate[1];
        const year = tempDate[2];
        const result = year + "-" + month + "-" + day;
        if (dateStart <= result && dateEnd >= result) {
          tempTargetSalesman.push(t);
        }
      }
      setTargetSalesman(tempTargetSalesman);
    }
  };

  const extractDate = (id) => {
    const date = document.getElementById(id).value;
    if (date) {
      const tempDate = date.split("-");
      const year = tempDate[0];
      const month = tempDate[1];
      const day = tempDate[2];
      if (id == "dateStart") {
        setDateStart(year + "-" + month + "-" + day);
      } else {
        setDateEnd(year + "-" + month + "-" + day);
      }
    } else {
      if (id == "dateStart") {
        setDateStart();
      } else {
        setDateEnd();
      }
    }
  };

  const Print = () => {
    let printContents = document.getElementById("NotaCetak").innerHTML;
    let originalContents = document.body.innerHTML;
    document.body.innerHTML = printContents;
    window.print();
    document.body.innerHTML = originalContents;
    window.location.reload(false);
  };

  return (
    <>
      {console.log(targetSalesman)}
      <div className="cover selectdisable flex">
        {/* nanti digunakan memanggil nama sesuai akun*/}
        <div className="header lg:w-full md:w-1/2 text-primary text-4xl font-semibold">
          <p>Laporan Target Salesman</p>
        </div>
        <div className="rounded-xl lg:w-1/2 float-right mr-0 mx-auto text-2xl font-semibold">
          <ControlTarget current={dataSupervisor.targetSekarang} target={dataSupervisor.currtarget} />
        </div>
        {/* untuk memanggil function controller target salesman */}
      </div>
      <div
        className="selectdisable border-2 mt-10 border-gray-300 rounded-2xl w-1/3 h-full"
        style={{ boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px" }}
      >
        {/* berisi from retur */}
        <div className="row ms-4 m-4 w-full">
          <div className="flex text-primary text-2xl">
            <p className="pt-1 pr-2">Tanggal Awal : </p>
            <input
              type="date"
              name="date"
              id="dateStart"
              className="border-0 text-2xl h-10"
              required="dates"
              onChange={() => extractDate("dateStart")}
            />
          </div>
          <div className="flex text-primary mt-3 text-2xl">
            <p className="pt-1 pr-2">Tanggal Akhir : </p>
            <input
              type="date"
              name="date"
              id="dateEnd"
              className="border-0 text-2xl h-10"
              required="dates"
              onChange={() => extractDate("dateEnd")}
            />
          </div>
        </div>
        {/* berisi form retur */}
        <div className="items-center justify-center">
          <button
            onClick={() => toggleVisibility()}
            className="bg-primary w-1/4 m-4 h-14 rounded-xl text-white hover:bg-gray-300 hover:text-primary font-bold py-2 px-4"
          >
            Cari
          </button>
        </div>
      </div>
      <p className="pr-2 pt-4 text-md italic text-primary">
        *pastikan memilih tanggal dan user sudah benar
      </p>
      <div
        className="w-full mt-16 mx-auto border-2 rounded-xl"
        style={{ boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px" }}
      >
        {isVisible && (
          <div id="NotaCetak" className="cover m-5">
            <div className="flex mx-auto items-center justify-center">
              <p className="pt-4 text-4xl font-semibold text-center text-primary">
                Laporan Target Salesman
              </p>
              <img
                src={LogoPerusahaan}
                className="w-32 h-32 mt-4"
                alt="logo perusahaan"
              />
            </div>
            <table
              className="text-left text-2xl mt-5 font-light border rounded-xl w-full"
              style={{ boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px" }}
            >
              <thead className="border-b font-medium dark:border-neutral-500">
                <tr>
                  <th scope="col" className="px-6 py-4">
                    Id Salesman
                  </th>
                  <th scope="col" className="px-6 py-4">
                    Nama Salesman
                  </th>
                  <th scope="col" className="px-6 py-4">
                    Kelurahan
                  </th>
                  <th scope="col" className="px-6 py-4">
                    Tanggal
                  </th>
                  <th scope="col" className="px-6 py-4">
                    Target
                  </th>
                  <th scope="col" className="px-6 py-4">
                    Realisasi
                  </th>
                </tr>
              </thead>
              <tbody>
                {targetSalesman.map((t, idx) => {
                  return (
                    <tr key={idx} className="border-b dark:border-neutral-500">
                      <td className="whitespace-nowrap px-6 py-4 font-medium">
                        {t.id_user}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4 font-medium">
                        {t.username}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4 font-medium">
                        {t.kelurahan}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4">
                        {t.tanggal_target}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4">
                        {formatter.format(t.target)}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4 text-red-500">
                        {dataSupervisor.salesman.map((s) => {
                          if (s.id_user == t.id_user) {
                            return formatter.format(s.realisasiTarget)
                          }
                        })}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            <p className="pr-2 pt-4 text-md italic text-primary">
              *perhatikan data laporan sesuai dengan penjulan
            </p>
          </div>
        )}
        <div className="prints">
          <div className="w-full">
            <div className="m-4">
              <div className="noId flex text-primary text-2xl">
                <img src={LogoPrint} className="m-2 w-14 h-14" alt="" />
                <button
                  className="w-52 h-14 m-2 items-end bg-primary rounded-xl hover:bg-gray-300 text-white hover:text-primary font-bold py-2 px-4"
                  onClick={Print}
                >
                  Print
                </button>
              </div>
            </div>
          </div>
        </div>
        <hr className="h-px my-10 mt-18 mb-46" />
      </div>
    </>
  );
}
