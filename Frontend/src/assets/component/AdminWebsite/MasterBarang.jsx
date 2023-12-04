import LogoPerusahaan from "../../images/image-login/icon.png";
import { useState } from "react";
import Joi from "joi";
import { joiResolver } from "@hookform/resolvers/joi";
import FotoModal from "../../images/image-modal/berhasil.png"
import { useForm } from "react-hook-form";
import client from "../../controller/client";
import { useLoaderData } from "react-router";
export default function MasterBrand() {
  let data = useLoaderData();
  const [barang, setBarang] = useState(data.barang);
  const [isTambah, setIsTambah] = useState(true);
  const toggleTambah = () => {
    setIsTambah(!isTambah);
  };
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

  const [isEdit, setIsEdit] = useState(true);
  const toggleEdit = () => {
    setIsEdit(!isEdit);
  };
  const [isStatus, setIsStatus] = useState(null);
  const toggleStatus = () => {
    setIsStatus(!isStatus);
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  async function addBarang(data) {
    await client.post(`/api/barang`, {
      nama_barang: data.nama_barang,
      id_brand: data.brand_id,
      harga_pcs: data.harga_pcs,
      harga_karton: data.harga_karton,
    });
    reset();
    let barang = await client.get(`/api/getListBarang`);
    setBarang(barang.data);
  }

  async function editBarang(id) {
    const nama_barang = document.getElementById(`nama_barang${id}`).value;
    const harga_pcs = document.getElementById(`harga_pcs${id}`).value;
    const harga_karton = document.getElementById(`harga_karton${id}`).value;
    const id_brand = document.getElementById(`id_brand${id}`).value;
    await client.put(`/api/editBarang`, {
      id_barang: id,
      nama_barang: nama_barang,
      harga_pcs: harga_pcs,
      harga_karton: harga_karton,
      id_brand: id_brand,
    });
    let barang = await client.get(`/api/getListBarang`);
    setBarang(barang.data);
    handleOpenModal()
  }

  async function statusBarang(id, status) {
    await client.put(`/api/editStatusBarang`, {
      id_barang: id,
      status_barang: status,
    });
    let barang = await client.get(`/api/getListBarang`);
    setBarang(barang.data);
  }

  async function cari() {
    const keyword = document.getElementById("keyword").value;
    let barang = await client.get(`/api/getListBarang/${keyword}`);
    setBarang(barang.data);
  }
  const handleInputChange = (e, id, field) => {
    const updatedBarang = barang.map((b) =>
      b.id_barang === id ? { ...b, [field]: e.target.value } : b
    );
    setBarang(updatedBarang);
  };

  function formatNumber(number) {
    // Menggunakan fungsi toLocaleString() untuk memformat angka dengan pemisah ribuan
    return number.toLocaleString();
  }
  return (
    <>
      {console.log(barang)}
      <div
        className="cover mt-12 border-2 mb-28 rounded-xl"
        style={{ width: "100%", boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px" }}
      >
        <div className="flex">
          <div className="flex text-primary text-2xl">
            <button
              onClick={toggleTambah}
              className="bg-primary w-60 m-4 h-12 rounded-xl text-2xl text-white hover:bg-gray-300 hover:text-primary font-bold py-2 px-4"
            >
              + Tambah Barang
            </button>
          </div>
          <div className="flex text-primary text-2xl">
            <button
              onClick={toggleMasterBarang}
              className="bg-primary w-60 m-4 h-12 rounded-xl text-2xl text-white hover:bg-gray-300 hover:text-primary font-bold py-2 px-4"
            >
              Master Barang
            </button>
          </div>
        </div>
        <p className="ps-4 pt-1 pb-2 text-md italic text-primary">
          *Hanya boleh memilih satu pilihan
        </p>
        {!isTambah && (
          <div
            className="selectdisable border-2 ms-4 mt-1 mb-4 border-gray-300 rounded-2xl w-1/3 h-full"
            style={{ boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px" }}
          >
            <div className="row ms-4 m-4 w-full">
              <form onSubmit={handleSubmit(addBarang)}>
                <div className="flex text-primary text-2xl">
                  <p className="pt-1 pr-2 w-48">Nama Barang : </p>
                  <input
                    type="text"
                    className="border-primary rounded-lg w-60 text-2xl h-10"
                    placeholder="Nama Barang"
                    required="text"
                    {...register("nama_barang")}
                  />
                </div>
                <div className="flex text-primary mt-3 text-2xl">
                  <p className="pt-1 pr-2 w-48">Brand : </p>
                  <select
                    name="brandId"
                    id="selectIdbrand"
                    className="w-60 border-primary rounded-lg"
                    {...register("brand_id")}
                  >
                    {data.brand.map((brand, idx) => {
                      return (
                        <option value={brand.id_brand}>
                          {brand.nama_brand}
                        </option>
                      );
                    })}
                  </select>
                </div>
                <div className="flex text-primary mt-3 text-2xl">
                  <p className="pt-1 pr-2 w-48">Harga Pcs : </p>
                  <input
                    type="number"
                    name="harga pcs"
                    className="border-primary rounded-lg w-60 text-2xl h-10"
                    placeholder="Harga pcs"
                    required="number"
                    {...register("harga_pcs")}
                  />
                </div>
                <div className="flex text-primary mt-3 text-2xl">
                  <p className="pt-1 pr-2 w-48">Harga Karton : </p>
                  <input
                    type="number"
                    name="harga karton"
                    className="border-primary rounded-lg w-60 text-2xl h-10"
                    placeholder="Harga karton"
                    required="number"
                    {...register("harga_karton")}
                  />
                </div>
                <div className="flex float-right mr-4">
                  <button
                    type="submit"
                    className="bg-primary w-40 m-4 h-14 rounded-xl text-white hover:bg-gray-300 hover:text-primary font-bold py-2 px-4"
                  >
                    Simpan
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
        {!isMasterBarang && (
          <>
            <div className="flex mx-auto items-center justify-center">
              <p className="pt-5 text-4xl font-semibold text-center text-primary">
                Master Barang
              </p>
              <img
                src={LogoPerusahaan}
                className="w-32 h-32 mt-4"
                alt="logo perusahaan"
              />

            </div>
            <div className="cover mb-32">
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
              <div className="covertable m-2">
                <div className="cover mb-28">
                  <div className="covertable m-2">
                    <table
                      className="text-left text-2xl mt-5 font-light border rounded-xl w-full"
                      style={{ boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px" }}
                    >
                      <thead className="border-b font-medium dark:border-neutral-500">
                        <tr>
                          <th scope="col" className="px-6 py-4">
                            Id Barang
                          </th>
                          <th scope="col" className="px-6 py-4">
                            Id Brand
                          </th>
                          <th scope="col" className="px-6 py-4">
                            Nama Barang
                          </th>
                          <th scope="col" className="px-6 py-4">
                            Harga Pcs
                          </th>
                          <th scope="col" className="px-6 py-4">
                            Harga Karton
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
                        {barang.map((b, idx) => {
                          return (
                            <tr
                              key={idx}
                              className="border-b dark:border-neutral-500"
                            >
                              <td className="whitespace-nowrap px-6 py-4 font-medium">
                                <p>{b.id_barang}</p>
                              </td>
                              <td className="whitespace-nowrap px-6 py-4 font-medium">
                                <div>
                                  <select
                                    name="brandId"
                                    id={`id_brand${b.id_barang}`}
                                    className="w-60 text-primary border-primary rounded-lg h-12 text-2xl"
                                  >
                                    {data.brand.map((br, idx) => {
                                      return b.id_brand == br.id_brand ? (
                                        <option
                                          key={idx}
                                          value={br.id_brand}
                                          selected="selected"
                                        >
                                          {br.nama_brand}
                                        </option>
                                      ) : (
                                        <option key={idx} value={br.id_brand}>
                                          {br.nama_brand}
                                        </option>
                                      );
                                    })}
                                  </select>
                                </div>
                              </td>
                              <td className="whitespace-nowrap px-6 py-4">
                                <p>
                                  <input
                                    type="text"
                                    name=""
                                    className="border-primary rounded-lg w-96 text-2xl"
                                    id={`nama_barang${b.id_barang}`}
                                    value={b.nama_barang}
                                    onChange={(e) =>
                                      handleInputChange(
                                        e,
                                        b.id_barang,
                                        "nama_barang"
                                      )
                                    }
                                  />
                                </p>
                              </td>
                              <td className="whitespace-nowrap px-6 py-4">
                                <p className="flex">
                                  <input
                                    type="text"
                                    name=""
                                    className="border-primary rounded-lg text-2xl"
                                    id={`harga_pcs${b.id_barang}`}
                                    value={b.harga_pcs}
                                    onChange={(e) =>
                                      handleInputChange(
                                        e,
                                        b.id_barang,
                                        "harga_pcs"
                                      )
                                    }
                                  />
                                </p>
                              </td>
                              <td className="whitespace-nowrap px-6 py-4">
                                <p>
                                  <input
                                    type="text"
                                    name=""
                                    className="border-primary rounded-lg text-2xl"
                                    id={`harga_karton${b.id_barang}`}
                                    value={b.harga_karton}
                                    onChange={(e) =>
                                      handleInputChange(
                                        e,
                                        b.id_barang,
                                        "harga_karton"
                                      )
                                    }
                                  />
                                </p>
                              </td>
                              <td className="whitespace-nowrap px-6 py-4">
                                <button
                                  onClick={() => editBarang(b.id_barang)}
                                  className="bg-primary w-36 h-12 rounded-xl text-white hover:bg-gray-300 hover:text-primary font-bold py-2 px-4"
                                >
                                  Edit
                                </button>
                              </td>
                              <td className="whitespace-nowrap px-6 py-4">
                                {b.status_barang == 0 ? (
                                  <button
                                    onClick={() => statusBarang(b.id_barang, 1)}
                                    className="bg-primary w-36 h-12 rounded-xl text-white hover:bg-gray-300 hover:text-primary font-bold py-2 px-4"
                                  >
                                    Aktif
                                  </button>
                                ) : (
                                  <button
                                    onClick={() => statusBarang(b.id_barang, 0)}
                                    className="bg-gray-300 w-36 h-12 rounded-xl text-gray-600 hover:bg-gray-300 hover:text-primary font-bold py-2 px-4"
                                  >
                                    Non Aktif
                                  </button>
                                )}
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
      <hr className="h-px my-10 mt-18 mb-24" />
      <div className="cover">
        {isModalOpen && (
          <div className="modal">
            <div className="modal-content h-80 w-96">
              <span className="close" onClick={handleCloseModal}>&times;</span>
              <h2 className="text-center text-2xl">Master Barang</h2>
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
  );
}
