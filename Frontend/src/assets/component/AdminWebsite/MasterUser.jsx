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
import client from "../../controller/client";
import FotoModal from "../../images/image-modal/berhasil.png"

export default function MasterJabatan() {
  let data = useLoaderData();
  const [user, setUser] = useState(data.user);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  const [isMasterBarang, setIsMasterBarang] = useState(true);
  const toggleMasterBarang = () => {
    setIsMasterBarang(!isMasterBarang);
  };

  async function statusUser(id, status) {
    await client.put(`/api/editStatusUser`, {
      id_user: id,
      status_user: status,
    });
    let user = await client.get(`/api/user`);
    setUser(user.data);
  }

  async function editUser(id) {
    // const id_jabatan = document.getElementById(`id_jabatan${id}`).value;
    // const id_atasan = document.getElementById(`id_atasan${id}`).value;
    // const username = document.getElementById(`username${id}`).value;
    // let email = document.getElementById(`email${id}`).value;
    // let password = document.getElementById(`password${id}`).value;
    // let alamat = document.getElementById(`alamat${id}`).value;
    // let no_rekening = document.getElementById(`no_rekening${id}`).value;

    // await client.put(`/api/editUser`, {
    //   id_user: id,
    //   id_jabatan: id_jabatan,
    //   id_atasan: id_atasan,
    //   username: username,
    //   email: email,
    //   password: password,
    //   alamat: alamat,
    //   no_rekening: no_rekening,
    // });

    // let user = await client.get(`/api/user`);
    // setUser(user.data);
    handleOpenModal()
  }

  async function cari() {
    let keyword = document.getElementById("keyword").value;
    let user = await client.get(`/api/user/${keyword}`);
    setUser(user.data);
  }

  const handleInputChange = (e, id, field) => {
    const updatedUser = user.map((u) =>
      u.id_user === id ? { ...u, [field]: e.target.value } : u
    );
    setUser(updatedUser);
  };

  const jabatan = (e, id) => {
    let currValue = e.target.value;
    var outletOptions = document.querySelector(`#id_atasan${id}`);
    Array.from(outletOptions).forEach((option) => {
      outletOptions.removeChild(option)
    })
    if (currValue == 1 || currValue == 2) {
      currValue++;
      let listAtasan = user.filter(e => e.id_jabatan === parseInt(currValue));
      listAtasan.map((optionData) => {
        var opt = document.createElement('option')
        opt.appendChild(document.createTextNode(optionData.username));
        opt.value = optionData.id_user
        outletOptions.appendChild(opt);
      })
    }
    else {
      var opt = document.createElement('option')
      opt.appendChild(document.createTextNode(""));
      opt.value = 0
      outletOptions.appendChild(opt);
    }



  }
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
              <p className="pt-5 text-4xl font-semibold text-center text-primary">Master User</p>
              <img src={LogoPerusahaan} className="w-32 h-32 mt-4" alt="logo perusahaan" />
            </div>
            <div className="cover mb-28">
              <p className="text-primary text-2xl pt-1 ps-4">Search :</p>
              <div className="flex ms-4">
                <input
                  type="text"
                  id="keyword"
                  className="border-primary text-xl rounded-lg"
                  onChange={() => cari()}
                />
                <button
                  className="bg-primary ms-3 w-40 h-12 rounded-xl text-white hover:bg-gray-300 hover:text-primary font-bold py-2 px-4"
                  onClick={() => cari()}
                >
                  Cari
                </button>
              </div>
              <div className="covertable m-4">
                <div className="cover mb-28">
                  <div className="covertable w-full">
                    <table className="text-left text-2xl mt-5 font-light border rounded-xl w-full" style={{ boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px" }}>
                      <thead className="border-b font-medium dark:border-neutral-500">
                        <tr>
                          <th scope="col" className="px-6 py-4 text-xl">
                            Jabatan
                          </th>
                          <th scope="col" className="px-6 py-4 text-xl">
                            Atasan
                          </th>
                          <th scope="col" className="px-6 py-4 text-xl">
                            Email
                          </th>
                          <th scope="col" className="px-6 py-4 text-xl">
                            username
                          </th>
                          <th scope="col" className="px-6 py-4 text-xl">
                            password
                          </th>
                          <th scope="col" className="px-6 py-4 text-xl">
                            Alamat
                          </th>
                          <th scope="col" className="px-6 py-4 text-xl">
                            No rekening
                          </th>
                          <th scope="col" className="px-6 py-4 text-xl">
                            Edit
                          </th>
                          <th scope="col" className="px-6 py-4 text-xl">
                            Status
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {user.map((u) => {
                          return (
                            <>
                              <tr key={u.id_user} className="border-b dark:border-neutral-500">
                                <td className="whitespace-nowrap px-6 py-4 font-medium">
                                  <div>
                                    <select
                                      name="jabatan"
                                      id={`id_jabatan${u.id_user}`}
                                      className="w-44 text-primary border-primary rounded-lg h-12 text-xl"
                                      onChange={(e) => jabatan(e, u.id_user)}
                                    >
                                      {data.jabatan.map((j, idx) => {
                                        return u.id_jabatan == j.id_jabatan ? (
                                          <option
                                            key={idx}
                                            value={j.id_jabatan}
                                            selected="selected"

                                          >
                                            {j.nama_jabatan}
                                          </option>
                                        ) : (
                                          <option key={idx} value={j.id_jabatan}>
                                            {j.nama_jabatan}
                                          </option>
                                        );
                                      })}
                                    </select>
                                  </div>
                                </td>
                                <td className="whitespace-nowrap px-6 py-4 font-medium">
                                  <div>
                                    <select
                                      name="atasan"
                                      id={`id_atasan${u.id_user}`}
                                      className="w-44 text-primary border-primary rounded-lg h-12 text-xl"
                                    >
                                      {user.map((a, idx) => {
                                        return (a.id_user == u.id_atasan) ? (
                                          <option
                                            key={idx}
                                            value={a.id_user}
                                            selected="selected"
                                          >
                                            {a.username}
                                          </option>
                                        ) : ((u.id_jabatan + 1 == a.id_jabatan) && (u.id_jabatan + 1 <= 3 && u.id_jabatan !== 0)) && (
                                          <option key={idx} value={a.id_user}>
                                            {a.username}
                                          </option>
                                        );
                                      })}
                                    </select>
                                  </div>
                                </td>
                                <td className="whitespace-nowrap px-6 py-4">
                                  <p>
                                    <input type="text" name="" className="border-primary w-72 rounded-lg text-xl" id={`email${u.id_user}`}
                                      value={u.email}
                                      onChange={(e) =>
                                        handleInputChange(
                                          e,
                                          u.id_user,
                                          "email"
                                        )
                                      } />
                                  </p>
                                </td>
                                <td className="whitespace-nowrap px-6 py-4">
                                  <p>
                                    <input type="text" name="" className="border-primary w-44 rounded-lg text-xl" id={`username${u.id_user}`}
                                      value={u.username}
                                      onChange={(e) =>
                                        handleInputChange(
                                          e,
                                          u.id_user,
                                          "username"
                                        )
                                      } />
                                  </p>
                                </td>
                                <td className="whitespace-nowrap px-6 py-4">
                                  <p>
                                    <input type="text" name="" className="border-primary w-36 rounded-lg text-xl" id={`password${u.id_user}`}
                                      value={u.password}
                                      onChange={(e) =>
                                        handleInputChange(
                                          e,
                                          u.id_user,
                                          "password"
                                        )
                                      } />
                                  </p>
                                </td>
                                <td className="whitespace-nowrap px-6 py-4">
                                  <p>
                                    <textarea type="text" name="" className="border-primary h-28 rounded-lg text-xl" id={`alamat${u.id_user}`}
                                      value={u.alamat}
                                      onChange={(e) =>
                                        handleInputChange(
                                          e,
                                          u.id_user,
                                          "alamat"
                                        )
                                      } />
                                  </p>
                                </td>
                                <td className="whitespace-nowrap px-6 py-4">
                                  <p>
                                    <input type="text" name="" className="border-primary w-40 rounded-lg text-xl" id={`no_rekening${u.id_user}`}
                                      value={u.no_rekening}
                                      onChange={(e) =>
                                        handleInputChange(
                                          e,
                                          u.id_user,
                                          "no_rekening"
                                        )
                                      } />
                                  </p>
                                </td>
                                <td className="whitespace-nowrap px-6 py-4">
                                  <button onClick={() => editUser(u.id_user)} className="bg-primary w-32 h-12 rounded-xl text-white hover:bg-gray-300 hover:text-primary font-bold py-2 px-4">
                                    Edit
                                  </button>
                                </td>
                                <td className="whitespace-nowrap px-6 py-4">
                                  {u.status_user == 0 ? (
                                    <button
                                      onClick={() => statusUser(u.id_user, 1)}
                                      className="bg-primary w-36 h-12 rounded-xl text-white hover:bg-gray-300 hover:text-primary font-bold py-2 px-4"
                                    >
                                      Aktif
                                    </button>
                                  ) : (
                                    <button
                                      onClick={() => statusUser(u.id_user, 0)}
                                      className="bg-gray-300 w-36 h-12 rounded-xl text-gray-600 hover:bg-gray-300 hover:text-primary font-bold py-2 px-4"
                                    >
                                      Non Aktif
                                    </button>
                                  )}
                                </td>
                              </tr>
                            </>
                          )
                        })}
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
      <div className="cover">
        {isModalOpen && (
          <div className="modal">
            <div className="modal-content h-80 w-96">
              <span className="close" onClick={handleCloseModal}>&times;</span>
              <h2 className="text-center text-2xl">Master User</h2>
              <h2 className="text-center text-2xl">Berhasil Diupdate</h2>
              <img src={FotoModal} alt="" className="w-24 mx-auto m-6 h-24" />
              <div className="flex items-center mx-auto justify-center">
                <button className="bg-primary hover:bg-gray-400 m-1 w-36 rounded-lg" onClick={handleCloseModal}>
                  <p className="text-2xl p-2">
                    Ok
                  </p>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  )
}