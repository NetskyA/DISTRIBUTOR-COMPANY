/* eslint-disable*/
import DataTarget from "../../controller/ControlTarget";
import { Radio } from "@material-tailwind/react";
import React, { useEffect, useRef, useState } from "react";
import dataSet from "../../component/Salesman/DataRetur";
import "datatables.net-dt/css/jquery.dataTables.min.css";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
} from "@nextui-org/react";
import $ from "jquery";
import { useLoaderData } from "react-router-dom";
import formatter from "../../controller/formatter";
import client from "../../controller/client";

export default function Table() {
  const dataKoor = useLoaderData();
  const supervisors = dataKoor.supervisor;
  const listKota = dataKoor.kota;

  const [submit, setSubmit] = useState(false);
  const [refresh, setRefresh] = useState(true);
  const [dataSupervisor, setDataSupervisor] = useState(supervisors);

  useEffect(() => {
    // Disable text selection for elements
    // with class "no-select"
    const noSelectElements = document.querySelectorAll(".selectdisable");
    noSelectElements.forEach((element) => {
      element.style.webkitUserSelect = "none";
      element.style.mozUserSelect = "none";
      element.style.msUserSelect = "none";
      element.style.userSelect = "none";
    });

    setDataSupervisor(supervisors);
  }, []);

  useEffect(() => {
    setDataSupervisor(supervisors);
    setRefresh(!refresh);
  }, [supervisors]);

  const updateDB = async () => {
    for (let i = 0; i < dataSupervisor.length; i++) {
      const supervisor = dataSupervisor[i];

      // console.log(supervisor);

      let insert = await client.post(`/api/target/`, {
        id_user: supervisor.id_user,
        id_wilayah: supervisor.id_wilayah,
        target: supervisor.targetTerakhir,
      });

      //   console.log(update);
    }
  };

  useEffect(() => {
    setRefresh(!refresh);
    if (submit == true) {
      updateDB();
      setSubmit(false);
    }
  }, [dataSupervisor]);

  const handleTarget = () => {
    alert("Submit");

    const inputKota = document.getElementsByName("inputKota");

    let tempKota = [];
    inputKota.forEach((kota) => {
      tempKota.push(kota.value);
    });

    const inputTarget = document.getElementsByName("inputTarget");

    let tempTarget = [];
    inputTarget.forEach((target) => {
      tempTarget.push(target.value);
    });

    let newSupervisor = [];

    for (let i = 0; i < dataSupervisor.length; i++) {
      const supervisor = dataSupervisor[i];

      const newData = {
        id_user: supervisor.id_user,
        id_target: supervisor.id_target,
        id_wilayah: tempKota[i],
        username: supervisor.username,
        targetTerakhir: tempTarget[i],
        realisasiTarget: supervisor.realisasiTarget,
      };

      newSupervisor.push(newData);
    }

    // console.log(newSupervisor);

    setDataSupervisor(newSupervisor);
    setSubmit(true);
  };

  return (
    //PROFILE SALESMAN
    <>
      <div className="cover selectdisable flex">
        {/* nanti digunakan memanggil nama sesuai akun*/}
        <div className="header lg:w-full md:w-1/2 text-primary text-4xl font-semibold">
          <p>Target Supervisor</p>
        </div>
        <div className="rounded-xl lg:w-1/2 float-right mr-0 mx-auto text-2xl font-semibold">
          {/* <DataTarget /> */}
        </div>
        {/* untuk memanggil function controller target salesman */}
      </div>
      <div
        className="cover mt-12 border-2 mb-16 rounded-xl"
        style={{ width: "100%", boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px" }}
      >
        <p className="pt-8 text-4xl font-semibold text-center text-primary">
          Data Target
        </p>
        <div className="cover m-2 mt-5">
          <table
            className="text-left text-2xl font-light border rounded-xl w-full"
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
                  Wilayah
                </th>
                <th scope="col" className="px-6 py-4">
                  Target Terakhir
                </th>
                <th scope="col" className="px-6 py-4">
                  Realisasi Target
                </th>
                <th scope="col" className="px-6 py-4">
                  Target
                </th>
              </tr>
            </thead>
            <tbody>
              {dataSupervisor &&
                dataSupervisor.map((s) => (
                  <tr
                    key={s.id_user}
                    className="border-b dark:border-neutral-500"
                  >
                    <td className="whitespace-nowrap px-6 py-4 font-medium">
                      {s.id_user}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 font-medium">
                      {s.username}
                    </td>
                    <td>
                      <select
                        name="inputKota"
                        className="whitespace-nowrap border-0 h-16 mt-2 px-6 py-4 font-medium"
                        defaultValue={s.id_wilayah}
                      >
                        {listKota &&
                          listKota.map((k) => (
                            <option
                              key={k.id_kota}
                              value={k.id_kota}
                              className="h-12"
                            >
                              {k.nama_kota}
                            </option>
                          ))}
                      </select>
                    </td>
                    <td className="whitespace-nowrap px-6 py-4">
                      {formatter.format(s.targetTerakhir)}
                    </td>
                    {s.realisasiTarget < s.targetTerakhir ? (
                      <td className="whitespace-nowrap px-6 py-4 text-red-600">
                        {formatter.format(s.realisasiTarget)}
                      </td>
                    ) : (
                      <td className="whitespace-nowrap px-6 py-4 text-green-600">
                        {formatter.format(s.realisasiTarget)}
                      </td>
                    )}

                    <td className="whitespace-nowrap px-6 py-4 text-primary">
                      <input
                        name="inputTarget"
                        type="number"
                        className="text-2xl text-primary border-0 bg-gray-200 rounded-lg"
                        // placeholder="0"
                        defaultValue={s.targetTerakhir}
                        min={0}
                      />
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="flex mb-10">
        <div className="w w-full mb-5">
          <p className="pr-2 pt-4 text-md italic text-primary">
            *Pastikan data sama dengan perhitungan laporan !!!
          </p>
        </div>
        <div className="w w-52 ms-14 mb-5 float-right">
          <button
            className="bg-primary w-52 h-16 rounded-xl text-white hover:bg-gray-300 hover:text-primary font-bold py-2 px-4"
            onClick={handleTarget}
          >
            Submit
          </button>
        </div>
      </div>
      <hr className="h-px my-8 rounded-xl bg-gray-400 border" />
      {/* <DataDetailHistori/> */}
      {/* <hr className="h-px my-8 mt-10 mb-10 rounded-xl bg-gray-400 border" /> */}
    </>
  );
}
