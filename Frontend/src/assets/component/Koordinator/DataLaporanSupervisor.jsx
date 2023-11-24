// import DataTarget from "../../controller/ControlTarget"
// import { Radio } from "@material-tailwind/react";
// import React, { useEffect, useRef, useState } from "react";

import "datatables.net-dt/css/jquery.dataTables.min.css";
import LogoPrint from "../../images/image-navbar/printer.png";
import { useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";
import formatter from "../../controller/formatter";

export default function Laporan() {
  const dataKoor = useLoaderData();
  const supervisors = dataKoor.supervisor;
  const salesmans = dataKoor.salesman;
  const targets = dataKoor.target;

  const [refresh, setRefresh] = useState(true);
  const [isVisibleSuper, setIsVisibleSuper] = useState(true);
  const [isVisibleSales, setIsVisibleSales] = useState(false);
  const [dateStart, setDateStart] = useState("-");
  const [dateEnd, setDateEnd] = useState("-");
  const [listSupervisor, setListSupervisor] = useState();
  const [listSalesman, setListSalesman] = useState(salesmans);

  const toggleVisibilitySuper = () => {
    setIsVisibleSuper(!isVisibleSuper);
    if (isVisibleSales == true) {
      setIsVisibleSales(!isVisibleSales);
    }
  };
  const toggleVisibilitySales = () => {
    setIsVisibleSales(!isVisibleSales);
    if (isVisibleSuper == true) {
      setIsVisibleSuper(!isVisibleSuper);
    }
  };

  const forceRefresh = () => {
    setRefresh(!refresh);
  };

  const formatDate = (date) => {
    const temp = date.split("/");
    return temp[0] + "-" + temp[1] + "-" + temp[2];
  };

  const createDate = (date) => {
    const temp = date.split("-");
    temp.reverse();
    const reversed = temp.join("-");
    const newDate = new Date(reversed);
    return newDate;
  };

  useEffect(() => {
    let listSuper = [];
    let listSales = [];

    let dataTarget = [];

    if (dateStart != "-" && dateEnd != "-") {
      dataTarget = targets.filter(
        (t) =>
          createDate(t.tanggal_target) >= createDate(formatDate(dateStart)) &&
          createDate(t.tanggal_target) <= createDate(formatDate(dateEnd))
      );
    } else if (dateStart != "-") {
      dataTarget = targets.filter(
        (t) => createDate(t.tanggal_target) >= createDate(formatDate(dateStart))
      );
    } else if (dateEnd != "-") {
      dataTarget = targets.filter(
        (t) => createDate(t.tanggal_target) <= createDate(formatDate(dateEnd))
      );
    } else if (dateStart == "-" && dateEnd == "-") {
      dataTarget = targets;
    }

    for (let i = 0; i < dataTarget.length; i++) {
      const t = dataTarget[i];

      const supervisor = supervisors.find((s) => s.id_user == t.id_user);
      if (supervisor) {
        listSuper.push({
          id_user: supervisor.id_user,
          username: supervisor.username,
          target: t.target,
          id_target: t.id_target,
          tanggal_target: t.tanggal_target,
        });
      }

      const salesman = salesmans.find((s) => s.id_user == t.id_user);
      if (salesman) {
        listSales.push({
          id_user: salesman.id_user,
          username: salesman.username,
          target: t.target,
          id_target: t.id_target,
          tanggal_target: t.tanggal_target,
        });
      }
    }

    let newSuper = [];

    let trimmedSuper = [];
    for (let i = 0; i < listSuper.length; i++) {
      const tempSuper = listSuper[i];
      trimmedSuper.push(tempSuper.id_user);
    }
    trimmedSuper = [...new Set(trimmedSuper)];

    for (let i = 0; i < trimmedSuper.length; i++) {
      const tempi = targets.find((t) => t.id_user == trimmedSuper[i]);
      console.log(tempi);

      let totalTarget = tempi.target;

      const tempUser = supervisors.find((s) => s.id_user == tempi.id_user);
      const filtered = listSuper.filter(
        (s) => s.id_user == tempi.id_user && s.id_target != tempi.id_target
      );

      for (let j = 0; j < filtered.length; j++) {
        const tempj = filtered[j];
        totalTarget += tempj.target;
      }

      newSuper.push({
        id_user: tempi.id_user,
        id_target: tempi.id_target,
        username: tempUser.username,
        realisasiTarget: tempUser.target_sekarang,
        target: totalTarget,
        tanggal_target: tempi.tanggal_target,
      });
    }

    let newSales = [];

    let trimmedSales = [];
    for (let i = 0; i < listSales.length; i++) {
      const tempSales = listSales[i];
      trimmedSales.push(tempSales.id_user);
    }
    trimmedSales = [...new Set(trimmedSales)];

    for (let i = 0; i < trimmedSales.length; i++) {
      const tempi = targets.find((t) => t.id_user == trimmedSales[i]);

      let totalTarget = tempi.target;

      const tempUser = salesmans.find((s) => s.id_user == tempi.id_user);

      for (let j = 0; j < listSales.length; j++) {
        const tempj = listSales[j];

        if (
          tempi.id_user == tempj.id_user &&
          tempi.id_target != tempj.id_target
        ) {
          totalTarget += tempj.target;
        }
      }

      newSales.push({
        id_user: tempi.id_user,
        id_target: tempi.id_target,
        username: tempUser.username,
        realisasiTarget: tempUser.target_sekarang,
        target: totalTarget,
        tanggal_target: tempi.tanggal_target,
      });
    }
    setListSupervisor(newSuper);
    setListSalesman(newSales);
  }, [dateStart, dateEnd]);

  const Print = () => {
    //console.log('print');
    if (isVisibleSales == true || isVisibleSuper == true) {
      let printContents = "";
      if (isVisibleSuper == true) {
        printContents = document.getElementById("NotaCetakSuper").innerHTML;
      } else if (isVisibleSales == true) {
        printContents = document.getElementById("NotaCetakSales").innerHTML;
      }
      let originalContents = document.body.innerHTML;
      document.body.innerHTML = printContents;
      window.print();
      document.body.innerHTML = originalContents;

      window.location.reload(false);
    }
  };

  const extractDate = (id) => {
    const date = document.getElementById(id).value;

    // console.log(date);
    if (date) {
      const tempDate = date.split("-");
      const year = tempDate[0];
      const month = tempDate[1];
      const day = tempDate[2];
      const result = day + "/" + month + "/" + year;

      if (id == "dateStart") {
        setDateStart(result);
      } else {
        setDateEnd(result);
      }
    } else {
      if (id == "dateStart") {
        setDateStart("-");
      } else {
        setDateEnd("-");
      }
    }

    forceRefresh();
  };

  return (
    <>
      {/* {console.log(targets)} */}
      <div className="cover selectdisable flex">
        {/* nanti digunakan memanggil nama sesuai akun*/}
        <div className="header lg:w-full md:w-1/2 text-primary text-4xl font-semibold">
          <p>Laporan Penjualan Supervisor</p>
        </div>
        <div className="rounded-xl lg:w-1/2 float-right mr-0 mx-auto text-2xl font-semibold">
          {/* <DataTarget /> */}
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
        <div className="flex items-center justify-center">
          <button
            onClick={toggleVisibilitySuper}
            className="bg-primary m-4 w-full h-16 rounded-xl text-white hover:bg-gray-300 hover:text-primary font-bold py-2 px-4"
          >
            Supervisor
          </button>
          <button
            onClick={toggleVisibilitySales}
            className="bg-primary w-full m-4 h-16 rounded-xl text-white hover:bg-gray-300 hover:text-primary font-bold py-2 px-4"
          >
            Salesman
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
        {isVisibleSuper == true && (
          <div id="NotaCetakSuper" className="cover m-5">
            <p className="pt-4 text-4xl font-semibold text-center text-primary">
              Laporan Penjualan Supervisor
            </p>
            <table
              className="text-left text-2xl mt-5 font-light border rounded-xl w-full"
              style={{ boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px" }}
            >
              <thead className="border-b font-medium dark:border-neutral-500">
                <tr>
                  <th scope="col" className="px-6 py-4">
                    Id Supervisor
                  </th>
                  <th scope="col" className="px-6 py-4">
                    Nama Supervisor
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
                {listSupervisor &&
                  listSupervisor.map((s, index) => (
                    <tr
                      key={index}
                      className="border-b dark:border-neutral-500"
                    >
                      <td className="whitespace-nowrap px-6 py-4 font-medium">
                        {s.id_user}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4 font-medium">
                        {s.username}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4">
                        <span>{dateStart}</span>
                        {" - "}
                        <span>{dateEnd}</span>
                      </td>
                      <td className="whitespace-nowrap px-6 py-4">
                        {formatter.format(s.target)}
                      </td>
                      {s.realisasiTarget < s.target ? (
                        <td className="whitespace-nowrap px-6 py-4 text-red-500">
                          {formatter.format(s.realisasiTarget)}
                        </td>
                      ) : (
                        <td className="whitespace-nowrap px-6 py-4 text-green-600">
                          {formatter.format(s.realisasiTarget)}
                        </td>
                      )}
                    </tr>
                  ))}
              </tbody>
            </table>
            <p className="pr-2 pt-4 text-md italic text-primary">
              *perhatikan data laporan sesuai dengan penjulan
            </p>
          </div>
        )}

        {isVisibleSales == true && (
          <div id="NotaCetakSales" className="cover m-5">
            <p className="pt-4 text-4xl font-semibold text-center text-primary">
              Laporan Penjualan Salesman
            </p>
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
                {listSalesman &&
                  listSalesman.map((s, index) => (
                    <tr
                      key={index}
                      className="border-b dark:border-neutral-500"
                    >
                      <td className="whitespace-nowrap px-6 py-4 font-medium">
                        {s.id_user}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4 font-medium">
                        {s.username}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4">
                        <span>{dateStart}</span>
                        {" - "}
                        <span>{dateEnd}</span>
                      </td>
                      <td className="whitespace-nowrap px-6 py-4">
                        {formatter.format(s.target)}
                      </td>
                      {s.realisasiTarget < s.target ? (
                        <td className="whitespace-nowrap px-6 py-4 text-red-500">
                          {formatter.format(s.realisasiTarget)}
                        </td>
                      ) : (
                        <td className="whitespace-nowrap px-6 py-4 text-green-600">
                          {formatter.format(s.realisasiTarget)}
                        </td>
                      )}
                    </tr>
                  ))}
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
              <div className="noId flex text-primary text-2xl" onClick={Print}>
                <img src={LogoPrint} className="m-2 w-14 h-14" alt="" />
                <button className="w-52 h-14 m-2 items-end bg-primary rounded-xl hover:bg-gray-300 text-white hover:text-primary font-bold py-2 px-4">
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
