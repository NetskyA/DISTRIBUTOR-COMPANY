import { useEffect, useRef } from "react";
import { useLoaderData } from "react-router-dom";
import { useState } from "react";
import "datatables.net";
import "datatables.net-buttons";
import "datatables.net-buttons-dt";
import "datatables.net-buttons-dt/css/buttons.dataTables.min.css";
import "datatables.net-buttons/js/buttons.html5.min.js";
import "datatables.net-buttons/js/buttons.print.min.js";
import LogoPerusahaan from "../../images/image-login/icon.png"

export default function MasterJabatan() {
  // let data = useLoaderData();
  // let table;
  // let jabatan = [{ id: 1, nama: "Jabatan 1" }, { id: 2, nama: "Jabatan 2" }, { id: 3, nama: "Jabatan 3" }];
  const [isMasterBarang, setIsMasterBarang] = useState(true);
  const toggleMasterBarang = () => {
    setIsMasterBarang(!isMasterBarang);
  };

  return (
    <>
      <div className="cover mt-12 border-2 mb-28 rounded-xl" style={{ width: "100%", boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px" }}>
        <div className="flex">
          <div className="flex text-primary text-2xl">
            <button onClick={toggleMasterBarang} className="bg-primary w-60 m-4 h-12 rounded-xl text-2xl text-white hover:bg-gray-300 hover:text-primary font-bold py-2 px-4">
              Master User
            </button>
          </div>
        </div>
        {!isMasterBarang &&
          <>
            <div className="flex mx-auto items-center justify-center">
              <p className="pt-5 text-4xl font-semibold text-center text-primary">Master Detail Barang</p>
              <img src={LogoPerusahaan} className="w-32 h-32 mt-4" alt="logo perusahaan" />
            </div>
            <div className="cover mb-28">
              <p className="text-primary text-2xl pt-1 ps-4">Search :</p>
              <div className="flex ms-4">
                <input type="text" className="border-primary text-xl rounded-lg" />
                <button className="bg-primary ms-3 w-40 h-12 rounded-xl text-white hover:bg-gray-300 hover:text-primary font-bold py-2 px-4">
                  Cari
                </button>
              </div>
              <div className="covertable m-2">
                <div className="cover mb-28">
                  <div className="covertable m-2 w-full">
                    <table className="text-left text-2xl mt-5 font-light border rounded-xl w-full" style={{ boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px" }}>
                      <thead className="border-b font-medium dark:border-neutral-500">
                        <tr>
                          <th scope="col" className="px-6 py-4">
                            Jabatan
                          </th>
                          <th scope="col" className="px-6 py-4">
                            Atasan
                          </th>
                          <th scope="col" className="px-6 py-4">
                            Email
                          </th>
                          <th scope="col" className="px-6 py-4">
                            username
                          </th>
                          <th scope="col" className="px-6 py-4">
                            password
                          </th>
                          <th scope="col" className="px-6 py-4">
                            Alamat
                          </th>
                          <th scope="col" className="px-6 py-4">
                            No rekening
                          </th>
                          <th scope="col" className="px-6 py-4">
                            Edit
                          </th>
                          <th scope="col" className="px-6 py-4">
                            Status
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b dark:border-neutral-500">
                          <td className="whitespace-nowrap px-6 py-4 font-medium">
                            <div>
                              <select name="brandId" className=" text-primary w-52 border-primary rounded-lg h-12 text-2xl">
                              </select>
                            </div>
                          </td>
                          <td className="whitespace-nowrap px-6 py-4 font-medium">
                            <div>
                              <select name="brandId" className=" text-primary w-52 border-primary rounded-lg h-12 text-2xl"   >
                              </select>
                            </div>
                          </td>
                          <td className="whitespace-nowrap px-6 py-4">
                            <p>
                              <input type="text" name="" className="border-primary w-52 rounded-lg text-2xl" />
                            </p>
                          </td>
                          <td className="whitespace-nowrap px-6 py-4">
                            <p>
                              <input type="text" name="" className="border-primary w-52 rounded-lg text-2xl"
                              />
                            </p>
                          </td>
                          <td className="whitespace-nowrap px-6 py-4">
                            <p>
                              <input type="text" name="" className="border-primary w-52 rounded-lg text-2xl"
                              />
                            </p>
                          </td>
                          <td className="whitespace-nowrap px-6 py-4">
                            <p>
                              <input type="text" name="" className="border-primary w-52 rounded-lg text-2xl"
                              />
                            </p>
                          </td>
                          <td className="whitespace-nowrap px-6 py-4">
                            <p>
                              <input type="text" name="" className="border-primary w-52 rounded-lg text-2xl"
                              />
                            </p>
                          </td>
                          <td className="whitespace-nowrap px-6 py-4">
                            <button className="bg-primary w-36 h-12 rounded-xl text-white hover:bg-gray-300 hover:text-primary font-bold py-2 px-4">
                              Edit
                            </button>
                          </td>
                          <td className="whitespace-nowrap px-6 py-4">
                            <button className="bg-gray-300 w-36 h-12 rounded-xl text-gray-600 hover:bg-gray-300 hover:text-primary font-bold py-2 px-4">
                              Non Aktif
                            </button>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </>
        }
      </div>
      <hr className="h-px my-10 mt-18 mb-24" />
    </>
  )
}