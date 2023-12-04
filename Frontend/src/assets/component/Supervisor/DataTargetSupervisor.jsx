/* eslint-disable*/
import DataTarget from "../../controller/ControlTarget";
import { Radio } from "@material-tailwind/react";
import React, { useEffect, useRef, useState } from "react";
import dataSet from "../Salesman/DataRetur";
import "datatables.net-dt/css/jquery.dataTables.min.css";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
} from "@nextui-org/react";
import $ from "jquery";
import { useLoaderData, useNavigate } from "react-router";
import { joiResolver } from "@hookform/resolvers/joi";
import { useForm } from "react-hook-form";
import formatter from "../../controller/formatter";
import client from "../../controller/client";
import ControlTarget from "../../controller/ControlTarget";
export default function Table() {
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
  }, []);

  const navigate = useNavigate();
  const [reload, setReload] = useState(true);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const dataSupervisor = useLoaderData();

  console.log(dataSupervisor);

  async function submit() {
    const inputKelurahan = document.getElementsByName("inputKelurahan");

    let tempKelurahan = [];
    inputKelurahan.forEach((k) => {
      tempKelurahan.push(k.value);
    });

    const inputTarget = document.getElementsByName("inputTarget");

    let tempTarget = [];
    inputTarget.forEach((target) => {
      tempTarget.push(target.value);
    });

    for (let i = 0; i < dataSupervisor.salesman.length; i++) {
      const salesman = dataSupervisor.salesman[i];

      await client.post(`/api/target/`, {
        id_user: salesman.id_user,
        id_wilayah: tempKelurahan[i],
        target: tempTarget[i],
      });
    }
    // setReload(!reload);
    navigate("/Supervisor/Target");
  }

  return (
    //PROFILE SALESMAN
    <>
      {/* {console.log(dataSupervisor)} */}
      <div className="cover selectdisable flex">
        {/* nanti digunakan memanggil nama sesuai akun*/}
        <div className="header lg:w-full md:w-1/2 text-primary text-4xl font-semibold">
          <p>Target Salesman</p>
        </div>
        <div className="rounded-xl lg:w-1/2 float-right mr-0 mx-auto text-2xl font-semibold">
          <ControlTarget
            current={dataSupervisor.targetSekarang}
            target={dataSupervisor.currtarget}
          />
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
                  Id Salesman
                </th>
                <th scope="col" className="px-6 py-4">
                  Nama Salesman
                </th>
                <th scope="col" className="px-6 py-4">
                  Kelurahan
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
              {dataSupervisor.salesman.map((s, idx) => {
                return (
                  <tr key={idx} className="border-b dark:border-neutral-500">
                    <td className="whitespace-nowrap px-6 py-4 font-medium">
                      {s.id_user}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 font-medium">
                      {s.username}
                    </td>
                    <select
                      name="inputKelurahan"
                      className="whitespace-nowrap border-0 h-16 mt-2 px-6 py-4 font-medium"
                    >
                      {dataSupervisor.kelurahan.map((k, idx) => {
                        return (
                          <option
                            key={idx}
                            value={k.id_kelurahan}
                            className="h-12"
                          >
                            {k.nama_kelurahan}
                          </option>
                        );
                      })}
                    </select>
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
                        min={0}
                        defaultValue={s.targetTerakhir}
                      />
                    </td>
                  </tr>
                );
              })}
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
            onClick={() => submit()}
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
