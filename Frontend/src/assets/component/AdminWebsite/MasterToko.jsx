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
import { useForm } from "react-hook-form";
import client from "../../controller/client";
import FotoModal from "../../images/image-modal/berhasil.png"

export default function MasterJabatan() {
    let data = useLoaderData();
    const [toko, setToko] = useState(data.toko);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleOpenModal = () => {
        setIsModalOpen(true);
    };
    const handleCloseModal = () => {
        setIsModalOpen(false);
    };
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();

    const [isTambah, setIsTambah] = useState(true);
    const toggleTambah = () => {
        setIsTambah(!isTambah);
    }
    const [isMasterToko, setIsMasterToko] = useState(false);
    const toggleMasterToko = () => {
        setIsMasterToko(!isMasterToko);
    }

    async function addToko(data) {
        await client.post(`/api/toko`, {
            id_kelurahan: data.id_kelurahan,
            nama_toko: data.nama_toko,
            nama_konsumen: data.nama_konsumen,
            alamat_toko: data.alamat_toko,
            no_handphone1: data.no_handphone1,
            no_handphone2: data.no_handphone2,
        });
        reset();
        let toko = await client.get(`/api/toko`);
        setToko(toko.data);
    }

    async function editToko(id) {
        const nama_toko = document.getElementById(`nama_toko${id}`).value;
        const id_kelurahan = document.getElementById(`id_kelurahan${id}`).value;
        const nama_konsumen = document.getElementById(`nama_konsumen${id}`).value;
        let alamat_toko = document.getElementById(`alamat_toko${id}`).value;
        let no_handphone1 = document.getElementById(`no_handphone1${id}`).value;
        let no_handphone2 = document.getElementById(`no_handphone2${id}`).value;

        await client.put(`/api/editToko`, {
            id_toko: id,
            nama_toko: nama_toko,
            id_kelurahan: id_kelurahan,
            nama_konsumen: nama_konsumen,
            alamat_toko: alamat_toko,
            no_handphone1: no_handphone1,
            no_handphone2: no_handphone2,
        });

        let toko = await client.get(`/api/toko`);
        setToko(toko.data);
        handleOpenModal()
    }

    async function statusToko(id, status) {
        await client.put(`/api/editStatusToko`, {
            id_toko: id,
            status_toko: status,
        });
        let toko = await client.get(`/api/toko`);
        setToko(toko.data);
    }

    async function cari() {
        let keyword = document.getElementById("keyword").value;
        let toko = await client.get(`/api/toko/${keyword}`);
        setToko(toko.data);
    }

    const handleInputChange = (e, id, field) => {
        const updatedToko = toko.map((t) =>
            t.id_toko === id ? { ...t, [field]: e.target.value } : t
        );
        setToko(updatedToko);
    };

    return (
        <>
            {console.log(toko)}
            <div className="cover mt-12 border-2 mb-28 rounded-xl" style={{ width: "100%", boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px" }}>
                <div className="flex">
                    <div className="flex text-primary text-2xl">
                        <button onClick={toggleTambah} className="bg-primary w-60 m-4 h-12 rounded-xl text-2xl text-white hover:bg-gray-300 hover:text-primary font-bold py-2 px-4">
                            +
                            Tambah Toko
                        </button>
                    </div>
                    <div className="flex text-primary text-2xl">
                        <button onClick={toggleMasterToko} className="bg-primary w-60 m-4 h-12 rounded-xl text-2xl text-white hover:bg-gray-300 hover:text-primary font-bold py-2 px-4">
                            Master Toko
                        </button>
                    </div>
                </div>
                <p className="ps-4 pt-1 pb-2 text-md italic text-primary">
                    *Hanya boleh memilih satu pilihan
                </p>
                {!isTambah &&
                    <div className="selectdisable border-2 ms-4 mt-1 mb-4 border-gray-300 rounded-2xl w-1/3 h-full" style={{ boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px" }}>
                        <div className="row ms-4 m-4 w-full" >
                            <form onSubmit={handleSubmit(addToko)}>
                                <div className="flex text-primary text-2xl">
                                    <p className="pt-1 pr-2 w-52">Nama Toko: </p>
                                    <input
                                        type="text"
                                        name="Nama Toko"
                                        className="border-primary rounded-lg w-60 text-2xl h-10"
                                        placeholder="Nama Toko"
                                        required="text" {...register("nama_toko")} />
                                </div>
                                <div className="flex text-primary mt-3 text-2xl">
                                    <p className="pt-2 pr-2 w-52">Nama Kelurahan : </p>
                                    <select name="brandId" id="selectIdbarang" className="w-60 text-primary border-primary rounded-lg h-12 text-2xl" {...register("id_kelurahan")}>
                                        {data.kelurahan.map((k) => {
                                            return <option value={k.id_kelurahan}>{k.nama_kelurahan}</option>
                                        })}
                                    </select>
                                </div>
                                <div className="flex text-primary mt-3 text-2xl">
                                    <p className="pt-1 pr-2 w-52">Nama Konsumen: </p>
                                    <input
                                        type="text"
                                        name="Nama Konsumen"
                                        className="border-primary rounded-lg w-60 text-2xl h-10"
                                        placeholder="Nama Konsumen"
                                        required="text" {...register("nama_konsumen")} />
                                </div>
                                <div className="flex text-primary mt-3 text-2xl">
                                    <p className="pt-1 pr-2 w-52">Alamat Toko: </p>
                                    <input
                                        type="text"
                                        name="Alamat Toko"
                                        className="border-primary rounded-lg w-60 text-2xl h-10"
                                        placeholder="Alamat Toko"
                                        required="text" {...register("alamat_toko")} />
                                </div>
                                <div className="flex text-primary mt-3 text-2xl">
                                    <p className="pt-1 pr-2 w-52">No Handphone 1: </p>
                                    <input
                                        type="number"
                                        name="No Handphone 1"
                                        className="border-primary rounded-lg w-60 text-2xl h-10"
                                        placeholder="No Handphone 1"
                                        required="number" {...register("no_handphone1")} />
                                </div>
                                <div className="flex text-primary mt-3 text-2xl">
                                    <p className="pt-1 pr-2 w-52">No Handphone 2: </p>
                                    <input
                                        type="number"
                                        name="No Handphone 2"
                                        className="border-primary rounded-lg w-60 text-2xl h-10"
                                        placeholder="No Handphone 2"
                                        required="number" {...register("no_handphone2")} />
                                </div>
                                <div className="flex float-right mt-3 mr-4">
                                    <button type="submit" className="bg-primary w-40 m-4 h-14 rounded-xl text-white hover:bg-gray-300 hover:text-primary font-bold py-2 px-4">
                                        Simpan
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                }{isMasterToko &&
                    <>
                        <div className="flex mx-auto items-center justify-center">
                            <p className="pt-5 text-4xl font-semibold text-center text-primary">Master Toko</p>
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
                                                    <th scope="col" className="px-4 w-18 text-xl">
                                                        Id Toko
                                                    </th>
                                                    <th scope="col" className="px-6 py-4 text-xl">
                                                        Kelurahan
                                                    </th>
                                                    <th scope="col" className="px-6 py-4 text-xl ">
                                                        Nama Toko
                                                    </th>
                                                    <th scope="col" className="px-6 py-4 text-xl">
                                                        Nama Konsumen
                                                    </th>
                                                    <th scope="col" className="px-6 py-4 text-xl">
                                                        Alamat
                                                    </th>
                                                    <th scope="col" className="px-6 py-4 text-xl">
                                                        No Handphone 1
                                                    </th>
                                                    <th scope="col" className="px-6 py-4 text-xl">
                                                        No Handphone 2
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
                                                {toko.map((t) => {
                                                    return (
                                                        <>
                                                            <tr className="border-b dark:border-neutral-500">
                                                                <td className="whitespace-nowrap px-6 py-4 font-medium">
                                                                    <div>
                                                                        <p>
                                                                            {t.id_toko}
                                                                        </p>
                                                                    </div>
                                                                </td>
                                                                <td className="whitespace-nowrap px-6 py-4 font-medium">
                                                                    <div>
                                                                        <select
                                                                            name="kelurahan"
                                                                            id={`id_kelurahan${t.id_toko}`}
                                                                            className="w-36 text-primary border-primary rounded-lg h-12 text-xl"
                                                                        >
                                                                            {data.kelurahan.map((k, idx) => {
                                                                                return t.id_kelurahan == k.id_kelurahan ? (
                                                                                    <option
                                                                                        key={idx}
                                                                                        value={k.id_kelurahan}
                                                                                        selected="selected"
                                                                                    >
                                                                                        {k.nama_kelurahan}
                                                                                    </option>
                                                                                ) : (
                                                                                    <option key={idx} value={k.id_kelurahan}>
                                                                                        {k.nama_kelurahan}
                                                                                    </option>
                                                                                );
                                                                            })}
                                                                        </select>
                                                                    </div>
                                                                </td>
                                                                <td className="whitespace-nowrap px-6 py-4">
                                                                    <p>
                                                                        <input type="text" name="" className="border-primary w-60 rounded-lg text-xl" id={`nama_toko${t.id_toko}`}
                                                                            value={t.nama_toko}
                                                                            onChange={(e) =>
                                                                                handleInputChange(
                                                                                    e,
                                                                                    t.id_toko,
                                                                                    "nama_toko"
                                                                                )
                                                                            } />
                                                                    </p>
                                                                </td>
                                                                <td className="whitespace-nowrap px-6 py-4">
                                                                    <p>
                                                                        <input type="text" name="" className="border-primary w-40 rounded-lg text-xl" id={`nama_konsumen${t.id_toko}`}
                                                                            value={t.nama_konsumen}
                                                                            onChange={(e) =>
                                                                                handleInputChange(
                                                                                    e,
                                                                                    t.id_toko,
                                                                                    "nama_konsumen"
                                                                                )
                                                                            } />
                                                                    </p>
                                                                </td>
                                                                <td className="whitespace-nowrap px-6 py-4">
                                                                    <p>
                                                                        <textarea type="text" name="" className="border-primary h-28 rounded-lg text-xl" id={`alamat_toko${t.id_toko}`}
                                                                            value={t.alamat_toko}
                                                                            onChange={(e) =>
                                                                                handleInputChange(
                                                                                    e,
                                                                                    t.id_toko,
                                                                                    "alamat_toko"
                                                                                )
                                                                            } />
                                                                    </p>
                                                                </td>
                                                                <td className="whitespace-nowrap px-6 py-4">
                                                                    <p>
                                                                        <input type="text" name="" className="border-primary w-44 rounded-lg text-xl" id={`no_handphone1${t.id_toko}`}
                                                                            value={t.no_handphone1}
                                                                            onChange={(e) =>
                                                                                handleInputChange(
                                                                                    e,
                                                                                    t.id_toko,
                                                                                    "no_handphone1"
                                                                                )
                                                                            } />
                                                                    </p>
                                                                </td>
                                                                <td className="whitespace-nowrap px-6 py-4">
                                                                    <p>
                                                                        <input type="text" name="" className="border-primary w-44 rounded-lg text-xl" id={`no_handphone2${t.id_toko}`}
                                                                            value={t.no_handphone2}
                                                                            onChange={(e) =>
                                                                                handleInputChange(
                                                                                    e,
                                                                                    t.id_toko,
                                                                                    "no_handphone2"
                                                                                )
                                                                            } />
                                                                    </p>
                                                                </td>
                                                                <td className="whitespace-nowrap px-6 py-4">
                                                                    <button onClick={() => editToko(t.id_toko)} className="bg-primary w-36 h-12 rounded-xl text-white hover:bg-gray-300 hover:text-primary font-bold py-2 px-4">
                                                                        Edit
                                                                    </button>
                                                                </td>
                                                                <td className="whitespace-nowrap px-6 py-4">
                                                                    {t.status_toko == 0 ? (
                                                                        <button
                                                                            onClick={() => statusToko(t.id_toko, 1)}
                                                                            className="bg-primary w-36 h-12 rounded-xl text-white hover:bg-gray-300 hover:text-primary font-bold py-2 px-4"
                                                                        >
                                                                            Aktif
                                                                        </button>
                                                                    ) : (
                                                                        <button
                                                                            onClick={() => statusToko(t.id_toko, 0)}
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
                            <h2 className="text-center text-2xl">Master Toko</h2>
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