import { useLoaderData } from "react-router-dom";
import LogoPerusahaan from "../../images/image-login/icon.png"
import { useState } from "react";
import { useForm } from "react-hook-form";
import client from "../../controller/client";
import FotoModal from "../../images/image-modal/berhasil.png"

export default function MasterJabatan() {
    let data = useLoaderData();
    const [kelurahan, setKelurahan] = useState(data.kelurahan);
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

    const [isMasterKelurahan, setisMasterKelurahan] = useState(true);
    const toggleMasterKelurahan = () => {
        setisMasterKelurahan(!isMasterKelurahan);
    }

    const [isEdit, setIsEdit] = useState(true);
    const toggleEdit = () => {
        setIsEdit(!isEdit);
    }

    const [isStatus, setIsStatus] = useState(null);
    const toggleStatus = () => {
        setIsStatus(!isStatus);
    }

    async function addKelurahan(data) {
        await client.post(`/api/kelurahan`, {
            id_kota: data.id_kota,
            nama_kelurahan: data.nama_kelurahan
        });
        reset();
        let kelurahan = await client.get(`/api/getListKelurahan`);
        setKelurahan(kelurahan.data);
    }

    async function editKelurahan(id) {
        const nama_kelurahan = document.getElementById(`nama_kelurahan${id}`).value;
        const id_kota = document.getElementById(`id_kota${id}`).value;
        await client.put(`/api/editKelurahan`, {
            id_kelurahan: id,
            id_kota: id_kota,
            nama_kelurahan: nama_kelurahan,
        });

        let kelurahan = await client.get(`/api/getListKelurahan`);
        setKelurahan(kelurahan.data);
        // alert("Berhasil Update Kelurahan " + id);
        handleOpenModal()

    }

    async function statusKelurahan(id, status) {
        await client.put(`/api/editStatusKelurahan`, {
            id_kelurahan: id,
            status_kelurahan: status,
        });
        let kelurahan = await client.get(`/api/getListKelurahan`);
        setKelurahan(kelurahan.data);
    }

    async function cari() {
        let keyword = document.getElementById("keyword").value;
        let kelurahan = await client.get(`/api/getListKelurahan/${keyword}`);
        setKelurahan(kelurahan.data);
    }

    const handleInputChange = (e, id, field) => {
        const updateKelurahan = kelurahan.map((k) =>
            k.id_kelurahan === id ? { ...k, [field]: e.target.value } : k
        );
        setKelurahan(updateKelurahan);
    };

    return (
        <>
            <div className="cover mt-12 border-2 mb-28 rounded-xl" style={{ width: "100%", boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px" }}>
                <div className="flex">
                    <div className="flex text-primary text-2xl">
                        <button onClick={toggleTambah} className="bg-primary w-60 m-4 h-12 rounded-xl text-2xl text-white hover:bg-gray-300 hover:text-primary font-bold py-2 px-4">
                            +
                            Kelurahan
                        </button>
                    </div>
                    <div className="flex text-primary text-2xl">
                        <button onClick={toggleMasterKelurahan} className="bg-primary w-60 m-4 h-12 rounded-xl text-2xl text-white hover:bg-gray-300 hover:text-primary font-bold py-2 px-4">
                            Master Kelurahan
                        </button>
                    </div>
                </div>
                <p className="ps-4 pt-1 pb-2 text-md italic text-primary">
                    *Hanya boleh memilih satu pilihan
                </p>
                {!isTambah &&
                    <div className="selectdisable border-2 ms-4 mt-1 mb-4 border-gray-300 rounded-2xl w-1/3 h-full" style={{ boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px" }}>
                        <div className="row ms-4 m-4 w-full" >
                            <form onSubmit={handleSubmit(addKelurahan)}>
                                <div className="flex text-primary mt-3 text-2xl">
                                    <p className="pt-2 pr-2 w-52">ID Kota : </p>
                                    <select name="brandId" id="selectIdbrand" className="w-60 text-primary border-primary rounded-lg h-12 text-2xl" {...register("id_kota")}>
                                        {data.kota.map((k) => {
                                            return <option value={k.id_kota}>{k.nama_kota}</option>
                                        })}
                                    </select>
                                </div>
                                <div className="flex text-primary mt-3 text-2xl">
                                    <p className="pt-1 pr-2 w-52">Nama Kelurahan: </p>
                                    <input
                                        type="text"
                                        name="nama kelurahan"
                                        className="border-primary rounded-lg w-60 text-2xl h-10"
                                        placeholder="Nama Kelurahan"
                                        required="text" {...register("nama_kelurahan")} />
                                </div>
                                <div className="flex float-right mr-4">
                                    <button type="submit" className="bg-primary w-40 m-4 h-14 rounded-xl text-white hover:bg-gray-300 hover:text-primary font-bold py-2 px-4">
                                        Simpan
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                }
                {!isMasterKelurahan &&
                    <>
                        <div className="flex mx-auto items-center justify-center">
                            <p className="pt-5 text-4xl font-semibold text-center text-primary">Master Kelurahan</p>
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
                            <div className="covertable m-2">
                                <div className="cover mb-28">
                                    <div className="covertable m-2 w-full">
                                        <table className="text-left text-2xl mt-5 font-light border rounded-xl w-full" style={{ boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px" }}     >
                                            <thead className="border-b font-medium dark:border-neutral-500">
                                                <tr>
                                                    <th scope="col" className="px-6 py-4">
                                                        ID Kelurahan
                                                    </th>
                                                    <th scope="col" className="px-6 py-4">
                                                        ID Kota
                                                    </th>
                                                    <th scope="col" className="px-6 py-4">
                                                        Nama Kelurahan
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
                                                {kelurahan.map((k) => {
                                                    return <tr className="border-b dark:border-neutral-500" >
                                                        <td className="whitespace-nowrap px-6 py-4 font-medium" >
                                                            <p>
                                                                {k.id_kelurahan}
                                                            </p>
                                                        </td>
                                                        <td className="whitespace-nowrap px-6 py-4 font-medium" >
                                                            <div>
                                                                <select name="brandId" className="w-60 text-primary border-primary rounded-lg h-12 text-2xl" id={`id_kota${k.id_kelurahan}`}>
                                                                    {data.kota.map((kota, idx) => {
                                                                        return k.id_kota == kota.id_kota ? (
                                                                            <option
                                                                                key={idx}
                                                                                value={kota.id_kota}
                                                                                selected="selected"
                                                                            >
                                                                                {kota.nama_kota}
                                                                            </option>
                                                                        ) : (
                                                                            <option key={idx} value={kota.id_kota}>
                                                                                {kota.nama_kota}
                                                                            </option>
                                                                        );
                                                                    })}
                                                                </select>
                                                            </div>
                                                        </td>
                                                        <td className="whitespace-nowrap px-6 py-4 font-medium">
                                                            <p>
                                                                <input
                                                                    type="text"
                                                                    name=""
                                                                    className="border-primary rounded-lg text-2xl"
                                                                    id={`nama_kelurahan${k.id_kelurahan}`}
                                                                    value={k.nama_kelurahan}
                                                                    onChange={(e) =>
                                                                        handleInputChange(
                                                                            e,
                                                                            k.id_kelurahan,
                                                                            "nama_kelurahan"
                                                                        )
                                                                    }
                                                                />
                                                            </p>
                                                        </td>
                                                        <td className="whitespace-nowrap px-6 py-4">
                                                            <button onClick={() => editKelurahan(k.id_kelurahan)} className="bg-primary w-36 h-12 rounded-xl text-white hover:bg-gray-300 hover:text-primary font-bold py-2 px-4">
                                                                Edit
                                                            </button>
                                                        </td>
                                                        <td className="whitespace-nowrap px-6 py-4">
                                                            {k.status_kelurahan == 0 ? (
                                                                <button
                                                                    onClick={() => statusKelurahan(k.id_kelurahan, 1)}
                                                                    className="bg-primary w-36 h-12 rounded-xl text-white hover:bg-gray-300 hover:text-primary font-bold py-2 px-4"
                                                                >
                                                                    Aktif
                                                                </button>
                                                            ) : (
                                                                <button
                                                                    onClick={() => statusKelurahan(k.id_kelurahan, 0)}
                                                                    className="bg-gray-300 w-36 h-12 rounded-xl text-gray-600 hover:bg-gray-300 hover:text-primary font-bold py-2 px-4"
                                                                >
                                                                    Non Aktif
                                                                </button>
                                                            )}
                                                        </td>
                                                    </tr>
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
                            <h2 className="text-center text-2xl">Master Kelurahan</h2>
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