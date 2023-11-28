import { useForm } from "react-hook-form";
import LogoPerusahaan from "../../images/image-login/icon.png"
import { useState } from "react";
import { useLoaderData } from "react-router-dom";
import client from "../../controller/client";

export default function MasterJabatan() {
    let data = useLoaderData();
    const [kota, setKota] = useState(data.kota);
    const [isTambah, setIsTambah] = useState(true);
    const toggleTambah = () => {
        setIsTambah(!isTambah);
    }

    const [isMasterKota, setisMasterKota] = useState(true);
    const toggleMasterKota = () => {
        setisMasterKota(!isMasterKota);
    }

    const [isEdit, setIsEdit] = useState(true);
    const toggleEdit = () => {
        setIsEdit(!isEdit);
    }

    const [isStatus, setIsStatus] = useState(null);
    const toggleStatus = () => {
        setIsStatus(!isStatus);
    }

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();
    
    async function addKota(data) {
        await client.post(`/api/kota`, {
          nama_kota: data.nama_kota,
        });
        reset();
        let kota = await client.get(`/api/getListKota`);
        setKota(kota.data);
    }
    
    async function editKota(id) {
        const nama_kota = document.getElementById(`nama_kota${id}`).value;
        await client.put(`/api/editKota`, {
          id_kota: id,
          nama_kota: nama_kota,
        });
       
        let kota = await client.get(`/api/getListKota`);
        setKota(kota.data);
        alert("Berhasil Update Kota " + id);
    }
    
    async function statusKota(id, status) {
        await client.put(`/api/editStatusKota`, {
            id_kota: id,
            status_kota: status,
        });
        let kota = await client.get(`/api/getListKota`);
        setKota(kota.data);
    }
    
    async function cari() {
        let keyword = document.getElementById("keyword").value;
        let kota = await client.get(`/api/getListKota/${keyword}`);
        setKota(kota.data);
    }
    const handleInputChange = (e, id, field) => {
        const updateKota = kota.map((k) =>
          k.id_kota === id ? { ...k, [field]: e.target.value } : k
        );
        setKota(updateKota);
    };

    return (
        <>
            <div className="cover mt-12 border-2 mb-28 rounded-xl" style={{ width: "100%", boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px" }}>
                <div className="flex">
                    <div className="flex text-primary text-2xl">
                        <button onClick={toggleTambah} className="bg-primary w-60 m-4 h-12 rounded-xl text-2xl text-white hover:bg-gray-300 hover:text-primary font-bold py-2 px-4">
                            +
                            Tambah Kota
                        </button>
                    </div>
                    <div className="flex text-primary text-2xl">
                        <button onClick={toggleMasterKota} className="bg-primary w-60 m-4 h-12 rounded-xl text-2xl text-white hover:bg-gray-300 hover:text-primary font-bold py-2 px-4">
                            Master Kota
                        </button>
                    </div>
                </div>
                <p className="ps-4 pt-1 pb-2 text-md italic text-primary">
                    *Hanya boleh memilih satu pilihan
                </p>
                {!isTambah &&
                    <div className="selectdisable border-2 ms-4 mt-1 mb-4 border-gray-300 rounded-2xl w-1/3 h-full" style={{ boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px" }}>
                        <div className="row ms-4 m-4 w-full" >
                            <form onSubmit={handleSubmit(addKota)}>
                                <div className="flex text-primary mt-3 text-2xl">
                                    <p className="pt-1 pr-2 w-48">Nama Kota : </p>
                                    <input
                                        type="text"
                                        name="Nama kota"
                                        className="border-primary rounded-lg w-60 text-2xl h-10"
                                        placeholder="Nama Kota"
                                        required="text" {...register("nama_kota")}/>
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
                {!isMasterKota &&
                    <>
                        <div className="flex mx-auto items-center justify-center">
                            <p className="pt-5 text-4xl font-semibold text-center text-primary">Master Kota</p>
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
                                                        ID Kota
                                                    </th>
                                                    <th scope="col" className="px-6 py-4">
                                                        Nama Kota
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
                                                {kota.map((k)=>{
                                                    return <tr className="border-b dark:border-neutral-500" >
                                                        <td className="whitespace-nowrap px-6 py-4 font-medium" >
                                                            <p>
                                                                {k.id_kota}
                                                            </p>
                                                        </td>
                                                        <td className="whitespace-nowrap px-6 py-4 font-medium">
                                                            <p>
                                                                <input type="text" name="" className="border-primary rounded-lg text-2xl" id={`nama_kota${k.id_kota}`}
                                                                value={k.nama_kota}
                                                                onChange={(e) =>
                                                                handleInputChange(
                                                                    e,
                                                                    k.id_kota,
                                                                    "nama_kota"
                                                                )
                                                                }/>
                                                            </p>
                                                        </td>
                                                        <td className="whitespace-nowrap px-6 py-4">
                                                            <button onClick={()=>editKota(k.id_kota)} className="bg-primary w-36 h-12 rounded-xl text-white hover:bg-gray-300 hover:text-primary font-bold py-2 px-4">
                                                                Edit
                                                            </button>
                                                        </td>
                                                        <td className="whitespace-nowrap px-6 py-4">
                                                            {k.status_kota == 0 ? (
                                                                <button
                                                                    onClick={() => statusKota(k.id_kota, 1)}
                                                                    className="bg-primary w-36 h-12 rounded-xl text-white hover:bg-gray-300 hover:text-primary font-bold py-2 px-4"
                                                                >
                                                                    Aktif
                                                                </button>
                                                                ) : (
                                                                <button
                                                                    onClick={() =>  statusKota(k.id_kota, 0)}
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
        </>
    )
}