import { useLoaderData } from "react-router-dom";
import LogoPerusahaan from "../../images/image-login/icon.png"
import { useState } from "react";
import { useForm } from "react-hook-form";
import client from "../../controller/client";
import FotoModal from "../../images/image-modal/berhasil.png"
export default function DetailBarang() {
    let data = useLoaderData();
    const [dbarang, setDbarang] = useState(data.dbarang);

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

    const [isMasterBarang, setIsMasterBarang] = useState(true);
    const toggleMasterBarang = () => {
        setIsMasterBarang(!isMasterBarang);
    }

    const [isEdit, setIsEdit] = useState(true);
    const toggleEdit = () => {
        setIsEdit(!isEdit);
    }

    async function ambilData() {
        let dbarang = await client.get(`/api/getListDbarang`);

        let tempDbarang = [];

        dbarang.data.map((d) => {
            const tempDate = d.tanggal_expired.split("-");
            let expired = tempDate[2] + "-" + tempDate[1] + "-" + tempDate[0];
            tempDbarang.push({
                id_detail_barang: d.id_detail_barang,
                id_barang: d.id_barang,
                jumlah_pcs: d.jumlah_pcs,
                jumlah_karton: d.jumlah_karton,
                tanggal_expired: expired,
            })
        })

        setDbarang(tempDbarang);
    }

    async function addDetailBarang(data) {
        console.log(data)
        let expired = data.tanggal_expired;
        const ambilDate = expired.split("T");
        const tempDate = ambilDate[0].split("-");
        expired = tempDate[2] + "-" + tempDate[1] + "-" + tempDate[0];
        await client.post(`/api/dbarang`, {
            id_barang: data.id_barang,
            jumlah_pcs: data.jumlah_pcs,
            jumlah_karton: data.jumlah_karton,
            tanggal_expired: expired,
        });
        reset();
        ambilData();
    }

    async function editDbarang(id) {
        const nama_barang = document.getElementById(`id_barang${id}`).value;
        const jumlah_pcs = document.getElementById(`jumlah_pcs${id}`).value;
        const jumlah_karton = document.getElementById(`jumlah_karton${id}`).value;
        let tanggal_expired = document.getElementById(`tanggal_expired${id}`).value;
        const tempDate = tanggal_expired.split("-");
        tanggal_expired = tempDate[2] + "-" + tempDate[1] + "-" + tempDate[0];
        await client.put(`/api/editDbarang`, {
            id_detail_barang: id,
            id_barang: nama_barang,
            jumlah_pcs: jumlah_pcs,
            jumlah_karton: jumlah_karton,
            tanggal_expired: tanggal_expired,
        });
        ambilData();
        handleOpenModal()
    }

    async function deleteDbarang(id) {
        await client.put(`/api/dbarang?`, {
            id_detail_barang: id,
        });
        ambilData();
    }

    async function cari() {
        let keyword = document.getElementById("keyword").value;
        let dbarang = await client.get(`/api/getListDbarang/${keyword}`);

        let tempDbarang = [];
        dbarang.data.map((d) => {
            const tempDate = d.tanggal_expired.split("-");
            let expired = tempDate[2] + "-" + tempDate[1] + "-" + tempDate[0];
            tempDbarang.push({
                id_detail_barang: d.id_detail_barang,
                id_barang: d.id_barang,
                jumlah_pcs: d.jumlah_pcs,
                jumlah_karton: d.jumlah_karton,
                tanggal_expired: expired,
            })
        })

        setDbarang(tempDbarang);
    }

    const handleInputChange = (e, id, field) => {
        const updatedDbarang = dbarang.map((d) =>
            d.id_detail_barang === id ? { ...d, [field]: e.target.value } : d
        );
        setDbarang(updatedDbarang);
    };

    return (
        <>
            <div className="cover mt-12 border-2 mb-28 rounded-xl" style={{ width: "100%", boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px" }}>
                <div className="flex">
                    <div className="flex text-primary text-2xl">
                        <button onClick={toggleTambah} className="bg-primary w-60 m-4 h-12 rounded-xl text-2xl text-white hover:bg-gray-300 hover:text-primary font-bold py-2 px-4">
                            +
                            Detail Barang
                        </button>
                    </div>
                    <div className="flex text-primary text-2xl">
                        <button onClick={toggleMasterBarang} className="bg-primary w-60 m-4 h-12 rounded-xl text-2xl text-white hover:bg-gray-300 hover:text-primary font-bold py-2 px-4">
                            Master D. Barang
                        </button>
                    </div>
                </div>
                <p className="ps-4 pt-1 pb-2 text-md italic text-primary">
                    *Hanya boleh memilih satu pilihan
                </p>
                {!isTambah &&
                    <div className="selectdisable border-2 ms-4 mt-1 mb-4 border-gray-300 rounded-2xl w-1/3 h-full" style={{ boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px" }}>
                        <div className="row ms-4 m-4 w-full" >
                            <form onSubmit={handleSubmit(addDetailBarang)}>
                                <div className="flex text-primary mt-3 text-2xl">
                                    <p className="pt-2 pr-2 w-52">ID Barang : </p>
                                    <select name="brandId" id="selectIdbarang" className="w-60 text-primary border-primary rounded-lg h-12 text-2xl" {...register("id_barang")}>
                                        {data.barang.map((b) => {
                                            return <option value={b.id_barang}>{b.nama_barang}</option>
                                        })}
                                    </select>
                                </div>
                                <div className="flex text-primary mt-3 text-2xl">
                                    <p className="pt-1 pr-2 w-52">Jumlah Pcs: </p>
                                    <input
                                        type="number"
                                        name="jumlah pcs"
                                        className="border-primary rounded-lg w-60 text-2xl h-10"
                                        placeholder="Jumlah Pcs"
                                        min={0} required="number" {...register("jumlah_pcs")} />
                                </div>
                                <div className="flex text-primary mt-3 text-2xl">
                                    <p className="pt-1 pr-2 w-52">Jumlah Karton: </p>
                                    <input
                                        type="number"
                                        name="jumlah karton"
                                        className="border-primary rounded-lg w-60 text-2xl h-10"
                                        placeholder="Jumlah Karton"
                                        min={0} required="number" {...register("jumlah_karton")} />
                                </div>
                                <div className="flex text-primary mt-3 text-2xl">
                                    <p className="pt-1 pr-2 w-52">Tanggal Expired: </p>
                                    <input type="datetime-local" name="" id="" className="border-primary rounded-lg w-60 text-2xl h-10" required="datetime-local" {...register("tanggal_expired")} />
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
                {!isMasterBarang &&
                    <>
                        <div className="flex mx-auto items-center justify-center">
                            <p className="pt-5 text-4xl font-semibold text-center text-primary">Master Detail Barang</p>
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
                                                        ID Detail
                                                    </th>
                                                    <th scope="col" className="px-6 py-4">
                                                        Nama Barang
                                                    </th>
                                                    <th scope="col" className="px-6 py-4">
                                                        Jumlah Pcs
                                                    </th>
                                                    <th scope="col" className="px-6 py-4">
                                                        Jumlah Karton
                                                    </th>
                                                    <th scope="col" className="px-6 py-4">
                                                        Tanggal Expired
                                                    </th>
                                                    <th scope="col" className="px-6 py-4">
                                                        Edit
                                                    </th>
                                                    <th scope="col" className="px-6 py-4">
                                                        Delete
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {dbarang.map((d) => {
                                                    return <tr className="border-b dark:border-neutral-500" >
                                                        <td className="whitespace-nowrap px-6 py-4 font-medium" >
                                                            <p>
                                                                {d.id_detail_barang}
                                                            </p>
                                                        </td>
                                                        <td className="whitespace-nowrap px-6 py-4 font-medium">
                                                            <p>
                                                                <select
                                                                    name="id_barang"
                                                                    id={`id_barang${d.id_detail_barang}`}
                                                                    className="w-60 text-primary border-primary rounded-lg h-12 text-2xl"
                                                                >
                                                                    {data.barang.map((b, idx) => {
                                                                        return d.id_barang == b.id_barang ? (
                                                                            <option
                                                                                key={idx}
                                                                                value={b.id_barang}
                                                                                selected="selected"
                                                                            >
                                                                                {b.nama_barang}
                                                                            </option>
                                                                        ) : (
                                                                            <option key={idx} value={b.id_barang}>
                                                                                {b.nama_barang}
                                                                            </option>
                                                                        );
                                                                    })}
                                                                </select>
                                                            </p>
                                                        </td>
                                                        <td className="whitespace-nowrap px-6 py-4">
                                                            <p>
                                                                <input type="number" name="" className="border-primary rounded-lg text-2xl" id={`jumlah_pcs${d.id_detail_barang}`}
                                                                    value={d.jumlah_pcs}
                                                                    onChange={(e) =>
                                                                        handleInputChange(
                                                                            e,
                                                                            d.id_detail_barang,
                                                                            "jumlah_pcs"
                                                                        )
                                                                    } />
                                                            </p>
                                                        </td>
                                                        <td className="whitespace-nowrap px-6 py-4">
                                                            <p>
                                                                <input type="number" name="" className="border-primary rounded-lg text-2xl" id={`jumlah_karton${d.id_detail_barang}`}
                                                                    value={d.jumlah_karton}
                                                                    onChange={(e) =>
                                                                        handleInputChange(
                                                                            e,
                                                                            d.id_detail_barang,
                                                                            "jumlah_karton"
                                                                        )
                                                                    } />
                                                            </p>
                                                        </td>
                                                        <td className="whitespace-nowrap px-6 py-4">
                                                            <p>
                                                                <input type="date" name="" className="border-primary rounded-lg text-2xl" id={`tanggal_expired${d.id_detail_barang}`}
                                                                    value={d.tanggal_expired}
                                                                    onChange={(e) =>
                                                                        handleInputChange(
                                                                            e,
                                                                            d.id_detail_barang,
                                                                            "tanggal_expired"
                                                                        )
                                                                    } />
                                                            </p>
                                                        </td>
                                                        <td className="whitespace-nowrap px-6 py-4">
                                                            <button onClick={() => editDbarang(d.id_detail_barang)} className="bg-primary w-36 h-12 rounded-xl text-white hover:bg-gray-300 hover:text-primary font-bold py-2 px-4">
                                                                Edit
                                                            </button>
                                                        </td>
                                                        <td className="whitespace-nowrap px-6 py-4">
                                                            <button onClick={() => deleteDbarang(d.id_detail_barang)} className="bg-primary w-36 h-12 rounded-xl text-white hover:bg-gray-300 hover:text-primary font-bold py-2 px-4">
                                                                Delete
                                                            </button>
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
            <div className="cover">
                {isModalOpen && (
                    <div className="modal">
                        <div className="modal-content h-72 w-80">
                            <span className="close" onClick={handleCloseModal}>&times;</span>
                            <h2 className="text-center text-2xl">Berhasil Diupdate</h2>
                            <img src={FotoModal} alt="" className="w-20 mx-auto m-6 h-20" />
                            <div className="flex items-center mx-auto justify-center">
                                <button className="bg-primary hover:bg-gray-400 m-2 w-32 rounded-lg" onClick={handleCloseModal}>
                                    <p className="text-xl p-2">
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